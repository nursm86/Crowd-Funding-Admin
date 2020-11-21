const express 	 = require('express');
const userModel  = require.main.require('./models/userModel');
const validate   = require.main.require('./assets/validation/validate');
const router 	 = express.Router();

// router.get('*',  (req, res, next)=>{
// 	if(req.cookies['uid'] == null && req.cookies['type'] !=0){
// 		res.redirect('/login');
// 	}else{
// 		next();
// 	}
// });

router.get('/', (req, res)=>{
		res.render('Home/index');
});

module.exports = router;