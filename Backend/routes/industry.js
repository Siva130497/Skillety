const router = require("express").Router();
const industry = require('../Database/industry');


//get all designations from db
router.get("/industries", async(req, res)=>{
    try{
        const allindustry = await industry.find();
        res.status(200).json(allindustry);
    }catch(err){
        res.status(500).json(err)
    }
})

//post new designations to db
router.post("/industries", async(req, res)=>{
    const industryArray = req.body;
    
    try {
      const savedindustry = await Promise.all(industryArray.map(async (industryString) => {
        const existingIndustry = await industry.findOne({ industry: industryString });

        if (existingIndustry) {
              return existingIndustry;
        }
        const postindustry = new industry({ industry: industryString });
        return await postindustry.save();
      }));
      
      res.status(200).json(savedindustry);
    } catch (err) {
      res.status(500).json(err)
    }
})

module.exports = router;