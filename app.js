//declaration
const express 			= require('express');
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');
const cookieParser 		= require('cookie-parser');
const explayouts		= require('express-ejs-layouts');
const admin				= require('./Controllers/Admin');
const app				= express();
const port				= 3000;

//configuration
app.set('view engine', 'ejs');

//middleware
app.use(explayouts);
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));

app.use('/Admin', admin);

//router
app.get('/', (req, res)=>{
	res.render("login/index");
});

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});