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


const prepareHashtags = (value) => {
  const clearedValue = value.trim().replace(/ +/g, ' ');
  return (clearedValue.length) ? clearedValue.split(HASHTAG_DELIMITER) : [];
};


const validateHashtagsQty = (value) => prepareHashtags(value).length <= MAX_HASHTAG_QTY;

const validateHashtagsUniqueness = (value) => {
  const hashtags = prepareHashtags(value);
  let isUnique = true;

  const uniqueHashtags = [];
  hashtags.forEach((hashtag) => {
    const preparedHashtag = hashtag.toLowerCase();
    if (uniqueHashtags.includes(preparedHashtag)) {
      isUnique = false;
    } else {
      uniqueHashtags.push(preparedHashtag);
    }
  });

  return isUnique;
};

const validateHashtagsByRegExp = (value) => {
  const hashtags = prepareHashtags(value);
  let isCorrect = true;

  hashtags.forEach((hashtag) => {
    if (!HASHTAG_REG_EXP.test(hashtag)) {
      isCorrect = false;
    }
  });
  return isCorrect;
};

pristine.addValidator(hashtagsFieldElement, validateHashtagsQty, `Максимально допустимое количество хештегов - ${MAX_HASHTAG_QTY}`);
pristine.addValidator(hashtagsFieldElement, validateHashtagsUniqueness, 'Все хештеги должны быть уникальными');
pristine.addValidator(hashtagsFieldElement, validateHashtagsByRegExp, `Каждый хештег должен начинаться с #, состоять из букв и цифр, максимальное количество символов - ${MAX_HASHTAG_LENGTH}`);


const validateDescription = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(descriptionFieldElement, validateDescription, `Максимально допустимое количество символов - ${MAX_COMMENT_LENGTH}`);


uploadFormElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
