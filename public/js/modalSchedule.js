const scheduleOpenBtn = document.querySelector('.scheduleOpenBtn');
const scheduleContainer = document.querySelector('.schedule');
const messagePlace = document.querySelector('.schedule__messagePlace');
const inputsPlace = document.querySelector('.schedule__inputsPlace');
const utilsSubmitBtn = document.querySelector('.schedule__btn');
const utilsFormSchedule = document.forms.schedule_form;

scheduleOpenBtn.addEventListener('click', () => {
    scheduleContainer.style.display = 'block';
});

scheduleContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('schedule__close') || e.target.classList.contains('schedule')) {
        scheduleContainer.style.display = 'none';
    }
});

utilsFormSchedule.addEventListener('submit', (e) => {
    e.preventDefault();
    scheduleFetch();
    utilsFormSchedule.reset();
});

function setSchedule() {
    const name = utilsFormSchedule.elements.name.value;
    const email = utilsFormSchedule.elements.email.value;
    const phone = utilsFormSchedule.elements.phone.value;
    const skype = utilsFormSchedule.elements.skype.value ? homeFormSchedule.skype.value : 'not skype';

    return {
        name,
        email,
        phone,
        skype
    }
}

async function scheduleFetch() {
    const URL = 'http://localhost:3000/schedule';
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
            scheduleContainer.style.display = 'none';
        }, 3000);
    }
}