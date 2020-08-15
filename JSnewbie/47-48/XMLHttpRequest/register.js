const wrap = document.querySelector('.wrap');
const signupBtn = document.querySelector('#signup-btn');
const signupAPI = 'https://hexschool-tutorial.herokuapp.com/api/signup';

let signup = (e) => {
  e.preventDefault();
  let email = document.querySelector('input[name="email"]').value;
  let password = document.querySelector('input[name="password"]').value;
  let accInfo = {};
  accInfo.email = email;
  accInfo.password = password;

  let xhr = new XMLHttpRequest();  
  xhr.open('POST', signupAPI, true);
  xhr.setRequestHeader("Content-type", "application/json");
  console.log(JSON.stringify(accInfo));
  xhr.send(JSON.stringify(accInfo));

  xhr.onload = () => {
    let callbackData = JSON.parse(xhr.responseText);
    console.log(callbackData);
    let verify = callbackData.message;
    if (verify === "帳號註冊成功"){
      console.log('註冊成功');
      const wrap = document.querySelector('.wrap');
      wrap.classList.add('fade');
      
      setTimeout( () => {
        wrap.classList.add('fade-out');
        wrap.classList.remove('fade');
        wrap.innerHTML = '';
      }, 2500);

      setTimeout( () => {
      window.location = '.';
      }, 3000);

      
      
    } else {
      console.log('失敗');
      const helpText = document.querySelector('#helpText');
      helpText.textContent = verify;
    }
  }
}

signupBtn.addEventListener('click', signup);

