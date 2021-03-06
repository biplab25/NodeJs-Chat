const User=require('./../model/userModel');
const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: false
  };
  res.cookie('jwt', token, cookieOptions);
  // res.status(statusCode).json({
  //   status: 'success',
  //   token,
  //   data: {
  //     user
  //   }
  // });

};

exports.postSignup=async(req,res,next)=>{
    const newUser=await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    createSendToken(newUser,201,res);
    req.flash('success', 'Successfull!! Now You Are A Member');
    res.status(201).redirect("/login");
  };

  exports.postLogin=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || ! password){
      req.flash('danger', 'Successfull!! Now You Are A Member');
      //next(new AppError(`Please provide email and password!`, 400));
    }
    const user=await User.findOne({email}).select('+password');
    if(!user || !(await user.correctPassword(password,user.password))){
      req.flash('danger', 'Successfull!! Now You Are A Member');
     // return next(new AppError('Incorrect email or password', 401));
    } 
    createSendToken(user,200,res);
    req.flash('success', 'Successfull!! Now You Are loggedIn');
    res.status(200).redirect("/");
}

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // // 3) Check if user changed password after the token was issued
      // if (currentUser.changedPasswordAfter(decoded.iat)) {
      //   return next();
      // }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      req.user = currentUser;
      return next();
  }
  next();
};


exports.forgotPassword = async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });
    console.log(resetURL);
    req.flash('success', 'Successfull!! Token sent to email!');
    res.redirect('/forgotPassword');
    // res.status(200).json({
    //   status: 'success',
    //   message: 'Token sent to email!'
    // });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err);
    res.status(200).json({
      status: 'error',
      message: err
    });

    // return next(
    //   new AppError('There was an error sending the email. Try again later!'),
    //   500
    // );
  }
};

exports.resetPassword = async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
};