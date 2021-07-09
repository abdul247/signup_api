const express = require('express');
const mysql = require('mysql');
const expressValidator = require('express-validator');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const config = require('./config');
const app = express();
const routes = require('./routes/routes');
// const routes = require('./routes/adminRoutes');
const path = require('path');
const methodOverride = require('method-override');
const moment = require('moment');
const ip = require("ip");
const errorHandler = require('./helpers/error-handler');
require('dotenv').config();

app.locals.moment = moment;
app.locals.shortDateFormat = "MM/DD/YYYY";

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(myConnection(mysql, config.database, 'pool'));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(expressValidator());
app.use(cookieParser('keyboard cat'));

//Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    return res.status(200).json({});
  }
  // console.log(req.headers.host);
  next();
});
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));
app.use(flash());
app.use(bodyParser.json());

//GROUP APP ROUTES
app.use('/', routes);
// app.use('/', adminRoutes);

// global error handler
app.use(errorHandler);

// Start server
app.listen(process.env.PORT, () => {
  console.log("Server started at http://" + ip.address() + ":" + process.env.PORT);
});
