const express 					  = require('express');
const bodyParser 				  = require('body-parser');
const userModel  				  = require.main.require('./models/userModel');
const { check, validationResult } = require('express-validator');
const urlencodedParser 			  = bodyParser.urlencoded({extended : false});
const router 	 				  = express.Router();

// router.get('*',  (req, res, next)=>{
// 	if(req.session.uid == null){
// 		res.redirect('/login');
// 	}else{
// 		next();
// 	}
// });

router.get('/', (req, res)=>{
	var value;
	if(req.session.uid != null){
		value = {
			id : req.session.uid,
			type :req.session.type
		};
	}
	else{
		value = {
			id : null,
			type : null
		};
	}
	console.log(value);
	userModel.getAllValidCampaings(function(results){
		var campaigns = results;
		userModel.getTop10Donation(function(results){
			res.render('Home/index',{user : value, campaigns : campaigns, donations : results});
		});
	});
});

router.get('/donate/:id',(req,res)=>{
	if(req.session.uid == null){
		req.session.err = "For Donating You should Login First";
		res.redirect('/login');
	}
	var value = {
		id : req.session.uid,
		type :req.session.type
	};
	userModel.getCampaignById(req.params.id,function(result){
		var campaigns = {
			id : req.params.id,
			title : result.title,
			image : result.image,
			username : result.username,
			email : result.email,
			tf : result.tf,
			rf : result.rf,
			pd : result.pd,
			ed : result.ed,
			description : result.description,
			status : result.status
		};
		res.render('home/donate',{user : value, campaign : campaigns});
	});
});

router.post('/donate/:id',(req,res)=>{
	if(req.session.uid == null){
		req.session.err = "For Donating You should Login First";
		res.redirect('/login');
	}
	var raised;
	userModel.getCampaignById(req.params.id,function(result){
		raised = result.rf;
		raised = (raised - 0) + (req.body.donate -0);
		var raisedfund = {
			id : req.params.id,
			rf : raised,
		};
		var total = result.tf;
		total = (total - 0) + (req.body.donate - 0);

		if(total < raised){
			userModel.DonateComplete(raisedfund,function(status){
				if(status){
					let date = new Date().toDateString();
					var donation = [req.session.uid,req.params.id,req.body.donate,date];
					userModel.insertIntoDonation(donation,function(status){
						if(status){
							res.redirect('/home');
						}
					});
				}
			});
		}
		else{
			userModel.Donate(raisedfund,function(status){
				if(status){
					let date = new Date().toDateString();
					var donation = [req.session.uid,req.params.id,req.body.donate,date];
					userModel.insertIntoDonation(donation,function(status){
						if(status){
							res.redirect('/home');
						}
						else{
							res.send("donate to korte parla na vaya");
						}
					});
				}
			});
		}
	});
});

router.get('delete/:id',(req,res)=>{
	if(req.session.uid == null && req.session.uid == 0){
		req.session.err = "For Donating You should Login First";
		res.redirect('/login');
	}
	userModel.deleteCampaign(req.params.id,function(){
		res.redirect('/home');
	});
});

router.get('/editcampaign/:id',(req,res)=>{
	if(req.session.uid == null && req.session.uid == 0){
		req.session.err = "For Donating You should Login First";
		res.redirect('/login');
	}
	var value = {
		id : req.session.uid,
		type :req.session.type
	};
	userModel.getCampaignById(req.params.id,function(result){
		var campaigns = {
			id : req.params.id,
			title : result.title,
			image : result.image,
			username : result.username,
			email : result.email,
			tf : result.tf,
			rf : result.rf,
			pd : result.pd,
			ed : result.ed,
			description : result.description,
			status : result.status
		};
		res.render('home/editCampaign',{user : value, campaign : campaigns});
	});
});

router.post('/campaignedit/:id',(req,res)=>{
	if(req.session.uid == null && req.session.uid == 0){
		res.redirect('/login');
	}
	var campaign = {
		id: req.params.id,
		title: req.body.title,
		ed : req.body.ed,
		description: req.body.description
	};
	var value = {
		id : req.session.uid,
		type :req.session.type
	};
	userModel.updateCampaign(campaign,function(status){
		if(status){
			userModel.getCampaignById(req.params.id,function(result){
				var campaigns = {
					id : req.params.id,
					title : result.title,
					image : result.image,
					username : result.username,
					email : result.email,
					tf : result.tf,
					rf : result.rf,
					pd : result.pd,
					ed : result.ed,
					description : result.description,
					status : result.status
				};
				res.render('home/editCampaign',{user : value, campaign : campaigns});
			});
		}
	});
});
module.exports = router;