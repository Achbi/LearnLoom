const express = require("express");
const UserMiddleware =  require("../middleware/user");
const router = express.Router();
const {user,course} = require("../db");

router.post('/signup',async function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    user.findOne({
        username: username,
    })
    .then(function(value){
        if(value){
            res.json({
                msg: " user already exist"
            })
        }
        else{
            
            user.create({
                username:username,
                password:password
        
            })
        
            res.json({
                Message: "user created succesfully"
            })


        }

    })


});

router.get('/courses', UserMiddleware,async function(req,res){

const response = await course.find({});
res.json({
   courses:response
})
});

router.post('/courses/:courseid', UserMiddleware, async function(req,res){
    const courseID = req.params.courseid;
    const username = req.headers.username;

    await user.updateOne({
        username: username
    },{
    "$push": {
        purchasedCourses:courseID
    }
})

    res.json({
        msg : " updates succesfull"
    })


});

router.get('/purchasedCourse', UserMiddleware,async function(req,res){
   const use =  await user.findOne({
      username: req.headers.username
   });
   console.log(use.purchasedCourses)
   const courses = await course.find({
    _id:{
        "$in":use.purchasedCourses
    }

   })
   res.json({
    courses:courses
   })


});

module.exports = router;