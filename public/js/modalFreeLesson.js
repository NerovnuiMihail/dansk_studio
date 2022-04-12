'use strict';

const homeOpenBtn = document.querySelector('.test-online__btn');
const aboutmeOpenBtn = document.querySelector('.aboutme-btns__right');
const modalContainer = document.querySelector('.overflowblackFree');
const freelesson = document.querySelector('.freelesson');
const closeBtn = document.querySelector('.questionnaire__img');
const formContainer = document.querySelector('.freelesson__form');

homeOpenBtn.addEventListener('click', () => {
    modalContainer.style.display = '';
});
aboutmeOpenBtn.addEventListener('click', () => {
    modalContainer.style.display = '';
});

