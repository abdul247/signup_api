const nodemailer = require('nodemailer');

const resMessage = {
	login: "Login successfully",
	loginFailed: "Login failed",
	invalidPass: "Invalid password",
	inavalidEmail: "Invalid email",
	inavalidToken: "Invalid token",
	serverError: "There was an error",
	dataFound: "Data found",
	noDataFound: " No data found",
	serverError: "There was an error",
	addSucc: "Add successfully",
	registration: "Registration Successfully!",
	registrationErr: "There was an error in registration!",
	emailExist: "Email already exist, choose aother eamil!",
	notProvidedToken: "Token not provided!",
	updateSucc: "Update successfully!",
	updateFailed: "There was an error in update",
	chooseAnotherPas: "Choose another password"
};


module.exports = resMessage;