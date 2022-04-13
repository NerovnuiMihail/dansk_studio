'use strict';

const messagePlace = document.querySelector('.schedule__message');
const inputsPlace = document.querySelector('.date-form__inputs');
const homeSubmitBtn = document.querySelector('.schedule__submit-btn');
const homeFormSchedule = document.forms.homeScheduleForm;
const URL = 'http://localhost:3000/schedule';

function setSchedule() {
    const name = homeFormSchedule.elements.name.value;
    const email = homeFormSchedule.elements.email.value;
    const phone = homeFormSchedule.elements.phone.value;
    const skype = homeFormSchedule.elements.skype.value ? homeFormSchedule.skype.value : 'not skype';

    return {
        name,
        email,
        phone,
        skype
    }
}

homeSubmitBtn.addEventListener('click', () => {
    scheduleFetch();
    homeFormSchedule.reset();
});

async function scheduleFetch() {
    const data = setSchedule();
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(!response.ok) {
        inputsPlace.style.display = 'none';
        messagePlace.style.display = 'flex';
        messagePlace.textContent = 'Что-то пошло не так... Заявка не отправлена.'
        setTimeout(() => {
            inputsPlace.style.display = 'flex';
            messagePlace.style.display = 'none';
        }, 3000);
    } else {
        inputsPlace.style.display = 'none';
        messagePlace.style.display = 'flex';
        messagePlace.textContent = 'Заявка отправлена. Мы скоро с вами свяжемся!'
        setTimeout(() => {
            inputsPlace.style.display = 'flex';
            messagePlace.style.display = 'none';
        }, 3000);
    }
}