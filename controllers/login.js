const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{

	var user = {
		username: req.body.username,
		password: req.body.password
	};

	userModel.validate(user, function(status){
		if(type == 0){
            res.cookie('uname', req.body.username);
            res.cookie('type',0);
			res.redirect('/Admin');
		}
		else if(type == 1){
			res.send("Not yet ready for login");
		}
		else{
			res.redirect('/login');
		}
	});
}); 

module.exports = router;