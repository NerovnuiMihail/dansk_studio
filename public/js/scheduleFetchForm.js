const messagePlace = document.querySelector('.schedule__message');
const inputsPlace = document.querySelector('.date-form__inputs');
const homeSubmitBtn = document.querySelector('.schedule__submit-btn');
const modalWrapper = document.querySelector('.overflowblack');
const homeFormSchedule = document.forms.homeScheduleForm;

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const openModal = entry.target
            setTimeout(() => {
                modalWrapper.style.display = 'block';
            }, 10000);
            observer.unobserve(openModal)
        }
    })
}, {threshold: 1});

observer.observe(document.querySelector('.utils'));

modalWrapper.addEventListener('click', (e) => {
    if(e.target.classList.contains('questionnaire__img') || e.target.classList.contains('overflowblack')) {
        modalWrapper.style.display = 'none';
    }
});

homeSubmitBtn.addEventListener('click', () => {
    scheduleFetch();
    homeFormSchedule.reset();
});

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
        }, 3000);
    }
}