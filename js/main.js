function getRandomInteger(min, max) {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
// Источник https://learn.javascript.ru/task/random-int-min-max


function checkStringLength(value, maxLength) {
  return value.length <= maxLength;
}
