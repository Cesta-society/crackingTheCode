const express= require('express');
const router= express.Router();
const {User}= require('../models/user');

router.get('/',async (req,res)=>{
    const users=await User.find();
    res.send(users);
});

router.post('/',async (req,res)=>{

    const unique=await User.findOne({email: req.body.email});

    if(!unique){
        const user= new User(req.body);
        await user.save();
    }
    
    res.send(req.body);
});

module.exports= router;