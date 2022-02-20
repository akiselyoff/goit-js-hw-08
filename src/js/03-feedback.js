import throttle from 'lodash.throttle';
const keyStore = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

const formObjData = {};

form.addEventListener('input', throttle(handlerInput, 500));

initForm();

function handlerInput() {
  formObjData.email = form.elements.email.value;
  formObjData.message = form.elements.message.value;
  localStorage.setItem(keyStore, JSON.stringify(formObjData));
}

form.addEventListener('submit', handlerSubmit);

function handlerSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  formData.forEach((val, nameField) => {
    formObjData[nameField] = val;
  });

  event.currentTarget.reset();
  localStorage.removeItem(keyStore);

  console.log(formObjData);
}

function initForm() {
  const dataStore = localStorage.getItem(keyStore);
  if (dataStore) {
    const { email, message } = JSON.parse(dataStore);
    form.email.value = email;
    form.message.value = message;
    formObjData.email = email;
    formObjData.message = message;
  }
}
