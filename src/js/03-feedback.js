import throttle from 'lodash.throttle';
const keyStore = 'feedback-form-state';

const formObjData = {};

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', handlerSubmit);
form.addEventListener('input', throttle(handlerInput, 500));

initForm();

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

function handlerInput() {
  formObjData.email = form.elements.email.value;
  formObjData.message = form.elements.message.value;
  localStorage.setItem(keyStore, JSON.stringify(formObjData));
}
function handlerSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);

  formData.forEach((val, nameField) => {
    formObjData[nameField] = val;
  });

  event.currentTarget.reset();
  localStorage.removeItem(keyStore);

  if (!formObjData.email || !formObjData.message)
    return alert('все поля должны быть заполнены! ');

  // if (formObjData.email && formObjData.message) {
  //   console.log(formObjData);
  // }
}
