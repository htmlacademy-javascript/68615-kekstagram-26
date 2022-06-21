// количество описаний
const QUANTITY_DESCRIPTIONS = 25;

// максимальное количество комментариев
const MAX_QUANTITY_COMMENTS = 3;

// максимальное значение диапазона для выбора случайного уникального числа
const MAX_RANGE_RANDOM_ID_COMMENT = 1000;

// служебный массив для сохранения использованных чисел при получении уникальных случайных чисел из диапазона
const excludeNumbers = [];

// массив сообщений для комментариев
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// массив имён
const NAMES = [
  'Пётр',
  'Алексей',
  'Иван',
  'Степан',
  'Виктор',
  'Александр',
  'Константин',
  'Всеволод',
];

// проверяет длину комментария
const checkStringLength = (value, maxLength) => value.length <= maxLength;
checkStringLength('Кекс', 100);

// получает случайное целое положительное число из диапазона
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// получает случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// получает случайное уникальное число
const getRandomUniqueId = (maxNumber) => {
  let uniqueId = getRandomPositiveInteger(1, maxNumber);
  while (excludeNumbers.includes(uniqueId)) {
    uniqueId = getRandomPositiveInteger(1, maxNumber);
  }
  excludeNumbers.push(uniqueId);
  return uniqueId;
};

// создаёт комментарий
const createComment = () => ({
  id: getRandomUniqueId(MAX_RANGE_RANDOM_ID_COMMENT),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// создаёт массив комментариев
const createPhotoComments = () => {
  const comments = [];
  const quantity = getRandomPositiveInteger(1, MAX_QUANTITY_COMMENTS);
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
  likes: getRandomPositiveInteger(15, 200),
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

createArrayDescriptions(QUANTITY_DESCRIPTIONS);
