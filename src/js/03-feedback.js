import throttle from 'lodash.throttle';

const FEEDBACK_FORM_STATE = 'feedback-form-state';
const EMAIL = 'email';
const MESSAGE = 'message';

const sendForm = document.querySelector('.feedback-form');
const emailField = document.querySelector('input');
const messageField = document.querySelector('textarea');

function onLoad() {
  const formDataRaw = localStorage.getItem(FEEDBACK_FORM_STATE);
  let formData;
  if (formDataRaw) {
    formData = JSON.parse(formDataRaw);
    if (formData?.email) {
      emailField.value = formData[EMAIL];
    }
    if (formData?.message) {
      messageField.value = formData[MESSAGE];
    }
  }
}

onLoad();
sendForm.addEventListener('input', throttle(onInput, 500));
sendForm.addEventListener('submit', onSubmit);

function onInput(event) {
  const formDataRaw = localStorage.getItem(FEEDBACK_FORM_STATE);
  let formData;
  if (formDataRaw) {
    formData = JSON.parse(formDataRaw);
  }
  if (event.target.nodeName === 'INPUT') {
    formData = {
      ...formData,
      [EMAIL]: emailField.value,
    };
  }
  if (event.target.nodeName === 'TEXTAREA') {
    formData = {
      ...formData,
      [MESSAGE]: messageField.value,
    };
  }
  localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(formData));
}

function onSubmit(event) {
  event.preventDefault();
  const formDataRaw = localStorage.getItem(FEEDBACK_FORM_STATE);
  if (formDataRaw) {
    console.log(JSON.parse(formDataRaw));
    localStorage.removeItem(FEEDBACK_FORM_STATE);
  }
  emailField.value = '';
  messageField.value = '';
}
