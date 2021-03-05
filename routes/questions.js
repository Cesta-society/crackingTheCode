const express= require('express');
const router= express.Router();
const {Question}= require('../models/question');

router.get('/',async (req,res)=>{
    const questions=await Question.find();
    res.send(questions);
});

router.post('/',async (req,res)=>{
    
    const question= new Question(req.body);

    await question.save();
    
    res.send(req.body);
});

//Update
router.put('/:id',async (req,res)=>{
    
    let question = await Question.findByIdAndUpdate(req.params.id, req.body,  {new: true});
  
    await question.save();
    res.send(req.body);
});



router.delete('/:id', async (req,res)=>{
    
    const remove=await Question.deleteOne({_id:req.params.id});
    if(!remove)
        return res.status(404).send({link:"/",message:"Given ID was not found"});//404 is error not found
    
   res.send({id:req.params.id});
});

module.exports= router;