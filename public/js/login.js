
const login=async(email, password)=>{
    console.log(email, password);
    try{
      const res= await axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/users/login',
        data: {
                  email,
                  password
                },
        withCredentials :true
      });
      console.log(res);
      // // // if (res.data.status === 'success') {
      // // //   alert('success', 'login successfully!');
      // // //   window.setTimeout(() => {
      // // //     location.assign('/');
      // // //   }, 1500);
      // // // }
    }catch(error){
        console.log(error.response.data.message);
    }
    
  };
  
  const loginBtn = document.querySelector('#login-form');
  loginBtn.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      login(email, password);
    });
  