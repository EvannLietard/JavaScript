let userlogin;
let userpassword;
let username;

const setup = () => {
  username = document.getElementById('username');
  getUser();
  document.getElementById('logout').addEventListener('click', logout);
}
window.addEventListener('DOMContentLoaded', setup);

const getUser = async () => {
  const requestOptions = {
                           method :'GET',
                         };
  const response = await fetch('/user/me', requestOptions);
  if (response.ok) {
    const user = await response.json();
    username.value = user.name || '';
  }
  else {
    const error = await response.json();
    handleError(error);
  }
}

const logout = async () => {
    const requestOptions = {
                           method :'GET',
                         };
    const response = await fetch(`/access/logout`, requestOptions);
    if (response.ok) {
      window.location.href= '/';
    }
  }
  
  