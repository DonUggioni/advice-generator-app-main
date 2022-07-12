'use strict';

const adviceId = document.querySelector('.advice__id');
const adviceText = document.querySelector('.advice__text');
const diceIcon = document.querySelector('.dice');
const diceContainer = document.querySelector('.dice__container');

const diceAnimation = function () {
  diceIcon.classList.add('dice--animate');
  setTimeout(function () {
    diceIcon.classList.remove('dice--animate');
  }, 1000);
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(errorMsg);

    return res.json();
  });
};

const getAdvice = function () {
  getJSON('https://api.adviceslip.com/advice')
    .then((data) => {
      adviceText.textContent = `"${data.slip.advice}"`;
      adviceId.textContent = data.slip.id;
    })
    .catch((err) => {
      adviceText.textContent = `Oops! Something went wrong! Please try again.`;
      adviceId.textContent = '000';
      console.error(err.message);
    });
};

const app = function () {
  window.addEventListener('load', function () {
    getAdvice();
    diceContainer.addEventListener('click', function () {
      diceAnimation();
      setTimeout(function () {
        getAdvice();
      }, 1000);
    });
  });
};

app();
