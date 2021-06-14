//import axios from 'axios';
//import { showAlert } from './alerts';

// const signup = async (username,email, password,passwordConfirm) => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: 'http://127.0.0:8000/users/signup',
//       data: {
//         username,
//         email,
//         password,
//         passwordConfirm
//       }
//     });

//     if (res.data.status === 'success') {
//       alert('Logged in successfully!');
//       window.setTimeout(() => {
//         location.assign('/');
//       }, 1500);
//     }
//   } catch (err) {
//     alert(err.response.data.message);
//   }
// };

const signup=async(username,email, password,passwordConfirm)=>{
  console.log(username,email, password,passwordConfirm);
  try{
    const res= await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/signup',
      data: {
                username,
                email,
                password,
                passwordConfirm
              },
      withCredentials :true
    });
    console.log(res);
    if (res.data.status === 'success') {
      //alert('success', 'signup successfully!');
      //req.flash('success','You are registered!');
      window.setTimeout(() => {
        location.assign('/login');
      }, 1500);
    }
  }catch(error){
      console.log(error.response.data.message);
  }
  
};

const signupBtn = document.querySelector('#signup-form');
signupBtn.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(username,email, password,passwordConfirm);
  });
