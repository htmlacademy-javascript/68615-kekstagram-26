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

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomUniqueIntegerArray = (min, max, length) => {
  const set = new Set();
  const count = Math.abs(Math.abs(max) - Math.abs(min)) + 1;

  while (set.size < count) {
    set.add(getRandomInt(min, max));
  }

  return Array.from(set).slice(0, length);
};


export {bodyElement, checkStringLength, isEscapeKey, openPopup, closePopup, stopPropogationOnEscapeKeydown, showAlert, getRandomUniqueIntegerArray};
