import {addThumbnailClickHandler} from './big-picture-rendering.js';

const renderThumbnails = (data) => {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  // создание одной миниатюры
  data.forEach((element) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = element.url;
    pictureElement.querySelector('.picture__likes').textContent = element.likes;
    pictureElement.querySelector('.picture__comments').textContent = element.comments.length;

    addThumbnailClickHandler(pictureElement, element);

    fragment.appendChild(pictureElement);
  });

  document.querySelector('.pictures').appendChild(fragment);
};

export {renderThumbnails};
