let userlogin;
let userpassword;
let username;

const setup = () => {
  username = document.getElementById('username');
  userlogin = document.getElementById('userlogin');
  userpassword = document.getElementById('userpassword');
  document.getElementById('buttonregister').addEventListener('click', () => register(false));
  console.log(`username : ${username.value}`)
  console.log(`login : ${userlogin.value}`)
  console.log(`password : ${userpassword.value}`)
}
window.addEventListener('DOMContentLoaded', setup);

const register =  async admin => {
  const userData = {
                     name : username.value,
                     login : userlogin.value,
                     password : userpassword.value,
                     admin : admin || false
                   };
  console.log(`username : ${userData.name}`)
  console.log(`login : ${userData.login}`)
  console.log(`password : ${userData.password}`)
  console.log(`data : ${userData.admin}`);
  const body = JSON.stringify(userData);
  const requestOptions = {
                         method :'POST',
                         headers : { "Content-Type": "application/json" },
                         body : body
                       };
  const response = await fetch(`/access/register`, requestOptions);
  if (response.ok) {
    const createdUser = await response.json();
    console.log(`user registered : ${JSON.stringify(createdUser)}`);
    window.location.href = '/login';
  }
  else {
    const error = await response.json();
    console.log(`erreur : ${error.message}`);
    document.getElementById('problem').textContent = `erreur : ${error.message}`;
  }
}

const adminRegister = () => register(true);
