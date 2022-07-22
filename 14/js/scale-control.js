import {SCALE_STEP, MIN_SCALE_VALUE, MAX_SCALE_VALUE} from './const.js';
import {imgUploadPreviewElement} from './download-image-popup.js';


const imgUploadScaleElement = document.querySelector('.img-upload__scale');
const scaleControlValueElement = imgUploadScaleElement.querySelector('.scale__control--value');
const scaleControlSmallerElement = imgUploadScaleElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = imgUploadScaleElement.querySelector('.scale__control--bigger');


const changeScaleValue = (value) => {
  scaleControlValueElement.value = `${value}%`;
  imgUploadPreviewElement.style.transform = `scale(${value/100}, ${value/100})`;
};

const addScaleControlEventListeners = () => {
  scaleControlSmallerElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    const currentScale = parseInt(scaleControlValueElement.value, 10);
    if (currentScale > MIN_SCALE_VALUE) {
      changeScaleValue(currentScale - SCALE_STEP);
    }
  });

  scaleControlBiggerElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    const currentScale = parseInt(scaleControlValueElement.value, 10);
    if (currentScale < MAX_SCALE_VALUE) {
      changeScaleValue(currentScale + SCALE_STEP);
    }
  });
};

export {addScaleControlEventListeners, changeScaleValue};
