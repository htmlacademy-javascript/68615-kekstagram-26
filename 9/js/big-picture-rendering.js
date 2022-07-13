import {isEscapeKey, openPopup, closePopup} from './util.js';


const modalWindowElement = document.querySelector('.big-picture');
const listElement = modalWindowElement.querySelector('.social__comments');
const buttonCloseElement = modalWindowElement.querySelector('#picture-cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');


const closeModalWindow = () => {
  closePopup(modalWindowElement);
};


const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
    document.removeEventListener('keydown', onModalEscKeydown);
  }
};


buttonCloseElement.addEventListener('click', () => {
  closeModalWindow();
  document.removeEventListener('keydown', onModalEscKeydown);
});


const createListComments = (comments) => {
  listElement.textContent = '';

  const fragment = document.createDocumentFragment();

  comments.forEach(({avatar, name, message}) => {
    const element = commentTemplate.cloneNode(true);
    element.querySelector('.social__picture').src = avatar;
    element.querySelector('.social__picture').alt = name;
    element.querySelector('.social__text').textContent = message;
    fragment.appendChild(element);
  });

  listElement.appendChild(fragment);
};


const addThumbnailClickHandler = (thumbnail, data) => {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();

    //modalWindowElement.querySelector('.social__comment-count').classList.add('hidden');
    //modalWindowElement.querySelector('.comments-loader').classList.add('hidden');
    openPopup(modalWindowElement);

    modalWindowElement.querySelector('.big-picture__img img').src = data.url;
    modalWindowElement.querySelector('.likes-count').textContent = data.likes;
    modalWindowElement.querySelector('.comments-count').textContent = data.comments.length;
    createListComments(data.comments);
    modalWindowElement.querySelector('.social__caption').textContent = data.description;

    document.addEventListener('keydown', onModalEscKeydown);
  });
};


export {addThumbnailClickHandler};
