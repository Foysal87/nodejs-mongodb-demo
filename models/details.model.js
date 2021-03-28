const mongoose =require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var detailsSchema =new mongoose.Schema({
    user_id :{
        type: String,
        unique : true
    },
    taught_days: {
        type : Number,
        "default" : 0
    },
    total_earnings: {
        type : Number,
        "default" : 0
    },
    average_marks: {
        type : Number,
        "default" : 0
    }

});

detailsSchema.plugin(uniqueValidator,  { message: '{PATH} already exist' });
mongoose.model('Details',detailsSchema);