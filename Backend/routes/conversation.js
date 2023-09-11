const router = require("express").Router();
const conversation = require("../Database/conversation");



//new conv
router.post("/conversation", async(req, res)=>{
    const newConversation = new conversation({
        members:[req.body.senderId, req.body.receiverId]
    });

    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(err){
        res.status(500).json(err)
    }
})

//get conv of a user
router.get("/conversation/:id", async(req, res)=>{
    try{
        const Conversation = await conversation.find({
            members: { $in: [req.params.id] },
        });
        res.status(200).json(Conversation);
    }catch(err){
        res.status(500).json(err)
    }
})









module.exports = router;