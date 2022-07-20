import {MAX_HASHTAG_QTY, MAX_HASHTAG_LENGTH, HASHTAG_REG_EXP, HASHTAG_DELIMITER, MAX_COMMENT_LENGTH} from './const.js';
import {sendData} from './api.js';
import {closeAndClearImgUploadPopup, onPopupEscKeydown} from './download-image-popup.js';
import {isEscapeKey, bodyElement} from './util.js';


const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsFieldElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionFieldElement = uploadFormElement.querySelector('.text__description');
const imgUploadSubmitElement = uploadFormElement.querySelector('.img-upload__submit');
const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');


const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'field__error'
}, false);


const prepareHashtags = (value) => value.trim().split(HASHTAG_DELIMITER).filter((hashtag) => hashtag.length > 0);

const validateHashtagsQty = (value) => prepareHashtags(value).length <= MAX_HASHTAG_QTY;

const validateHashtagsUniqueness = (value) => {
  const hashtags = prepareHashtags(value);
  const uniqueHashtags = [];

  for (let i = 0; i < hashtags.length; i++) {
    const preparedHashtag = hashtags[i].toLowerCase();
    if (uniqueHashtags.includes(preparedHashtag)) {
      return false;
    } else {
      uniqueHashtags.push(preparedHashtag);
    }
  }

  return true;
};

const validateHashtagsByRegExp = (value) => {
  const hashtags = prepareHashtags(value);

  for (let i = 0; i < hashtags.length; i++) {
    if (!HASHTAG_REG_EXP.test(hashtags[i])) {
      return false;
    }
  }

  return true;
};

const validateDescription = (value) => value.length <= MAX_COMMENT_LENGTH;


const addUploadFormValidators = () => {
  pristine.addValidator(hashtagsFieldElement, validateHashtagsQty, `Максимально допустимое количество хештегов - ${MAX_HASHTAG_QTY}`);
  pristine.addValidator(hashtagsFieldElement, validateHashtagsUniqueness, 'Все хештеги должны быть уникальными');
  pristine.addValidator(hashtagsFieldElement, validateHashtagsByRegExp, `Каждый хештег должен начинаться с #, состоять из букв и цифр, максимальное количество символов - ${MAX_HASHTAG_LENGTH}`);
  pristine.addValidator(descriptionFieldElement, validateDescription, `Максимально допустимое количество символов - ${MAX_COMMENT_LENGTH}`);
};


const showSuccessPopup = () => {
  const fragment = document.createDocumentFragment();
  const element = successPopupTemplate.cloneNode(true);
  fragment.appendChild(element);
  bodyElement.appendChild(fragment);

  const onSuccessPopupButtonClick = (evt) => {
    evt.stopPropagation();

    element.remove();
    removeSuccessPopupHandlers();
  };

  element.querySelector('.success__button').addEventListener('click', onSuccessPopupButtonClick);


  const onSuccessPopupEscKeydown = (evt) => {
    evt.stopPropagation();

    if (isEscapeKey(evt)) {
      element.remove();
      removeSuccessPopupHandlers();
    }
  };

  document.addEventListener('keydown', onSuccessPopupEscKeydown);


  const onOutsideSuccessPopupClick = (evt) => {
    evt.stopPropagation();

    const popupContentElement = element.querySelector('.success__inner');
    if (evt.target !== popupContentElement && !popupContentElement.contains(evt.target)) {
      element.remove();
      removeSuccessPopupHandlers();
    }
  };

  document.addEventListener('click', onOutsideSuccessPopupClick);

  function removeSuccessPopupHandlers() {
    element.querySelector('.success__button').removeEventListener('click', onSuccessPopupButtonClick);
    document.removeEventListener('keydown', onSuccessPopupEscKeydown);
    document.removeEventListener('click', onOutsideSuccessPopupClick);
  }

};


const showErrorPopup = () => {
  const fragment = document.createDocumentFragment();
  const element = errorPopupTemplate.cloneNode(true);
  fragment.appendChild(element);
  bodyElement.appendChild(fragment);
  document.removeEventListener('keydown', onPopupEscKeydown);

  const onErrorPopupButtonClick = (evt) => {
    evt.stopPropagation();

    element.remove();
    manageErrorPopupHandlers();
  };

  element.querySelector('.error__button').addEventListener('click', onErrorPopupButtonClick);


  const onErrorPopupEscKeydown = (evt) => {
    evt.stopPropagation();

    if (isEscapeKey(evt)) {
      element.remove();
      manageErrorPopupHandlers();
    }
  };

  document.addEventListener('keydown', onErrorPopupEscKeydown);


  const onOutsideErrorPopupClick = (evt) => {
    evt.stopPropagation();

    const popupContentElement = element.querySelector('.error__inner');
    if (evt.target !== popupContentElement && !popupContentElement.contains(evt.target)) {
      element.remove();
      manageErrorPopupHandlers();
    }
  };

  document.addEventListener('click', onOutsideErrorPopupClick);

  function manageErrorPopupHandlers() {
    element.querySelector('.error__button').removeEventListener('click', onErrorPopupButtonClick);
    document.removeEventListener('keydown', onErrorPopupEscKeydown);
    document.removeEventListener('click', onOutsideErrorPopupClick);
    document.addEventListener('keydown', onPopupEscKeydown);
  }

};


const blockButton = () => {
  imgUploadSubmitElement.setAttribute('disabled', 'disabled');
  imgUploadSubmitElement.textContent = 'Публикую...';
};

const unblockButton = () => {
  imgUploadSubmitElement.removeAttribute('disabled');
  imgUploadSubmitElement.textContent = 'Опубликовать';
};


const addUploadFormEventListeners = () => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockButton();

      sendData(
        () => {
          unblockButton();
          closeAndClearImgUploadPopup();
          showSuccessPopup();
        },
        () => {
          unblockButton();
          showErrorPopup();
        },
        new FormData(evt.target)
      );
    }

  });
};


export {addUploadFormValidators, addUploadFormEventListeners};
