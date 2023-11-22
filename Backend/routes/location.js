const router = require("express").Router();
const location = require('../Database/location');


//get all designations from db
router.get("/locations", async(req, res)=>{
    try{
        const allLocation = await location.find();
        res.status(200).json(allLocation);
    }catch(err){
        res.status(500).json(err)
    }
})

//post new designations to db
router.post("/locations", async(req, res)=>{
    const locationArray = req.body;
    
    try {
      const savedLocation = await Promise.all(locationArray.map(async (locationString) => {
        const existingLocation = await location.findOne({ location: locationString });

        if (existingLocation) {
              return existingLocation;
        }
        const postLocation = new location({ location: locationString });
        return await postLocation.save();
      }));
      
      res.status(200).json(savedLocation);
    } catch (err) {
      res.status(500).json(err)
    }
})

module.exports = router;