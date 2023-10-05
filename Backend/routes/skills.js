const router = require("express").Router();
const skill = require('../Database/skill');
const employeeAuth = require("../middleware/employeeAuth");

//get all skills from db
router.get("/skills", employeeAuth, async(req, res)=>{
    try{
        const allSkills = await skill.find();
        res.status(200).json(allSkills);
    }catch(err){
        res.status(500).json(err)
    }
})

//post new skills to db
router.post("/skills", employeeAuth, async (req, res) => {
    const skillArray = req.body;
    
    try {
      const savedSkills = await Promise.all(skillArray.map(async (skillString) => {
        const postSkill = new skill({ skill: skillString });
        return await postSkill.save();
      }));
      
      res.status(200).json(savedSkills);
    } catch (err) {
      res.status(500).json(err)
    }
  });


module.exports = router;