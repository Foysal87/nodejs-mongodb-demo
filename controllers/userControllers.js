const express =require('express');
const mongoose =require('mongoose');
const DetailsUser = mongoose.model('Details');
var router =express.Router();
const User = mongoose.model('User');
var bcrypt = require('bcryptjs');
const passport =require('passport');


router.get('/',(req,res) => {
  res.render("home");
});

router.post('/', (req,res) => {
    User.findOne({username : req.body.name} ,(err,user) => {
        if(err) throw err;
        if(!user)
        {
            req.flash('error_msg', 'No User With this Name');
            res.redirect('/');
        }
        else
        {
            res.redirect('/profile/'+user.username+'/view');
        }
    })
})

router.get('/register',(req,res) => {
    res.render("register");
  });
  
router.post('/register',(req,res) => {
    insertRecord(req,res);
  });

  router.get('/login',(req,res) => {
    res.render("login");
  });

router.post('/login',(req,res,next) => {
    passport.authenticate('local', function(err, user, info) {

        if (err) { return next(err); }
        if (!user) { 
            return res.render('login', {
            message : 'Invalid Username or Incorrect Password'
        }); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          console.log(req.app.locals.authenticated);
          req.flash('Uusername',user.username);
          req.flash('success_msg','you are successfully logged in!');
          res.redirect('/profile');
        });
      })(req, res, next);
  });

  function init_details()
  {
    var details=DetailsUser();
    details.user_id= Math.random().toString(36).substring(9);
    details.save((err,doc) => {
        if(err)
        {
            throw err;
        }
    });
    return details.user_id;
  }

function insertRecord(req,res){
    var user =new User();
    user.email=req.body.email;
    user.fullname=req.body.fullname;
    user.username=req.body.username;
    user.password=req.body.password;
    user.class_8_details=init_details();
    user.class_9_details=init_details();
    user.class_10_details=init_details();
    user.overall_details=init_details();

    if(user.password!=req.body.conpassword)
    {
        var passwordError= 'Password not matched';
        res.render("register", {
            fullname : req.body.fullname,
            username : req.body.username,
            email : req.body.email,
            passwordError
        });
    }
    else if(req.body.password.length<1)
    {
        var passwordError='Password must be at least 8 characters';
        console.log('ok');
        res.render("register", {
            fullname : req.body.fullname,
            username : req.body.username,
            email : req.body.email,
            passwordError
        });
    }
    else{
    
        //if a user was found, that means the user's email matches the entered email
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) throw err;
                user.password=hash;
                user.save((err,doc) => {
                    if(!err){
                        req.flash('success_msg', 'Resgistration completed. Please login.')
                                res.redirect('/login');
                    }
                    else 
                    {
                        if(err.name == 'ValidationError')
                        {
                            handleValidationError(err,req.body);
                            if(req.body.emailError!='undefined' && req.body.userNameError!='undefined'){
                            res.render("register", {
                                fullname : req.body.fullname,
                                username : req.body.username,
                                email : req.body.email,
                                emailError : req.body.emailError,
                                userNameError:req.body.userNameError
                            });
                        }
                        else    if(req.body.emailError!='undefined'){
                            res.render("register", {
                                fullname : req.body.fullname,
                                username : req.body.username,
                                email : req.body.email,
                                emailError : req.body.emailError
                            });
                        }
                        else    if(req.body.userNameError!='undefined'){
                            res.render("register", {
                                fullname : req.body.fullname,
                                username : req.body.username,
                                email : req.body.email,
                                userNameError:req.body.userNameError
                            });
                        }
                        }
                        console.log("error in insertion: "+ err);
                    }
                });
            });
        });
            
        }
   
}


router.get('/admin/users', function(req, res) {
    var query = req.query.search;

    User.find({'username' : new RegExp(query, 'i')}, function(err, users){
        if(err) throw err;

    res.json({data:users});
});

});


module.exports=router;