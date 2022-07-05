import {PHOTOS_COUNT} from './const.js';
import {createArrayDescriptions} from './data.js';
import {renderThumbnails} from './thumbnails-rendering.js';

const photosData = createArrayDescriptions(PHOTOS_COUNT);
renderThumbnails(photosData);
