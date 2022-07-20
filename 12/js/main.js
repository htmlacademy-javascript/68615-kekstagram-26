import {getData} from './api.js';
import {renderThumbnails} from './thumbnails-rendering.js';
import {addBigPicturePopupEventListeners} from './big-picture-rendering.js';
import {addDownloadImagePopupEventListeners} from './download-image-popup.js';
import {addUploadFormValidators, addUploadFormEventListeners} from './form-validation.js';
import {addScaleControlEventListeners} from './scale-control.js';
import {addPictureEffectsEventListeners, addSlider} from './picture-effects-control.js';
import {showAlert} from './util.js';

getData((photosData) => {
  renderThumbnails(photosData);
}, showAlert);

addBigPicturePopupEventListeners();
addDownloadImagePopupEventListeners();
addUploadFormEventListeners();
addScaleControlEventListeners();
addPictureEffectsEventListeners();

addUploadFormValidators();

addSlider();
