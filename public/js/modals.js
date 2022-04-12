'use strict';

const homeOpenBtn = document.querySelectorAll('.test-online__btn');
const aboutmeOpenBtn = document.querySelectorAll('.aboutme-btns__right');
const modalContainer = document.querySelector('.freelesson');
const submitBtn = document.querySelector('.freelesson__btn');
const responseMessage = document.querySelector('.freelesson__response');
const formContainer = document.forms.freelesson__form;
const URL = 'http://localhost:3000/freelesson';

homeOpenBtn.forEach(item => {
    item.addEventListener('click', () => {
        modalContainer.style.display = 'block';
    });
});

aboutmeOpenBtn.forEach(item => {
    item.addEventListener('click', () => {
        modalContainer.style.display = 'block';
    });
});

modalContainer.addEventListener('click', (e) => {
    if(e.target.localName === "img" || e.target.classList.contains('freelesson')) {
        modalContainer.style.display = 'none';
    }
});

submitBtn.addEventListener('click',() => {
    fetchData();
    formContainer.reset();
});

async function fetchData() {
    const data = createFreeApplication();
    const request = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!request.ok) {
        responseMessage.textContent = 'Что-то пошло не так...';
        submitBtn.style.display = 'none';
        responseMessage.style.display = 'flex';
        setTimeout(() => {
            responseMessage.textContent = '';
            submitBtn.style.display = 'flex';
            responseMessage.style.display = 'none';
        }, 3000);
    } else {
        responseMessage.textContent = 'Успешно отправлена!';
        submitBtn.style.display = 'none';
        responseMessage.style.display = 'flex';
        setTimeout(() => {
            responseMessage.textContent = '';
            submitBtn.style.display = 'flex';
            responseMessage.style.display = 'none';
            modalContainer.style.display = 'none';
        }, 3000);
    }
}

function createFreeApplication() {
    const nameFree = formContainer.name.value;
    const emailFree = formContainer.email.value;
    const telFree = formContainer.tel.value;

    return {
        name: nameFree,
        email: emailFree,
        tel: telFree
    }
}