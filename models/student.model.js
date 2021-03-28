const mongoose =require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var studentSchema =new mongoose.Schema({
    fullname : {
        type : String,
        required : "fullname is required"
    },
    username :{
        type : String,
        required : true,
        unique : true
    },
    subjects : {
        type : Array,
        "default" : []
    },
    taught_days: {
        type : Number,
        "default" : 0
    },
    earnings: {
        type : Number,
        "default" : 0
    },
    average_marks: {
        type : Number,
        "default" : 0.0 
    }
});

studentSchema.plugin(uniqueValidator,  { message: '{PATH} already exist' });
mongoose.model('Student',studentSchema);