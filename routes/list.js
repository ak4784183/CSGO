const express = require('express');
const router = express.Router();
const fs=require('fs');
const path=require('path');
const formidable=require('formidable');
const {product}=require('../models/product');
const login=require('../middlewares/login');
var finds=[];
//body-parser不能用的情况下用querystring 
//const querystring=require('querystring');


/* GET home page. */
router.get('/delete/:id',login,function(req, res) {
  product.findByIdAndRemove(req.params.id,function(err){
    if (err) {
      throw err;
    }
    console.log("delete success");
    fs.unlink(path.join(__dirname,"../",'uploads',req.query.img),function(err){
      if (err) {
        throw err;
      }
      console.log("picture was deleted");
    })
    res.redirect("/add/list");
    //res.redirect('back');
  })
});


router.get('/update/:id',login,function(req,res){
  product.findById(req.params.id,function(err,result){
    if (err) {
      throw err;
    }
    res.render('update',{data:result});
  })
})

router.post('/update/:id',login,function(req,res){
  const form=new formidable.IncomingForm();
  form.keepExtensions=true;
  form.uploadDir=path.join(__dirname,"../","uploads");
  form.parse(req,function(err,fields,files){
    if (err) {
      throw err;
    }
    var obj={
      ...fields,
      updateAt:new Date()
    }
    if (files.pic.name) {
      obj.pic="/"+path.basename(files.pic.path);
    }else{

    }
    product.findByIdAndUpdate(req.params.id,obj,function(err){
      if (err) {
        throw err;
      }
      console.log("update success");
      res.redirect('/add/list');
    })
  })
})

router.get('/find',login,function(req,res){
  //不引用body-parser中间件的情况下要转换字符串
  //var findname=JSON.stringify(req.query.search);
  var reg=new RegExp(req.query.search,'i');
  product.find({"name":{$regex:reg}},function(err,result){
    if (err) {
      throw err;
    }
    console.log("查询成功，结果如下："+result);
    res.render('find',{finds:result});
  })
})



module.exports = router;
