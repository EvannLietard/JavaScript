let userlogin;
let userpassword;
let username;

const setup = () => {
  username = document.getElementById('username');
  userlogin = document.getElementById('userlogin');
  userpassword = document.getElementById('userpassword');
  document.getElementById('register').addEventListener('click', () => register(userlogin.value==="admin"));
}
window.addEventListener('DOMContentLoaded', setup);

const register = async admin => {
  console.log(`Value of username: ${username.value}`);
  console.log(`Value of userlogin: ${userlogin.value}`);
  console.log(`Value of userpassword: ${userpassword.value}`);
  
  const userData = {
    username : username.value,
    login : userlogin.value,
    password : userpassword.value,
    admin : admin || false
  };
  
  console.log(`Data in userData: ${JSON.stringify(userData)}`);
  console.log(`Value of admin: ${userData.admin}`);
  
  const body = JSON.stringify(userData);
  const requestOptions = {
    method :'POST',
    headers : { "Content-Type": "application/json" },
    body : body
  };
  
  const response = await fetch(`/access/register`, requestOptions);
  if (response.ok) {
    const createdUser = await response.json();
    console.log(`User registered: ${JSON.stringify(createdUser)}`);
    window.location.href = '/access/login';
  }
  else {
    const error = await response.json();
    console.log(`Error: ${error.message}`);
    document.getElementById('problem').textContent = `Error: ${error.message}`;
  }
}



