const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	if(req.session.uid !=null){
		res.redirect('home');
	}
	else if(req.cookies['uid'] == null && req.cookies['type'] == null){
		res.render('login/index');
	}
	else{
		req.session.uid = req.cookies['uid'];
		req.session.type = req.cookies['type'];
		res.redirect('/home');
	}
});

router.post('/', (req, res)=>{

	var user = {
		username: req.body.username,
		password: req.body.password,
	};
	userModel.validate(user, function(result){
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
			res.redirect('/login');
		}
	});
}); 

module.exports = router;