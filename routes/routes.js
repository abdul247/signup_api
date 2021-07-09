const express=require('express');
const routes= express.Router();
const resMessage = require('../helpers/res-message');
const multer = require('multer');
const date = new Date();
const controllers= require('../controllers');
const jwt = require('jsonwebtoken');

//***** VERIFY TOKEN MIDDLEWARE START*****//
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        jwt.verify(req.token,process.env.secret_key,(err,authData)=>{
            req.decodeData = authData; 
            if(err) return res.json({status: false, msg:resMessage.inavalidToken});
            else next();
        });
    } else{
        return res.json({status: false, msg:resMessage.notProvidedToken})
    }
}
//***** VERIFY TOKEN MIDDLEWARE END *****//

multer({ dest: './public/images' });
multer({ dest: './public/varification_docs' });

const storageImg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, `customer_profile_${date.getDate()}-${date.getMonth()}-${date.getFullYear()}_${Math.floor(Math.random() * 10000000)}_${file.originalname}`);
    },
})
const storageDocs = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'image') {
            cb(null, './public/images/');
        } else if (file.fieldname === 'doc_name') {
            cb(null, './public/varification_docs/');
        }
    },
    filename: function (req, file, cb) {
        if (file.fieldname === 'image') {
            cb(null, `service_provider_profile_${date.getDate()}-${date.getMonth()}-${date.getFullYear()}_${Math.floor(Math.random() * 10000000)}_${file.originalname}`);
        } else if (file.fieldname === 'doc_name') {
            cb(null, `id_proof_${date.getDate()}-${date.getMonth()}-${date.getFullYear()}_${Math.floor(Math.random() * 10000000)}_${file.originalname}`);
        }
    },
});
var uploadImg = multer({ storage: storageImg }).single('image');
var uploadDocs = multer({ storage: storageDocs }).any();

//***** USER AUTHENTICATION START *****//
routes.post('/registration', controllers.authController.registration);
routes.post('/login', controllers.authController.login);
routes.get('/getUserList', verifyToken, controllers.authController.getUserList);
routes.post('/updateUser/:id', verifyToken, controllers.authController.updateUser);
routes.post('/changePass/:id', verifyToken, controllers.authController.changePass);
//***** UAER AUTHENTICATOIN END *****//

//HOME PAGE
routes.get('/',controllers.homeController.index);


module.exports=routes;