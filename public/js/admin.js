'use strict';

const addServicesForm = document.forms[0];
const lessonsShowBtn = document.querySelector('.lessons-panel__show');
const lessonsHideBtn = document.querySelector('.lessons-panel__hide');
const lessonsContentWrapper = document.querySelector('.lessons-panel__content');

const scheduleShowBtn = document.querySelector('.schedule-panel__show');
const scheduleHideBtn = document.querySelector('.schedule-panel__hide');
const scheduleContentWrapper = document.querySelector('.schedule-panel__content');

const questionnaireShowBtn = document.querySelector('.questionnaire-panel__show');
const questionnaireHideBtn = document.querySelector('.questionnaire-panel__hide');
const questionnaireContentWrapper = document.querySelector('.questionnaire-panel__content');

function getDataServices() {
    const title = addServicesForm.elements.title.value;
    const time = addServicesForm.elements.time.value;
    const cost = addServicesForm.elements.cost.value;
    const name = addServicesForm.elements['name-course'].value;
    const coursesList = {
        'АВТОРСКИЕ КУРСЫ ПО ПРОИЗНОШЕНИЮ': 'authors course',
        'ИНДИВИДУАЛЬНЫЕ ЗАНЯТИЯ': 'individual lesson',
        'ЗАНЯТИЯ В ГРУППАХ': 'group lesson'
    };

    return {
        title,
        time,
        cost,
        name: coursesList[name]
    }
}

async function fetchServices() {
    const URL = 'http://localhost:3000/admin/services';
    const data = getDataServices();

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        console.log('Данные отправлены!')
    } else {
        throw new Error('Упс.. Что-то пошло не так!')
    }
}

async function fetchDB(url) {
    try {
        const db = await fetch(url);
        return await db.json();
    } catch (error) {
        console.error('WARNING!: ',error);
    }
}

async function renderLessons() {
    const URL = 'http://localhost:3000/api/lessons';
    const db = await fetchDB(URL);

    db.forEach((item, index) => {
        const date = item.date.split('T')[0];
        let time = Array.from(item.date.split('T')[1]);
        time = time.splice(0,8).join('');

        const div = document.createElement('div');
        div.classList.add('lessons-panel__item');
        div.innerHTML = `
            <div><span> № ${index + 1} </span></div>
            <div><span>Дата:</span> ${date} Время: ${time}</div>
            <div><span>Имя:</span> ${item.name}</div>
            <div><span>Email:</span> ${item.email}</div>
            <div><span>Телефон:</span> ${item.tel}</div>
            <input type="hidden" value="${item.id}">
        `;
        lessonsContentWrapper.append(div);
    });
}

async function renderSchedule() {
    const URL = 'http://localhost:3000/api/schedule';
    const db = await fetchDB(URL);

    db.forEach((item,index) => {
        const date = item.date.split('T')[0];
        let time = Array.from(item.date.split('T')[1]);
        time = time.splice(0,8).join('');

        const div = document.createElement('div');
        div.classList.add('schedule-panel__item');
        div.innerHTML = `
            <div><span> № ${index + 1} </span></div>
            <div><span>Дата:</span> ${date} Время: ${time}</div>
            <div><span>Имя:</span> ${item.name}</div>
            <div><span>Email:</span> ${item.email}</div>
            <div><span>Skype:</span> ${item.skype}</div>
            <input type="hidden" value="${item.id}">
        `;
        scheduleContentWrapper.append(div);
    });
}

async function renderQuestionnaire() {
    const URL = 'http://localhost:3000/api/questionnaire';
    const db = await fetchDB(URL);

    db.forEach((item, index) => {
        const date = item.date.split('T')[0];
        let time = Array.from(item.date.split('T')[1]);
        time = time.splice(0,8).join('');

        const div = document.createElement('div');
        div.classList.add('questionnaire-panel__item');
        div.innerHTML = `
            <div><span> № ${index + 1} </span></div>
            <div><span>Дата:</span> ${date} Время: ${time}</div>
            <div><span>Имя:</span> ${item.name}</div>
            <div><span>Email:</span> ${item.email}</div>
            <div><span>Телефон:</span> ${item.phone}</div>
            <input type="hidden" value="${item.id}">
            <a href="/api/questionnaire/${item.id}">Подробнее</a>
        `;
        questionnaireContentWrapper.append(div);
    });
}

function hidenDisplay(hideElem,showElem,containerElem) {
    showElem.style.display = 'block';
    hideElem.style.display = 'none';
    containerElem.style.display = 'none';
    containerElem.innerHTML = '';
}

function showDisplay(hideElem,showElem,containerElem) {
    hideElem.style.display = 'block';
    showElem.style.display = 'none';
    containerElem.style.display = 'flex';
}

addServicesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addServicesForm.reset();

    fetchServices();
});

lessonsShowBtn.addEventListener('click', () => {
    showDisplay(lessonsHideBtn,lessonsShowBtn,lessonsContentWrapper);
    renderLessons();
});

lessonsHideBtn.addEventListener('click', () => {
    hidenDisplay(lessonsHideBtn,lessonsShowBtn,lessonsContentWrapper);
});

scheduleShowBtn.addEventListener('click', () => {
    showDisplay(scheduleHideBtn,scheduleShowBtn,scheduleContentWrapper);
    renderSchedule();
});

scheduleHideBtn.addEventListener('click', () => {
    hidenDisplay(scheduleHideBtn,scheduleShowBtn,scheduleContentWrapper);
});

questionnaireShowBtn.addEventListener('click', () => {
    showDisplay(questionnaireHideBtn,questionnaireShowBtn,questionnaireContentWrapper);
    renderQuestionnaire();
});

questionnaireHideBtn.addEventListener('click', () => {
    hidenDisplay(questionnaireHideBtn,questionnaireShowBtn,questionnaireContentWrapper);
});