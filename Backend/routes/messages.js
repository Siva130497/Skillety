const router = require("express").Router();
const message = require('../Database/message');


//add
router.post("/messages", async(req, res)=>{
    const newMessage = new message(req.body);

    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json(err)
    }
})


//get
router.get("/messages/:id", async(req, res)=>{
    try{
        const allMessages = await message.find({
            conversationId: req.params.id,
        });
        res.status(200).json(allMessages);
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;