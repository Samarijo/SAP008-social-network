import { signIn } from '../../lib/auth.js';

import {
  errorsFirebase,
  validateLogin,
} from '../../validations.js';

import { redirect } from '../../redirect.js';

export const mainLogin = () => {
  const printElements = document.createElement('div');
  printElements.classList.add('login-container');
  printElements.innerHTML = `
    <div class='logo'>
    <img src="./../img/Logo.png" alt="logo borboleta">
    <h1>Code Girls</h1>
    <h3>Mulheres que se transformam através da tecnologia.</h3>
    </div>
  <form class='input-container'> 
    <input class='input-email' type='text' id='email'/>
    <input class='input-password' type='password' id='password'/>
    <a id='btn-cadastro'href='#register'>Cadastre-se</a>
    <a href="#feed">
    <button type='button' class='btn-enter' id='btnEnter'>Entrar</button>
    </a>
  </form>
  <p class="msg-error"></p>
    `;
  const btnEnter = printElements.querySelector('#btnEnter');
  const email = printElements.querySelector('#email');
  const password = printElements.querySelector('#password');
  const errorMessage = printElements.querySelector('.msg-error');

  btnEnter.addEventListener('click', (event) => {
    event.preventDefault();
    const validation = validateLogin(email.value, password.value);
    if (validation === '') {
      signIn(email.value, password.value)
        .then(() => {
          printElements.innerHTML = '';
          redirect('#feed');
        })
        .catch((error) => {
          const errorFirebase = errorsFirebase(error.code);
          errorMessage.innerHTML = errorFirebase;
        });
    } else {
      errorMessage.innerHTML = validation;
    }
  });

  return printElements;
};
