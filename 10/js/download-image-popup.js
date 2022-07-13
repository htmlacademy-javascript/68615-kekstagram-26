import {isEscapeKey, openPopup, closePopup, stopPropogationOnEscapeKeydown} from './util.js';


const picturesElement = document.querySelector('.pictures');
const imgUploadFormElement = picturesElement.querySelector('.img-upload__form');
const imgUploadInputElement = picturesElement.querySelector('.img-upload__input');
const imgUploadOverlayElement = picturesElement.querySelector('.img-upload__overlay');
const imgUploadCancelElement = picturesElement.querySelector('.img-upload__cancel');
const scaleControlElement = picturesElement.querySelector('.scale__control--value');
const hashtagsElement = picturesElement.querySelector('.text__hashtags');
const descriptionElement = picturesElement.querySelector('.text__description');


hashtagsElement.addEventListener('keydown', (evt) => {
  stopPropogationOnEscapeKeydown(evt);
});

descriptionElement.addEventListener('keydown', (evt) => {
  stopPropogationOnEscapeKeydown(evt);
});


const clearImgUploadForm = () => {
  imgUploadInputElement.value = '';
  scaleControlElement.value = '100%';
  hashtagsElement.value = '';
  descriptionElement.value = '';
  imgUploadFormElement.querySelector('input[name=\'effect\'][value=\'none\']').checked = true;
};


const openImgUploadPopup = () => {
  openPopup(imgUploadOverlayElement);
};

const closeImgUploadPopup = () => {
  closePopup(imgUploadOverlayElement);
  clearImgUploadForm();
};


const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgUploadPopup();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};


imgUploadCancelElement.addEventListener('click', () => {
  closeImgUploadPopup();
  document.removeEventListener('keydown', onPopupEscKeydown);
});

imgUploadInputElement.addEventListener('change', () => {
  document.addEventListener('keydown', onPopupEscKeydown);
  openImgUploadPopup();
});
