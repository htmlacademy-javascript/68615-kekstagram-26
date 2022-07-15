import {PHOTOS_COUNT} from './const.js';
import {createArrayDescriptions} from './data.js';
import {renderThumbnails} from './thumbnails-rendering.js';
import {addBigPicturePopupEventListeners} from './big-picture-rendering.js';
import {addDownloadImagePopupEventListeners} from './download-image-popup.js';
import {addUploadFormValidators, addUploadFormEventListeners} from './form-validation.js';
import {addScaleControlEventListeners} from './scale-control.js';
import {addPictureEffectsEventListeners, addSlider} from './picture-effects-control.js';

const photosData = createArrayDescriptions(PHOTOS_COUNT);
renderThumbnails(photosData);

addBigPicturePopupEventListeners();
addDownloadImagePopupEventListeners();
addUploadFormEventListeners();
addScaleControlEventListeners();
addPictureEffectsEventListeners();

addUploadFormValidators();

addSlider();
