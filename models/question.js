const mongoose =require('mongoose'); 

const QuestionSchema=new mongoose.Schema({
    q1:{
        type: String,
        required: true
    },
    ans:{
        type: String,
        required: true
    }
});

const Question= mongoose.model('questions', QuestionSchema);

module.exports.Question= Question;