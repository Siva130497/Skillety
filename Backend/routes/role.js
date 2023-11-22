const router = require("express").Router();
const role = require('../Database/role');


//get all designations from db
router.get("/roles", async(req, res)=>{
    try{
        const allRole = await role.find();
        res.status(200).json(allRole);
    }catch(err){
        res.status(500).json(err)
    }
})

//post new designations to db
router.post("/roles", async(req, res)=>{
    const roleArray = req.body;
    
    try {
      const savedRole = await Promise.all(roleArray.map(async (roleString) => {
        //   const lowercaseSkillString = skillString.toLowerCase();
          const existingRole = await role.findOne({ role: roleString });

          if (existingRole) {
              return existingRole;
          }

          const postRole = new role({ role: roleString });
          return await postRole.save();
      }));
    
      res.status(200).json(savedRole);
    } catch (err) {
      res.status(500).json(err)
    }
})

module.exports = router;