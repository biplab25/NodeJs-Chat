//REQUIRING DEPENDENCIES
const express = require('express');
const helmet = require("helmet");
const path = require('path');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const viewRouter=require('./routes/viewRoutes');
const userRouter = require('./routes/userRoutes');
const VideoRouter = require('./routes/videoRoutes');
const uploadRouter = require('./routes/uploadRoutes');
const chatRouter = require('./routes/chatRoutes');
const AppError=require('./utils/appError');
const session = require('express-session')
const cookieParser=require('cookie-parser');
const cors=require('cors');
const multer = require('multer');
const GridFsStorage = require( 'multer-gridfs-storage' );
const crypto = require('crypto');
const expressValidator=require('express-validator');
const flash=require('connect-flash');

//OUR MAIN APP
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


//TEMPLATE ENGINE
app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views'));

//STATIC FILE SERVING
app.use(express.static(path.join(__dirname, 'public')));
//SESSION VALIDATOR
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))
//EXPRESS MESSAGES
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});



//app.use(cors());
app.use(cors({ origin: true, credentials: true }));
//USING MIDDLEWARE
//app.use(helmet());
app.use(mongoSanitize());
app.use((req,res,next)=>{
//   var authheader = req.headers.authorization;
//   console.log(req.headers);
   console.log(req.body);
   next();
 })

//ROUTES
app.use('/',viewRouter);
app.use('/',userRouter);
//app.use('/movies',movieRouter);
//app.use('/subscribe',subscribeRouter);
app.use('/video',VideoRouter);
app.use('/',uploadRouter);
app.use('/',chatRouter);
app.all('*',(req,res,next)=>{
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  

module.exports=app;
