import {getRandomPositiveInteger, getRandomArrayElement, getRandomUniqueId} from './util.js';
import {MAX_COMMENTS_COUNT, MAX_RANGE_RANDOM_ID_COMMENT, MIN_LIKES_COUNT, MAX_LIKES_COUNT, MIN_AVATARS_COUNT, MAX_AVATARS_COUNT, MESSAGES, NAMES} from './const.js';

// создаёт комментарий
const createComment = () => ({
  id: getRandomUniqueId(MAX_RANGE_RANDOM_ID_COMMENT),
  avatar: `img/avatar-${getRandomPositiveInteger(MIN_AVATARS_COUNT, MAX_AVATARS_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// создаёт массив комментариев
const createPhotoComments = () => {
  const comments = [];
  const quantity = getRandomPositiveInteger(1, MAX_COMMENTS_COUNT);
  for (let i = 1; i <= quantity; i++) {
    comments.push(createComment(i));
  }
  return comments;
};

// создаёт объект описания фотографии
const createPhotoDescription = (photoId) => ({
  id: photoId,
  url: `photos/${photoId}.jpg`,
  description: `Описание фотографии номер ${photoId}`,
  likes: getRandomPositiveInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: createPhotoComments(),
});

// создаёт массив описания фотографий
const createArrayDescriptions = (quantity) => {
  const photoDescriptions = [];
  for (let i = 1; i <= quantity; i++) {
    photoDescriptions.push(createPhotoDescription(i));
  }
  return photoDescriptions;
};

export {createArrayDescriptions};
