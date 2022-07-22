import {isEscapeKey, openPopup, closePopup} from './util.js';
import {COMMENTS_QTY_IN_PORTION} from './const.js';


const modalWindowElement = document.querySelector('.big-picture');
const listElement = modalWindowElement.querySelector('.social__comments');
const buttonCloseElement = modalWindowElement.querySelector('#picture-cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsCountElement = modalWindowElement.querySelector('.loaded-comments-count');
const commentsLoaderElement = modalWindowElement.querySelector('.comments-loader');


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

const addBigPicturePopupEventListeners = () => {
  buttonCloseElement.addEventListener('click', () => {
    closeModalWindow();
    document.removeEventListener('keydown', onModalEscKeydown);
  });
};


const renderCommentsList = (comments) => {
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


const paginateCommentsListGenerator = (comments) => {
  let pageNumber = 0;
  const pagesQty = Math.ceil(comments.length / COMMENTS_QTY_IN_PORTION);

  return () => {
    const start = pageNumber * COMMENTS_QTY_IN_PORTION;
    const end = (pageNumber + 1) * COMMENTS_QTY_IN_PORTION;
    renderCommentsList(comments.slice(start, end));
    pageNumber++;

    commentsCountElement.textContent = (pageNumber === pagesQty) ? comments.length : end;

    if (pageNumber === pagesQty) {
      commentsLoaderElement.classList.add('hidden');
    }
  };
};

const addThumbnailClickHandler = (thumbnail, data) => {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();

    openPopup(modalWindowElement);

    listElement.textContent = '';
    commentsLoaderElement.classList.remove('hidden');
    modalWindowElement.querySelector('.big-picture__original').src = data.url;
    modalWindowElement.querySelector('.likes-count').textContent = data.likes;
    modalWindowElement.querySelector('.comments-count').textContent = data.comments.length;
    modalWindowElement.querySelector('.social__caption').textContent = data.description;

    const paginateCommentsList = paginateCommentsListGenerator(data.comments);
    paginateCommentsList();

    commentsLoaderElement.addEventListener('click', (loaderEvt) => {
      loaderEvt.preventDefault();
      paginateCommentsList();
    });

    document.addEventListener('keydown', onModalEscKeydown);
  });
};

export {addThumbnailClickHandler, addBigPicturePopupEventListeners};
