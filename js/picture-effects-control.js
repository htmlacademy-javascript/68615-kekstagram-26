import {PICTURE_EFFECTS} from './const.js';
import {imgUploadEffectLevelElement, imgUploadPreviewElement, effectsRadioNoneElement, effectLevelValueElement} from './download-image-popup.js';


const effectsItemElement = document.querySelectorAll('.effects__item:not(.effects__item--none)');
const effectLevelSliderElement = imgUploadEffectLevelElement.querySelector('.effect-level__slider');
const effectItemNoneElement = document.querySelector('.effects__item--none');


const addSlider = () => {
  noUiSlider.create(effectLevelSliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  effectLevelSliderElement.noUiSlider.on('update', () => {
    const effectLevel = effectLevelSliderElement.noUiSlider.get();

    const effectName = document.querySelector('.effects__radio:checked').value;
    if (effectName !== 'none') {
      effectLevelValueElement.value = `${effectLevel}${PICTURE_EFFECTS[effectName].measure}`;
      imgUploadPreviewElement.style.filter = `${PICTURE_EFFECTS[effectName].filter}(${effectLevel}${PICTURE_EFFECTS[effectName].measure})`;
    }
  });
};


const addPictureEffectsEventListeners = () => {

  effectsItemElement.forEach((effectItem) => {
    effectItem.addEventListener('click', (evt) => {
      evt.preventDefault();

      const radioInputElement = effectItem.querySelector('.effects__radio');
      const effectName = radioInputElement.value;

      radioInputElement.checked = true;

      imgUploadPreviewElement.className = `effects__preview--${effectName}`;
      imgUploadEffectLevelElement.classList.remove('hidden');

      effectLevelValueElement.value = `${PICTURE_EFFECTS[effectName].max}${PICTURE_EFFECTS[effectName].measure}`;

      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: PICTURE_EFFECTS[effectName].min,
          max: PICTURE_EFFECTS[effectName].max
        },
        start: PICTURE_EFFECTS[effectName].max,
        step: PICTURE_EFFECTS[effectName].step
      });

    });
  });

  effectItemNoneElement.addEventListener('click', (evt) => {
    evt.preventDefault();

    imgUploadEffectLevelElement.classList.add('hidden');
    effectsRadioNoneElement.checked = true;
    imgUploadPreviewElement.style.filter = '';
    imgUploadPreviewElement.className = '';
    effectLevelValueElement.value = '';
  });

};

export {addPictureEffectsEventListeners, addSlider};
