var express = require('express');
var router = express.Router();
const multer = require('multer');
var userModel = require('./users');
var passport = require('passport');
const localstrategy =require('passport-local');
const upload = require('./multer');
passport.use(new localstrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/register',function(req, res, next) {
  var userdata = new userModel({
    username:req.body.username,
    email:req.body.email,
    // secret:req.body.secret
  });
  userModel.register(userdata,req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req, res, function(){
      res.redirect('/home');
    });
  });
}); 

router.get('/login', function(req,res){
  res.render('login');
});

router.post('/login', passport.authenticate('local',{
  successRedirect:"/home",
  failureRedirect:"/"
}), function(req,res){})

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if (err) {return next(err);}
    res.redirect('/');
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

router.get('/home', isLoggedIn,function(req,res){
  const user = req.user
  res.render('home',{user})
});

router.get('/editProfile',isLoggedIn,function(req,res){
  const user = req.user
  res.render('profile',{user})
})

router.post('/upload',upload.single('profileImage'), isLoggedIn, async function(req,res){
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  user.profileImage = "/images/uploads/" + req.file.filename;
  await user.save();
  // res.redirect('/Profile',{user});
  // res.send(user);
  console.log(user);
})




module.exports = router;
