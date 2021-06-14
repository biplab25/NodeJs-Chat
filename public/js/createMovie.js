//import axios from 'axios';
//import { showAlert } from './alerts';
const createMovie=async(moviename,duration,description,price)=>{
    console.log(moviename,duration,description,price);
    try{
      const res= await axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/users/signup',
        data: {
                  moviename,
                  duration,
                  description,
                  price
                }
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
  
  const createMovie = document.querySelector('#login-form');
  createMovie.addEventListener('submit', e => {
      e.preventDefault();
      const moviename = document.getElementById('moviename').value;
      const duration = document.getElementById('duration').value;
      const description = document.getElementById('description').value;
      const price = document.getElementById('price').value;
      createMovie(moviename,duration,description,price);
    });
  