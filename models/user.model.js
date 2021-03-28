const mongoose =require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema =new mongoose.Schema({
    email :{
        type : String,
        required : true ,
        unique : true   
    },
    fullname : {
        type : String,
        required : "fullname is required"
    },
    username :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    },
    class_8:{
        type : Array,
        "default" : []
    },
    class_9:{
        type : Array,
        "default" : []
    },
    class_10:{
        type : Array,
        "default" : []
    },
    class_8_details:{
        type : String
    },
    class_9_details:{
        type : String
    },
    class_10_details:{
        type : String
    },
    overall_details:{
        type : String
    }

});
userSchema.path('email').validate((val) => {
 return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val); 
},'Invalid Email');

userSchema.plugin(uniqueValidator,  { message: '{PATH} already exist' });
mongoose.model('User',userSchema);