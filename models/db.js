const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/test_demodb', 
    {useNewUrlParser : true},(err) => {
        if(!err) {console.log('Mongodb connected.'); }
        else {console.log('error in db connection : '+ err); }
});
require('./user.model');