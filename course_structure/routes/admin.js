const express = require("express");
const AdminMiddleware =  require("../middleware/admin");
const router = express.Router(); 
const {admin,course} = require("../db");
const {JWT_SECRET} = require("../solution/config");
const jwt = require("jsonwebtoken");


router.post('/signup',async function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    admin.findOne({
        username:username,
      })
      .then(function(value){
        if(value){
            res.json({
                msg: " user already exist"
            })
        }
        else{

             admin.create({
                username: username,
                password:password
        
            })
        
            res.json({
                Message: "admin created succesfully"
            })

        }
      })
    
   
});


router.post('/signin',async function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    console.log(JWT_SECRET);

    const user = await user.find({
        username,
        password
    })
    if(user){

    const token = jwt.sign({
        username

    },JWT_SECRET);
    res.json({
        token
    })
    }
    else{
        res.status(411).json({
            messages:"incorrect"
        })
    }
});

router.post('/courses', AdminMiddleware,async function(req,res){
    const title = req.body.title;
    const description = req.body.description;
    const imagelink = req.body.imagelink;
    const price = req.body.price;

    const newcourse = await course.create({
        title,
        description,
        imagelink,
        price
        // if key and value is same both do the same thing
    })
    console.log(newcourse);
    res.json({
        msg:"course created succesfully",courseID:  newcourse._id
    
    })
});

router.get('/courses', AdminMiddleware, async function(req,res){
    const response = course.find({});
    res.json({
        courses: response

    })
});


module.exports = router
