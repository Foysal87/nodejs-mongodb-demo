const express =require('express');

var router =express.Router();
const {ensureAuthenticated} =require('../config/auth');


router.get('/',ensureAuthenticated,(req,res) => {
  
  res.render('profile' ,{
    username : req.user.username,
    fullname : req.user.fullname,
    email : req.user.email,
  });

});
 
module.exports=router;