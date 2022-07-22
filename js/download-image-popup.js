import {isEscapeKey, openPopup, closePopup, stopPropogationOnEscapeKeydown} from './util.js';
import {DEFAULT_SCALE_VALUE, DOWNLOAD_FILE_TYPES}  from './const.js';
import {changeScaleValue} from './scale-control.js';
import {pristine} from './form-validation.js';


const picturesElement = document.querySelector('.pictures');
const imgUploadFormElement = picturesElement.querySelector('.img-upload__form');
const imgUploadInputElement = picturesElement.querySelector('.img-upload__input');
const imgUploadOverlayElement = picturesElement.querySelector('.img-upload__overlay');
const imgUploadCancelElement = picturesElement.querySelector('.img-upload__cancel');
const hashtagsElement = picturesElement.querySelector('.text__hashtags');
const descriptionElement = picturesElement.querySelector('.text__description');
const imgUploadPreviewElement = document.querySelector('#img-upload__preview-image');
const imgUploadEffectLevelElement = document.querySelector('.img-upload__effect-level');
const effectsRadioNoneElement = imgUploadFormElement.querySelector('.effects__radio--none');
const effectLevelValueElement = imgUploadEffectLevelElement.querySelector('.effect-level__value');
const effectsPreviewElements = imgUploadOverlayElement.querySelectorAll('.effects__preview');

const clearImgUploadForm = () => {
  imgUploadInputElement.value = '';
  changeScaleValue(DEFAULT_SCALE_VALUE);
  hashtagsElement.value = '';
  descriptionElement.value = '';
  imgUploadPreviewElement.className = '';
  imgUploadPreviewElement.style.filter = '';
  effectsRadioNoneElement.checked = true;
  imgUploadEffectLevelElement.classList.add('hidden');
  effectLevelValueElement.value = '';
  pristine.reset();
};


const openImgUploadPopup = () => {
  const downloadFile = imgUploadInputElement.files[0];
  const downloadFileName = downloadFile.name.toLowerCase();

  if (DOWNLOAD_FILE_TYPES.some((fileType) => downloadFileName.endsWith(fileType))) {
    imgUploadPreviewElement.src = URL.createObjectURL(downloadFile);
    effectsPreviewElements.forEach((effect) => {
      effect.style.backgroundImage = `url(${imgUploadPreviewElement.src})`;
    });
  }

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


const closeAndClearImgUploadPopup = () => {
  closeImgUploadPopup();
  document.removeEventListener('keydown', onPopupEscKeydown);
};


const addDownloadImagePopupEventListeners = () => {
  hashtagsElement.addEventListener('keydown', (evt) => {
    stopPropogationOnEscapeKeydown(evt);
  });

  descriptionElement.addEventListener('keydown', (evt) => {
    stopPropogationOnEscapeKeydown(evt);
  });

  imgUploadCancelElement.addEventListener('click', () => {
    closeAndClearImgUploadPopup();
  });

  imgUploadInputElement.addEventListener('change', () => {
    document.addEventListener('keydown', onPopupEscKeydown);
    openImgUploadPopup();
  });
};


export {addDownloadImagePopupEventListeners, imgUploadEffectLevelElement, imgUploadPreviewElement, effectsRadioNoneElement, effectLevelValueElement, closeAndClearImgUploadPopup, onPopupEscKeydown};
