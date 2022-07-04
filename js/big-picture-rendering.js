const bodyElement = document.querySelector('body');
const modalWindowElement = document.querySelector('.big-picture');
const listElement = modalWindowElement.querySelector('.social__comments');
const buttonCloseElement = modalWindowElement.querySelector('#picture-cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

// закрытие модального окна
/*const closeModalWindow = () => {
  modalWindowElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', clickHandlerByEsc);
};*/

const clickHandlerByEsc = (e) => {
  if (e.key === 'Escape') {
    //closeModalWindow();

    modalWindowElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', clickHandlerByEsc);
  }
};

buttonCloseElement.addEventListener('click', () => {
  //closeModalWindow();

  modalWindowElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', clickHandlerByEsc);
});


// создание списка комментариев
const createListComments = (comments) => {
  while (listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }

  const itemCommentList = document.createDocumentFragment();

  // создание списка новых комментариев
  comments.forEach(({avatar, name, message}) => {
    const element = commentTemplate.cloneNode(true);
    element.querySelector('.social__picture').src = avatar;
    element.querySelector('.social__picture').alt = name;
    element.querySelector('.social__text').textContent = message;
    itemCommentList.appendChild(element);
  });

  listElement.appendChild(itemCommentList);
};

const addThumbnailClickHandler = (thumbnail, element) => {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();

    modalWindowElement.classList.remove('hidden');
    modalWindowElement.querySelector('.social__comment-count').classList.add('hidden');
    modalWindowElement.querySelector('.comments-loader').classList.add('hidden');
    bodyElement.classList.add('modal-open');

    modalWindowElement.querySelector('.big-picture__img').children[0].src = element.url;
    modalWindowElement.querySelector('.likes-count').textContent = element.likes;
    modalWindowElement.querySelector('.comments-count').textContent = element.comments.length;
    createListComments(element.comments);
    modalWindowElement.querySelector('.social__caption').textContent = element.description;

    document.addEventListener('keydown', clickHandlerByEsc);
  });
};

export {addThumbnailClickHandler};
