const excludeNumbers = [];

// проверяет длину строки
const checkStringLength = (value, maxLength) => value.length <= maxLength;

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

export {checkStringLength, getRandomPositiveInteger, getRandomArrayElement, getRandomUniqueId};
