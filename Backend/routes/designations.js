const router = require("express").Router();
const designation = require('../Database/designation');
const employeeAuth = require("../middleware/employeeAuth");

//get all designations from db
router.get("/designations", employeeAuth, async(req, res)=>{
    try{
        const allDesignation = await designation.find();
        res.status(200).json(allDesignation);
    }catch(err){
        res.status(500).json(err)
    }
})

//post new designations to db
router.post("/designations", employeeAuth, async(req, res)=>{
    const designationArray = req.body;
    
    try {
      const savedDesignation = await Promise.all(designationArray.map(async (designationString) => {
        const postDesignation = new designation({ designation: designationString });
        return await postDesignation.save();
      }));
      
      res.status(200).json(savedDesignation);
    } catch (err) {
      res.status(500).json(err)
    }
})

module.exports = router;