const express 	 = require('express');
const adminModel = require.main.require('./models/adminModel');
const userModel  = require.main.require('./models/userModel');
const validate   = require.main.require('./assets/validation/validate');

const router 	 = express.Router();

router.get('*',  (req, res, next)=>{
	if(req.session.uid == null && req.session.type !=0){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	var count;
	var valid;
	var invalid;
	var block;
	var complete;
	var released;
	var admin;
	var personal;
	var organization;
	var volunteer;
	userModel.getValidCampaignCount(function(result){
		valid = result.count;
		userModel.getInValidCampaignCount(function(result){
			invalid = result.count;
			userModel.getBlockCampaignCount(function(result){
				block = result.count;
				userModel.getCompleteCampaignCount(function(result){
					complete = result.count;
					userModel.getReleaseCampaignCount(function(result){
						released = result.count;
						userModel.getAdminCount(function(result){
							admin = result.count;
							userModel.getPersonalCount(function(result){
								personal = result.count;
								userModel.getOrganizationCount(function(result){
									organization = result.count;
									userModel.getVolunteerCount(function(result){
										volunteer = result.count;
										count = {
											valid : valid,
											invalid : invalid,
											block : block,
											complete : complete,
											released : released,
											admin : admin,
											personal : personal,
											organization : organization,
											volunteer : volunteer
										};
										res.render('Admin/index',count);
									});
								});
							});
						});
					});
				});
			});
		});
		
	});
});

router.get('/create',(req,res)=>{
	var error = {
		err_uname: "",
		err_name : "",
		err_pass : "",
		err_cpass : "",
		err_contact : "",
		err_email : "",
		err_address : "",
		err_sq : ""
	};
	res.render('Admin/createadmin',error);
});

router.post('/create',(req,res)=>{
	var admin = {
		name : req.body.name,
		username : req.body.username,
		password : req.body.password,
		cpassword : req.body.cpassword,
		contact : req.body.contact,
		email : req.body.email,
		address : req.body.address,
		sq : req.body.sq
	};
	validate.Admin(admin,function(error){
		console.log(error);
		if(error == null){
			adminModel.insert(admin,function(status){
				if(status){
					res.redirect('admin/adminlist');
				}
			});
		}
		else{
			res.render('admin/createadmin',error);
		}
	});
});

router.get('/profile',(req,res)=>{
	adminModel.getById(1,function(result){
		user = {
			name : result.name,
			email : result.email,
			address : result.address,
			phone : result.phone,
			sq : result.sq
		};
		res.render('Admin/profile',user);
	});
});

router.post('/edit',(req,res)=>{
	var user = {
		id: 1,
		name: req.body.name,
		email : req.body.email,
		address: req.body.address,
		phone : req.body.phone,
		sq : req.body.sq
	};
	adminModel.update(user,function(status){
		if(status){
			res.redirect('/admin/profile');
		}
	});
});

router.post('/campaignedit/:id',(req,res)=>{
	var campaign = {
		id: req.params.id,
		title: req.body.title,
		ed : req.body.ed,
		description: req.body.description
	};
	userModel.updateCampaign(campaign,function(status){
		if(status){
			userModel.getCampaignById(req.params.id,function(result){
				var campaign = {
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
				res.render('Admin/campaignedit',campaign);
			});
		}
	});
});

router.get('/personaluserlist',(req,res)=>{
	userModel.getAllPersonal(function(results){
		res.render('Admin/personalUserList',{users: results});	
	});
});

router.get('/adminlist',(req,res)=>{
	adminModel.getAll(function(results){
		res.render('Admin/adminlist',{admins: results});
	});
});

router.get('/organizationlist',(req,res)=>{
	userModel.getAllOrganization(function(results){
		res.render('Admin/organizationList',{organizations: results});	
	});
});

router.get('/volunteerlist',(req,res)=>{
	userModel.getAllVolunteer(function(results){
		res.render('Admin/volunteerList',{volunteers: results});	
	});
});

router.get('/campaignslist',(req,res)=>{
	userModel.getAllCampaings(function(results){
		res.render('Admin/campaignlist',{campaings : results});
	});
});

router.get('/problemlist',(req,res)=>{
	userModel.getAllProblems(function(results){
		res.render('Admin/problemlist',{problems : results});
	});
});

router.get('/userproblemlist',(req,res)=>{
	userModel.getAllUserProblems(function(results){
		res.render('Admin/userproblem',{problems : results});
	});
});

router.get('/releasedcampaign',(req,res)=>{
	userModel.getReleasedCampaings(function(results){
		res.render('Admin/releasedCampaign',{campaings : results});
	});
});

router.get('/personaluseredit/:uid',(req,res)=>{
	userModel.getPersonalById(req.params.uid,function(result){
		var user = {
			id : req.params.uid,
			username : result.username,
			name : result.name,
			email : result.email,
			phone : result.phone,
			address : result.address,
			type : result.type,
			status : result.status
		};
		res.render('Admin/personalUserEdit',user);
	});
});

router.get('/organizationalUseredit/:uid',(req,res)=>{
	userModel.getOrganizationById(req.params.uid,function(result){
		var organization = {
			id : req.params.uid,
			username : result.username,
			name : result.name,
			email : result.email,
			phone : result.phone,
			address : result.address,
			type : result.type,
			status : result.status
		};
		res.render('Admin/organizationalUserEdit',organization);
	});
});

router.get('/volunteeredit/:uid',(req,res)=>{
	userModel.getVolunteerById(req.params.uid,function(result){
		var volunteer = {
			id : req.params.uid,
			username : result.username,
			name : result.name,
			email : result.email,
			phone : result.phone,
			address : result.address,
			type : result.type,
			status : result.status
		};
		res.render('Admin/volunteerEdit',volunteer);
	});
});

router.get('/campaignedit/:uid',(req,res)=>{
	userModel.getCampaignById(req.params.uid,function(result){
		var campaign = {
			id : req.params.uid,
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
		res.render('Admin/campaignedit',campaign);
	});
});

router.get('/verifyuser/:id/:type',(req,res)=>{
	userModel.VerifyUser(req.params.id,function(status){
		if(status){
			if(req.params.type == 1){
				res.redirect('/admin/personaluserlist');
			}
			else if(req.params.type == 2){
				res.redirect('/admin/organizationlist');
			}
			else{
				res.redirect('/admin/volunteerlist');
			}
		}
	});
});

router.get('/blockuser/:id/:type',(req,res)=>{
	userModel.BlockUser(req.params.id,function(status){
		if(status){
			if(req.params.type == 1){
				res.redirect('/admin/personaluserlist');
			}
			else if(req.params.type == 2){
				res.redirect('/admin/organizationlist');
			}
			else{
				res.redirect('/admin/volunteerlist');
			}
		}
	});
});

router.get('/unblockuser/:id/:type',(req,res)=>{
	userModel.UnBlockUser(req.params.id,function(status){
		if(status){
			if(req.params.type == 1){
				res.redirect('/admin/personaluserlist');
			}
			else if(req.params.type == 2){
				res.redirect('/admin/organizationlist');
			}
			else{
				res.redirect('/admin/volunteerlist');
			}
		}
	});
});

router.get('/verifyCampaign/:id',(req,res)=>{
	userModel.VerifyCampaign(req.params.id,function(status){
		if(status){
			res.redirect('/admin/campaignslist');
		}
	});
});

router.get('/blockCampaign/:id',(req,res)=>{
	userModel.BlockCampaign(req.params.id,function(status){
		if(status){
			res.redirect('/admin/campaignslist');
		}
	});
});

router.get('/unblockCampaign/:id',(req,res)=>{
	userModel.UnBlockCampaign(req.params.id,function(status){
		if(status){
			res.redirect('/admin/campaignslist');
		}
	});
});

router.get('/releaseCampaign/:id',(req,res)=>{
	userModel.ReleaseCampaign(req.params.id,function(status){
		if(status){
			res.redirect('/admin/campaignslist');
		}
	});
});

router.post('/search',(req,res)=>{
	var user = {
		table: req.body.tablename,
		see : req.body.see,
		search : req.body.search,
		searchby: req.body.searchby
	};
	userModel.userSearch(user, function(results){
		if(results!=null){
			res.json({user:results});
		}else{
			res.json({user:'error'});
		}
	});
});

router.post('/get',(req,res)=>{
	var user = {
		field: req.body.field,
		value : req.body.val	
	};
	userModel.getUserName(user, function(results){
		if(results!=null){
			res.json({flag:true});
		}else{
			res.json({flag:false});
		}
	});
});

router.post('/adminsearch',(req,res)=>{
	var user = {
		search : req.body.search,
		searchby: req.body.searchby
	};
	adminModel.search(user, function(results){
		if(results!=null){
			res.json({user:results});
		}else{
			res.json({user:'error'});
		}
	});
});

router.post('/searchcampaign',(req,res)=>{
	var campaign = {
		see : req.body.see,
		search : req.body.search,
		searchby: req.body.searchby
	};
	userModel.campaignSearch(campaign, function(results){
		if(results!=null){
			res.json({user:results});
		}else{
			res.json({user:'error'});
		}
	});
});

router.get('/deleteReport/:id',(req,res)=>{
	userModel.deleteReport(req.params.id,function(status){
		if(status){
			res.redirect('/admin/problemlist');
		}
	});
});

router.get('/deleteproblem/:id',(req,res)=>{
	userModel.deleteProblem(req.params.id,function(status){
		if(status){
			res.redirect('/admin/userproblemlist');
		}
	});
});

module.exports = router;