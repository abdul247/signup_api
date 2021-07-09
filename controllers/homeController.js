var homeController=function(){}

homeController.index=function(req,res){
    req.flash('success', 'Welcome to Node app');
    res.render('home/index',{title:'Node APP'});
}

module.exports=homeController