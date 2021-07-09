const commonModel = require('../models/commonModel');
const authModel = require('../models/authModel');
const authController = function() {};
const resMessage = require('../helpers/res-message');
const bcryptjs = require('bcryptjs');
const commonFun = require('../helpers/commonFun');


//***** SIGN-UP START *****//
authController.registration = async (req, res, next) => {
    req.assert('first_name', 'first_name is required').notEmpty();
    req.assert('last_name', 'last_name is required').notEmpty();
    req.assert('email', 'email is required').notEmpty();
    req.assert('password', 'password is required').notEmpty();
    req.assert('gender', 'gender is required').notEmpty();
    req.assert('dob', 'dob is required').notEmpty();
    let errors = req.validationErrors();
    if (!errors) {
        try {
           
            let checkEmailExist = await commonModel.selectAllWhere('users',{email:req.body.email})
            if(checkEmailExist.length) return res.json({status: false, msg: resMessage.emailExist,data:[], token:''})
            
            req.body.password = await bcryptjs.hash(req.body.password, 10);
            let result = await commonModel.insert('users',req.body) 

            req.body = {...req.body, id: result.insertId}
            let token = await commonFun.generateToken(req.body);
            delete req.body.password;
            await commonModel.insert('auth_token',{id:token,user_id:req.body.id}); 
            return res.json({status: true, msg: resMessage.registration, data: [req.body], token: token});
        }catch(err){
            return res.json({status: false, err:err, msg: resMessage.registrationErr,data:[],token: ''});
        }

    } else {
        var err_msg = "";
        errors.forEach((err) => { err_msg += err.msg + ", " });
        return res.json({ status: false, msg: err_msg });
    }
}
//***** SING-UP END *****//

//***** SING-IN START*****//
authController.login = async (req, res, next)=>{
    req.assert('email', 'email is required').notEmpty();
    req.assert('password', 'password is required').notEmpty();
    let errors = req.validationErrors();
    if (!errors) {
       try{
            let getUser = await commonModel.selectAllWhere("users",{email:req.body.email});
            if(!getUser.length) return res.json({status: false, msg: resMessage.inavalidEmail, data:[], token:''});
            // PASSWORD MATCH
            let matched = await bcryptjs.compare(req.body.password, getUser[0].password);
            if (!matched) return res.json({status: false, msg: resMessage.invalidPass, data:[], token:''});
            // CONVERT getUser BECAUSE IT IS NOT A PLAN OBJECT FOR GENERATING TOKEN
            var jsonToString = JSON.stringify(getUser);
            var stringToJson = JSON.parse(jsonToString);
            let token = await commonFun.generateToken(stringToJson[0]);
            await commonModel.insert('auth_token', { id:token, user_id: getUser[0].id }); 
            delete getUser[0].password;
            return res.json({status: true, msg: resMessage.login, data: getUser[0], token: token});            
        } catch(err){
            return res.json({status: false, msg: resMessage.loginFailed, data: [], token: ''});            
       }
    } else {
        var err_msg = "";
        errors.forEach((err) => { err_msg += err.msg + ", " });
        return res.json({ status: false, msg: err_msg });
    }
}
//***** SING-IN END *****//

//***** GET USERS LIST START *****//
authController.getUserList = async (req, res, next) =>{
    try{
        let result = await commonModel.selectAll("users");
        if(result.length) {
            for(let x of result){
                delete x.password;
            }
            return res.json({ status: true, msg: resMessage.dataFound ,data: result });
        }
        else return res.json({ status: false, msg: resMessage.noDataFound ,data: [] });
    }catch(err){
        return res.json({ status: false, msg: resMessage.noDataFound ,data: [] });
    }
}
//***** GET USERS LIST END *****//

//***** UPDATE USER START *****//
authController.updateUser = async (req, res, next) =>{
    try{
        await commonModel.update("users", req.body, { id: req.params.id });   
        return res.json({status: true, msg: resMessage.updateSucc});            
    }catch(err){
        return res.json({status: false, msg: resMessage.updateFailed});            
    }
}
//***** UPDATE USER END *****//

//***** CHANGE USER PASSWORD START *****//
authController.changePass = async (req, res, next) =>{
    req.assert('password', 'password is required').notEmpty();
    let errors = req.validationErrors();
    if (!errors) {
        try{
            getUser = await commonModel.selectAllWhere("users",{id:req.params.id});
            let matched = await bcryptjs.compare(req.body.password, getUser[0].password);
            if(matched) return res.json({status: false, msg: resMessage.chooseAnotherPas});
            await commonModel.update("users", {password: await bcryptjs.hash(req.body.password, 10)},{id: req.params.id});    
            return res.json({status: true, msg: resMessage.updateSucc});
        } catch(err){
            return res.json({status: false, msg: resMessage.updateFailed});
        }
    } else {
        var err_msg = "";
        errors.forEach((err) => { err_msg += err.msg + ", " });
        return res.json({ status: false, msg: err_msg });
    }
}
module.exports = authController;
//***** CHANGE USER PASSWORD END *****//
