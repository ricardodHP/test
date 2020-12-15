const createError = require('http-errors');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');

const app = express();

// var corsOptions = {
//     origin: "http://localhost:4200",
//     optionsSuccessStatus: 200
// };
app.use(cors());

app.enable(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// create tables
const db = require("./models");
// enable to sync database
//db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// region:: routes
app.use('/', indexRouter);
require('./routes/todo.route')(app);
// endregion


//region:: catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// endregion


// region:: error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// endregion
module.exports = app;
