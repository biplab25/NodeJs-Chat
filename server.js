const mongoose = require('mongoose');
//REQUIRE DOTENV FILE
const dotenv=require('dotenv');
dotenv.config({ path: './config.env' });
//REQIRE APP.JS FILE
const app= require('./app');
// const DB = process.env.DATABASE.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD
//   );

const DB = process.env.DATABASE

  mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false.valueOf,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App is running on port ${port}......`);
})
