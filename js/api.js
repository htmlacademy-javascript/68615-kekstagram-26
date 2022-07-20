import {API_URL} from './const.js';


const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(
      `${API_URL}/data`
    );

    if (!response.ok) {
      throw new Error('Не удалось загрузить фотографии');
    }

    const photosData = await response.json();
    onSuccess(photosData);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      API_URL,
      {
        method: 'POST',
        body,
      }
    );

    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте еще раз');
    }

    onSuccess();

  } catch (error) {
    onFail(error.message);
  }
};

export {getData, sendData};
