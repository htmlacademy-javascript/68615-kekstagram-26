import {MAX_HASHTAG_QTY, MAX_HASHTAG_LENGTH, HASHTAG_REG_EXP, HASHTAG_DELIMITER, MAX_COMMENT_LENGTH} from './const.js';


const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsFieldElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionFieldElement = uploadFormElement.querySelector('.text__description');


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

const addUploadFormEventListeners = () => {
  uploadFormElement.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });
};


export {addUploadFormValidators, addUploadFormEventListeners};
