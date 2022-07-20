import {ALERT_SHOW_TIME} from './const.js';


const bodyElement = document.querySelector('body');

const checkStringLength = (value, maxLength) => value.length <= maxLength;

const isEscapeKey = (evt) => evt.key === 'Escape';


const openPopup = (element) => {
  element.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

const closePopup = (element) => {
  element.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};


const stopPropogationOnEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-container');

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {bodyElement, checkStringLength, isEscapeKey, openPopup, closePopup, stopPropogationOnEscapeKeydown, showAlert};
