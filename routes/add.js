const express=require('express');
const router=express.Router();
const path=require('path');
const formidable=require('formidable');
const {product}=require('../models/product');
const login=require('../middlewares/login');
var arr=[];

router.get('/',login,function(req,res){
    res.render('add');
})
router.post('/',login,function(req,res){
    const form=new formidable.IncomingForm();
    form.keepExtensions=true;
    form.uploadDir=path.join(__dirname,"../","uploads");
    form.parse(req,function(err,fields,files){
        if(err) throw err;
        var obj={
            ...fields,
            pic:"/"+path.basename(files.pic.path),
        }
        var productInstance=new product(obj);
        productInstance.save();
        res.redirect('/add/list');
    })
})
router.get('/list',login,function(req,res){
    product.find({},function(err,results){
        if (err) {
            throw err;
        }
        res.render('list',{arr:results});
    })
   
})
module.exports=router;