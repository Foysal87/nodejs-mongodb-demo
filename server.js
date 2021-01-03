require('./models/db');

const express =require('express');
const path =require('path');
const exphbs=require('express-handlebars');
//const expressLayouts=require('express-ejs-layouts');
const bodyparser =require('body-parser');
const flash=require('connect-flash');
const session =require('express-session');
const logger= require('morgan');


const userController = require('./controllers/userControllers');
const profileController = require('./controllers/profileController');

const passport =require('passport');
var app = express();
var cons = require('consolidate');

require('./config/passport')(passport);

app.use(logger('dev'));

// express session 
app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: false,
}));
// flash
app.use(flash());
app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.Uusername=req.flash('Uusername');
  next();
});
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');

app.use(express.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 3000;
app.use((req, res, next) => {
  if (!req.user)
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

app.listen(port, function() {
    console.log('Your node is running on port 3000 !!!')
  });


app.use('/',userController);
app.use('/profile',profileController);



