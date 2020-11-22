const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.clearCookie('uid');
	res.clearCookie('type');
	req.session.uid = null;
	req.session.type = null;
	res.redirect('/login');
});

module.exports = router;



