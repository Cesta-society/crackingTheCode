const mongoose =require('mongoose'); 
const AutoIncrement = require('mongoose-sequence')(mongoose);

const QuestionSchema=new mongoose.Schema({
    q1:{
        type: String,
        required: true
    },
    o1:{
        type: String,
        required: true
    },
    o2:{
        type: String,
        required: true
    },
    o3:{
        type: String,
        required: true
    },
    o4:{
        type: String,
        required: true
    },
    ans:{
        type: String,
        required: true
    }
});

QuestionSchema.plugin(AutoIncrement, {inc_field: 'id'});

const Question= mongoose.model('questions', QuestionSchema);

module.exports.Question= Question;