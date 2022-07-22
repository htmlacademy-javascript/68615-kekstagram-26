import {addThumbnailClickHandler} from './big-picture-rendering.js';


const renderThumbnails = (data) => {
  const picturesElement = document.querySelector('.pictures');
  const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  let addedPicture = picturesElement.querySelector('.picture');
  while (addedPicture) {
    addedPicture.remove();
    addedPicture = picturesElement.querySelector('.picture');
  }

  data.forEach((element) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = element.url;
    pictureElement.querySelector('.picture__likes').textContent = element.likes;
    pictureElement.querySelector('.picture__comments').textContent = element.comments.length;

    addThumbnailClickHandler(pictureElement, element);

    fragment.appendChild(pictureElement);
  });

  picturesElement.appendChild(fragment);
};


export {renderThumbnails};
