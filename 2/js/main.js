// Источник - функцию принес Кекс
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}


function checkStringLength (value, maxLength) {
  return value.length <= maxLength;
}

getRandomPositiveInteger (10, 15);
checkStringLength ('Кекс', 100);
