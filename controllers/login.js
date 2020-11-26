const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
var nodemailer 		= require('nodemailer');
const fs			= require('fs');
const router 		= express.Router();
const bodyParser 				  = require('body-parser');
const { check, validationResult } = require('express-validator');
const urlencodedParser 			  = bodyParser.urlencoded({extended : false});

router.get('/', (req, res)=>{
	if(req.session.uid !=null){
		res.redirect('home');
	}
	else if(req.cookies['uid'] == null && req.cookies['type'] == null){
		var error = {
			err_msg : req.session.err
		};
		res.render('login/index',error);
		req.session.err = null;
	}
	else{
		req.session.uid = req.cookies['uid'];
		req.session.type = req.cookies['type'];
		res.redirect('/home');
	}
});

router.get('/forgotpassword',(req,res)=>{
	var errors = {
		err_email : ""
	};
	res.render('Login/forgotpass',errors);
});

router.post('/forgotpassword',(req,res)=>{
	var email = req.body.email;
	userModel.getIdbyEmail(email,function(id){
		if(id){
			var otp = Math.round(Math.random()*10000);
			var user = [email,otp];
			var data=fs.readFileSync('./assets/json/otp.json', 'utf8');
			var userlist=JSON.parse(data);
			var newlist = [];

			userlist.forEach(function(user){
				newlist.push([user.email,user.otp]);
			});
			newlist.push(user);
			var userobj = [];
			newlist.forEach(function(user){
				userobj.push({
					email : user[0],
					otp : user[1]
				});

			});
			fs.writeFile("./assets/json/otp.json", JSON.stringify(userobj, null, 2), (err) => {
				if (err) {
					console.error(err);
					return;
				}
			});

			var transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
				  user: 'jannatnur998@gmail.com',
				  pass: 'ami onek dhongi'
				}
			  });
			  
			  var mailOptions = {
				from: 'jannatnur998@gmail.com',
				to: 'lucifersm786@gmail.com',
				subject: 'Password Re-Create Request',
				text: `Hi there, You Requested for a new OTP. 
						Here is you new Otp :`+ otp
				// html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
			  };
			  
			  transporter.sendMail(mailOptions, function(error, info){
				if (error) {
				   res.send("kaj hoy nai");
				} else {
					res.redirect('/login/changePass/'+email);
				}
			  });
		}
		else{
			var errors = {
				err_email : "Email Does not Exist!!!"
			};
			res.render('Login/forgotpass',errors);
		}
	});
});

router.get('/changePass/:email',(req,res)=>{
	res.render('Login/changePass');
});

router.post('/changePass/:email',urlencodedParser,[
	check('npass','Password does not match!!!')
		.exists()
		.isLength({min : 6})
		.withMessage('Password must be atleast 6 character long!!!')
		.custom((value, { req }) => value === req.body.cpass)
		.withMessage("Password does not match!!!"),
	check('otp','Otp Can not be empty')
		.not().isEmpty()
		.exists()
],(req,res)=>{
	const errors = validationResult(req);
	var image;
	if(!errors.isEmpty()){
		const alert = errors.array();
		res.render('login/changePass',{
			alert
		});	
	}
	else{

		var data=fs.readFileSync('./assets/json/otp.json', 'utf8');
		var list=JSON.parse(data);
		var userlist = [];
		list.forEach(function(user){
			userlist.push([user.email,user.otp]);
		});
		var flag = false;
		var userobj = [];
		userlist.forEach(function(user){
			if(req.params.email != user[0]){
				userobj.push({
					email : user[0],
					otp : user[1]
				});
			}
			if(req.params.email == user[0] && req.body.otp == user[1]){
				flag = true;
			}
		});
		if(flag){
			fs.writeFile("./assets/json/otp.json", JSON.stringify(userobj, null, 2), (err) => {
				if (err) {
					console.error(err);
					return;
				}
				else{
					userModel.updatePasswordbyEmail([req.body.npass,req.params.email],function(status){
						if(status){
							res.redirect('/login');
						}
						else{
							res.send("kaj to hoilo na");
						}
					});
				}
			});
		}
		else{
			var error = {
				err_email :"Your otp was not correct Please try again"
			};
			res.render('login/forgotPass',error);
		}
	}
});


router.post('/', (req, res)=>{
	var user = {
		username: req.body.username,
		password: req.body.password,
	};
	userModel.validate(user, function(result){
		if(result != null){
			if(req.body.rememberme!=null){
				res.cookie('uid', result.id);
				res.cookie('type',result.type);
			}
			req.session.uid = result.id;
			req.session.type = result.type;
			if(result.type == 0){
				res.redirect('/home');
			}
			else if(result.type == 1){
				res.redirect('/home');
			}
			else{
				var error = {
					err_msg : "You are not allowed to login yet!!!"
				};
				res.render('login/index',error);
			}
		}
		else{
			var error = {
				err_msg : "User Name or Password Is wrong!!!"
			};
			res.render('login/index',error);
		}
	});
}); 

module.exports = router;