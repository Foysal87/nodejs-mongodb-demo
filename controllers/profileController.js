const express =require('express');
const objectId =require('mongodb').ObjectId;
const mongo = require('mongodb').MongoClient;
const mongoose =require('mongoose');
const StudentUser = mongoose.model('Student');
const User =mongoose.model('User');
const url ='mongodb://localhost:27017';

var router =express.Router();
const {ensureAuthenticated} =require('../config/auth');


router.get('/',ensureAuthenticated,(req,res) => {
  
  res.render('profile' ,{
    username : req.user.username,
    fullname : req.user.fullname,
    email : req.user.email,
  });

});


router.post('/student_management',ensureAuthenticated,(req,res) => {
  
 res.redirect('/profile/student_management');

});
router.post('/student_management/class_8',ensureAuthenticated,(req,res) => {

  res.redirect('/profile/student_management/class_8');
 });

 router.get('/student_management',ensureAuthenticated,(req,res) => {
  
  res.render('student_course');
 
 });
 router.get('/student_management/class_8',ensureAuthenticated,(req,res) => {
  var student_list=[]

  var class_8_student=req.user.class_8;
  if(class_8_student.length > 0){
  for(var i=0;i<class_8_student.length;i++)
  {
    StudentUser.findOne({ username: class_8_student[i]}, function (err, usr) {
      if(!err)
      {
        student_list.push(usr);
        if (student_list.length==class_8_student.length)
        {
          res.render('class_8', {
            student_list : student_list          });
        }
      }
      else{
        throw err;
      }
    });
    
  }
  

}
else{
  res.render('class_8');
}
   
  
  });








  router.post('/student_management/class_8/create_new',ensureAuthenticated,(req,res) => {

    res.redirect('/profile/student_management/class_8/create_new');
   });
   router.get('/student_management/class_8/create_new',ensureAuthenticated,(req,res) => {

    res.render('create_new_student', {
      student_class : 8
    });
   });
  router.post('/student_management/create_new_student',ensureAuthenticated,(req,res) => {
  var studentUser=new StudentUser();
  studentUser.fullname=req.body.fullname;
  var student_class=req.body.student_class;
  studentUser.average_marks=req.body.avg_marks;
  studentUser.taught_days=req.body.total_teaching_days;
  studentUser.earnings=req.body.total_earn;
  studentUser.subjects=[];
  if(req.body.math=='1')
  {
    studentUser.subjects.push('Math');
  }
  if(req.body.english=='1')
  {
    studentUser.subjects.push('English');
  }
  if(req.body.bangla=='1')
  {
    studentUser.subjects.push('Bangla');
  }
  
  var class_8=req.user.class_8;
  var class_9=req.user.class_9;
  var class_10=req.user.class_10;
  studentUser.username = Math.random().toString(36).substring(10);
  if(student_class==8)
  {
    class_8.push(studentUser.username);
  }
  else if(student_class==9)
  {
    class_9.push(studentUser.username);
  }
  else{
    class_10.push(studentUser.username);
  }

  studentUser.save((err,doc) => {
    if(!err){
      mongo.connect(url , (err,client) => {
        var db= client.db('test_demodb');
        if(err) throw err;
        // user update
        db.collection('users').updateOne({"_id":objectId(req.user.id)}, {$set : {
          class_8 : class_8,
          class_9 : class_9,
          class_10 : class_10
        }},(err,result)=>
          { if(err) throw err;
      });
        req.flash('success_msg', 'Student Added!!')
        if(student_class==8){
          res.redirect('/profile/student_management/class_8');
        }
    });
  
  }
    else 
    {
      req.flash('error_msg', 'Sorry! Can not create student object!! try again.')
      if(student_class==8){
        res.redirect('/profile/student_management/class_8');
      }
    }
  });




    
  

  });

 router.post('/student_management/class_8/:username/edit' ,ensureAuthenticated,(req,res) => { 
  StudentUser.findOne({ username: req.params.username}, function (err, usr) {
    if(!err)
    {
   res.render('edit_student',
   {
     student_class: 8,
     fullname: usr.fullname,
     username: usr.username,
     subjects : usr.subjects,
     taught_days : usr.taught_days,
     earnings : usr.earnings,
     average_marks : usr.average_marks
   });
  }
  })
 });

 router.post('/student_management/class_8/:username/delete' ,ensureAuthenticated,(req,res) => { 
  
  
  StudentUser.findOne({ username: req.params.username}, function (err, usr) {
    if(!err)
    {
  mongo.connect(url , (err,client) => {
    var db= client.db('test_demodb');
    if(err) throw err;
    // user update
    db.collection('students').deleteOne({"_id":objectId(usr.id)});
    var class_8=req.user.class_8;
    var tmp=[];
    
    for(var i=0;i<class_8.length;i++)
    {
      if(class_8[i]==req.params.username)
      {
        continue;
      }
      tmp.push(class_8[i]);
    }
    class_8=tmp;
    db.collection('users').updateOne({"_id":objectId(req.user.id)}, {$set : {
      class_8 : class_8
    }},(err,result)=>
      { if(err) throw err;
        req.flash('success_msg', 'Student Delted!!')
          res.redirect('/profile/student_management/class_8');
        
  });


});
  }
});

 });



 
module.exports=router;