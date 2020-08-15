const wrap = document.querySelector('.wrap');
const signupBtn = document.querySelector('#signup-btn');
const signupAPI = 'https://hexschool-tutorial.herokuapp.com/api/signup';

let validateEmail = (str) => {
  let rule = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return rule.test(str);
};

let validatePassword = (str) => {
  let rule = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
  return rule.test(str);
};

let signup = (e) => {
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
  } else if (!validatePassword(password.value)) {
    helpText.textContent = 'password 需要英數混合';
    return;
  }

  let xhr = new XMLHttpRequest();  
  xhr.open('POST', signupAPI, true);
  xhr.setRequestHeader("Content-type", "application/json");
  console.log(JSON.stringify(accInfo));
  xhr.send(JSON.stringify(accInfo));

  xhr.onload = () => {
    email.value = '';
    password.value = '';
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
      helpText.textContent = verify;
    }
  }

}

signupBtn.addEventListener('click', signup);

