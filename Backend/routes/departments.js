const router = require("express").Router();
const department = require('../Database/department');


//get all designations from db
router.get("/departments", async(req, res)=>{
    try{
        const allDepartment = await department.find();
        res.status(200).json(allDepartment);
    }catch(err){
        res.status(500).json(err)
    }
})

//post new designations to db
router.post("/departments", async(req, res)=>{
    const departmentArray = req.body;
    
    try {
      const savedDepartment = await Promise.all(departmentArray.map(async (departmentString) => {
        const existingDepartment = await department.findOne({ department: departmentString });

        if (existingDepartment) {
              return existingDepartment;
        }
        const postDepartment = new department({ department: departmentString });
        return await postDepartment.save();
      }));
      
      res.status(200).json(savedDepartment);
    } catch (err) {
      res.status(500).json(err)
    }
})

module.exports = router;