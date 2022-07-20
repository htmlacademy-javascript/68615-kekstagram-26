export const MAX_HASHTAG_QTY = 5;
export const MAX_HASHTAG_LENGTH = 20;
export const MAX_COMMENT_LENGTH = 140;
export const HASHTAG_REG_EXP = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
export const HASHTAG_DELIMITER = ' ';
export const COMMENTS_QTY_IN_PORTION = 5;
export const SCALE_STEP = 25;
export const MIN_SCALE_VALUE = 25;
export const MAX_SCALE_VALUE = 100;
export const DEFAULT_SCALE_VALUE = 100;
export const API_URL = 'https://26.javascript.pages.academy/kekstagram';
export const ALERT_SHOW_TIME = 5000;
export const PICTURE_EFFECTS = {
  'chrome': {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'grayscale',
    measure: ''
  },
  'sepia': {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'sepia',
    measure: ''
  },
  'marvin': {
    min: 0,
    max: 100,
    step: 1,
    filter: 'invert',
    measure: '%'
  },
  'phobos': {
    min: 0,
    max: 3,
    step: 0.1,
    filter: 'blur',
    measure: 'px'
  },
  'heat': {
    min: 1,
    max: 3,
    step: 0.1,
    filter: 'brightness',
    measure: ''
  }
};
