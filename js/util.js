const bodyElement = document.querySelector('body');


const checkStringLength = (value, maxLength) => value.length <= maxLength;


const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];


const createRandomIdFromRangeGenerator = (minNumber, maxNumber) => {
  const excludeNumbers = [];
  return () => {
    let uniqueId = getRandomPositiveInteger(minNumber, maxNumber);
    if (excludeNumbers.length >= (maxNumber - minNumber + 1)) {
      return null;
    }
    while (excludeNumbers.includes(uniqueId)) {
      uniqueId = getRandomPositiveInteger(minNumber, maxNumber);
    }
    excludeNumbers.push(uniqueId);
    return uniqueId;
  };
};


const isEscapeKey = (evt) => evt.key === 'Escape';


const openPopup = (element) => {
  element.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};


const closePopup = (element) => {
  element.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};


const stopPropogationOnEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};


export {checkStringLength, getRandomPositiveInteger, getRandomArrayElement, createRandomIdFromRangeGenerator, isEscapeKey, openPopup, closePopup, stopPropogationOnEscapeKeydown};
