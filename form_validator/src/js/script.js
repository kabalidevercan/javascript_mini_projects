const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const form = document.getElementById('form');
const button = document.getElementById('button');
const usernameborder = document.getElementById('usernameborder');
const emailborder = document.getElementById('emailborder');
const passwordborder = document.getElementById('passwordborder');
const repasswordborder = document.getElementById('repasswordborder');
const phoneborder = document.getElementById('phoneborder');
const usernamewarning = document.getElementById('usernamewarning');
const emailwarning = document.getElementById('emailwarning');
const phonewarning = document.getElementById('phonewarning');
const passwordwarning = document.getElementById('passwordwarning');
const repasswordwarning = document.getElementById('repasswordwarning');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (username.value == '') {
    usernameborder.classList.add('border-red-500');
    usernameborder.classList.add('duration-500');
    const div = usernameborder.nextElementSibling;
    div.innerText = 'Username gerekli';
  } else {
    usernameborder.classList.add('border-green-500');
    usernamewarning.classList.add('hidden');
  }

  if (phone.value == '') {
    phoneborder.classList.add('border-red-500');
    phoneborder.classList.add('duration-500');
    const div = phoneborder.nextElementSibling;
    div.innerText = 'Numara gerekli';
  } else {
    phoneborder.classList.add('border-green-500');
    phonewarning.classList.add('hidden');
  }
  if (email.value == '') {
    emailborder.classList.add('border-red-500');
    emailborder.classList.add('duration-500');
    const div = emailborder.nextElementSibling;
    div.innerText = 'Email gerekli';
  } else {
    emailborder.classList.add('border-green-500');
    emailborder.classList.add('duration-500');
  }
  if (password.value == '') {
    passwordborder.classList.add('border-red-500');
    password.classList.add('duration-500');
    const div = passwordborder.nextElementSibling;
    div.innerText = 'Password gerekli';
  } else {
    passwordborder.classList.add('border-green-500');
    passwordborder.classList.add('duration-500');
  }
  if (repassword.value == '') {
    repasswordborder.classList.add('border-red-500');
    repassword.classList.add('duration-500');
    const div = repasswordborder.nextElementSibling;
    div.innerText = 'Tekrar Password girin!';
  } else {
    repasswordborder.classList.add('border-green-500');
    repasswordborder.classList.add('duration-500');
  }
});
