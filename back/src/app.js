const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
var bodyParser = require('body-parser');
const session = require('express-session');

// importing routes
const serviceRoutes = require('./routes/product');
const adminRoutes = require('./routes/admin');

// settings
app.set('port', process.env.PORT || 3000);

// middleware
app.use(morgan('dev'));
app.use(cors(
    'Access-Control-Allow-Origin: *'
));
app.use(myConnection(mysql, {
	host: 'localhost',
	user: 'root',
	password: 'password',
	port: 8889,
	database: 'faciales'
}, 'single'));
app.use(express.urlencoded({
	extended: false
}));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


// routes
app.use('/services', serviceRoutes);
app.use('/admin', adminRoutes);
// app.use('/reservations', reservationRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log("server running in port 3000");
});

