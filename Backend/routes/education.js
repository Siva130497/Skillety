const router = require("express").Router();
const education = require('../Database/education');


//get all designations from db
router.get("/educations", async(req, res)=>{
    try{
        const alleducation = await education.find();
        res.status(200).json(alleducation);
    }catch(err){
        res.status(500).json(err)
    }
})

//post new designations to db
router.post("/educations", async(req, res)=>{
    const educationArray = req.body;
    
    try {
      const savededucation = await Promise.all(educationArray.map(async (educationString) => {
        const posteducation = new education({ education: educationString });
        return await posteducation.save();
      }));
      
      res.status(200).json(savededucation);
    } catch (err) {
      res.status(500).json(err)
    }
})

module.exports = router;