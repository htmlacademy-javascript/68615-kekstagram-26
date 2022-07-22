import {RANDOM_PHOTOS_QTY, RERENDER_DELAY} from './const.js';
import {renderThumbnails} from './thumbnails-rendering.js';
import {getRandomUniqueIntegerArray} from './util.js';


const imgFiltersElement = document.querySelector('.img-filters');
const filterDefaultElement = imgFiltersElement.querySelector('#filter-default');
const filterRandomElement = imgFiltersElement.querySelector('#filter-random');
const filterDiscussedElement = imgFiltersElement.querySelector('#filter-discussed');


const changeFilterStyle = (activeFilterName) => {
  if (!imgFiltersElement.querySelector(`#filter-${activeFilterName}`).classList.contains('img-filters__button--active')) {
    imgFiltersElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    imgFiltersElement.querySelector(`#filter-${activeFilterName}`).classList.add('img-filters__button--active');
  }
};


const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


const addFilter = (photosData) => {
  imgFiltersElement.classList.remove('img-filters--inactive');

  filterDefaultElement.addEventListener('click', debounce(() => {
    changeFilterStyle('default');
    renderThumbnails(photosData);
  }, RERENDER_DELAY));

  filterRandomElement.addEventListener('click', debounce(() => {
    changeFilterStyle('random');
    const randomElementsPositions = getRandomUniqueIntegerArray(0, photosData.length - 1, RANDOM_PHOTOS_QTY);
    const randomElements = [];
    randomElementsPositions.forEach((position) => {
      randomElements.push(photosData[position]);
    });
    renderThumbnails(randomElements);
  }, RERENDER_DELAY));

  filterDiscussedElement.addEventListener('click', debounce(() => {
    changeFilterStyle('discussed');
    const sortedPhotos = photosData.slice().sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);
    renderThumbnails(sortedPhotos);
  }, RERENDER_DELAY));
};


export {addFilter};
