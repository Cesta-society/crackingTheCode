const mongoose =require('mongoose'); 

const UserSchema=new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    points:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    }
});

const User= mongoose.model('users', UserSchema);

module.exports.User= User;