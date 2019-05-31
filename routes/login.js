const express=require('express');
const {user}=require('../models/user');
const router=express.Router();
const md5=require('md5');
var arr=[];

router.get('/',function(req,res){
    res.render('login');
})
router.post('/',function(req,res){
    user.find({
        username:req.body.username,
        password:md5(req.body.password)
    },function(err,result){
        if (err) {
            throw err;
        }
        if (result.length) {
            req.session.username = req.body.username;
            req.session.password = md5(req.body.password);
            res.redirect('add/list');
        }else{
            console.log("用户名不存在密码错误");
            res.render('test');
        }
    })
})
router.get('test',function(req,res){
   
  
})
module.exports=router;