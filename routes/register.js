const express=require('express');
const {user}=require('../models/user');
const router=express.Router();
const md5=require('md5');

router.get('/',function(req,res){
    res.render('register');
})
router.post('/',function(req,res){
    var userInstance=new user({
        username:req.body.username,
        password:md5(req.body.password),
        email:req.body.email
    });
    userInstance.save();
    res.redirect('/login');
})
module.exports=router;