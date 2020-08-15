
// // XMLHttpRequest
// let xhr = new XMLHttpRequest();
// xhr.open('POST', 'https://hexschool-tutorial.herokuapp.com/api/signup', true);

// // 格式：application/x-www-form-urlencoded
// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// xhr.send('email=abcde@gmail.com');

// // 格式：JSON
// // let account = {
// //   email:'abcdef@gmail.com',
// //   password: '1234'
// // };
// // xhr.setRequestHeader("Content-type", "application/json");
// // xhr.send(JSON.stringify(account));

const wrap = document.querySelector('.wrap');
const loginBtn = document.querySelector('#login-btn');
const loginAPI = 'https://hexschool-tutorial.herokuapp.com/api/signin';

let validateEmail = (str) => {
  let rule = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return rule.test(str);
};

let login = (e) => {
  e.preventDefault();
  let email = document.querySelector('input[name="email"]');
  let password = document.querySelector('input[name="password"]');
  const helpText = document.querySelector('#helpText');
  let accInfo = {};
  accInfo.email = email.value;
  accInfo.password = password.value;

  if (email.value.trim() === '' || password.value === '') {
    helpText.textContent = 'email/密碼欄位不得為空';
    return;
  } else if (!validateEmail(email.value.trim())) {
    helpText.textContent = 'email格式錯誤';
    return;
  }

  let xhr = new XMLHttpRequest();  
  xhr.open('POST', loginAPI, true);
  xhr.setRequestHeader("Content-type", "application/json");
  console.log(JSON.stringify(accInfo));
  xhr.send(JSON.stringify(accInfo));

  xhr.onload = () => {
    email.value = '';
    password.value = '';
    let callbackData = JSON.parse(xhr.responseText);
    console.log(callbackData);
    let verify = callbackData.message;
    if (verify === "登入成功"){
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
      
      helpText.textContent = verify;
    }
  }

}

loginBtn.addEventListener('click', login);