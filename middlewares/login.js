module.exports=function(req,res,next){
    //调试的话需要注释以下代码
    if (req.session.username && req.session.password) {
        next();
    } else {
        res.redirect('/login');
    }
    
}