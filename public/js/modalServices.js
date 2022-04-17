'use strict';

const tabItems = document.querySelectorAll('.tab__item');
const tabContentItems = document.querySelectorAll('.tab-content__item');
const openServicesBtn = document.querySelector('.utils-btn-course');
const servicesContainer = document.querySelector('.services-utils');
const servicesForm = document.forms.services_utils;
const selectCourseName = servicesForm.elements.coursename;
const selectCourseTime = servicesForm.elements.time;
const tabNames = ['authors course','individual lesson','group lesson'];
let tabIdx = 0;

function clearTab() {
    tabItems.forEach(item => item.classList.remove('tab-active'));
}

function choiceTab(idx) {
    tabItems[idx].classList.add('tab-active');
}

function hideTabItems() {
    tabContentItems.forEach(item => item.style.display = 'none');
}

function showTabItem(idx) {
    tabContentItems[idx].style.display = '';
}

async function fetchSelectData(idx) {
    const URL = 'http://localhost:3000/api';
    const db = await fetch(URL);
    const dataApi = await db.json();
    return dataApi[idx];
}

async function renderSelector(idx) {
    const dataApi = await fetchSelectData(idx);
    const data = dataApi[tabNames[idx]];
    selectCourseName.innerHTML = '';

    data.forEach(item => {
        const option = document.createElement('option');
        option.textContent = item.title;
        option.value = item.title;
        selectCourseName.append(option);
    });
}

async function renderOptions(idx) {
    const fildset = document.querySelector('.services-utils__fildset');
    const removeTime = document.querySelector('.remTime');

    const dataApi = await fetchSelectData(idx);
    const data = dataApi[tabNames[idx]];
    const currentCourse = data.filter(item => item.title === selectCourseName.value)[0];
    selectCourseTime.innerHTML = '';

    if (idx === 0) {
        removeTime.style.display = 'none';
        selectCourseTime.style.display = 'none';
        servicesForm.style.height = '701px'; 
        fildset.style.marginTop = '70px';
    } else {
        removeTime.style.display = 'block';
        selectCourseTime.style.display = 'block';
        servicesForm.style.height = '748px'; 
        fildset.style.marginTop = '';

        currentCourse.time.forEach(item => {
            const option = document.createElement('option');
            option.textContent = item;
            option.value = item;
            selectCourseTime.append(option);
        });
    }
}

async function renderDescription(idx, selectValue) {
    const dataApi = await fetchSelectData(idx);
    const data = dataApi[tabNames[idx]];
    const currentCourse = data.filter(item => item.title === selectCourseName.value)[0];
    const costInd = currentCourse.time.findIndex(timeIdx => timeIdx === selectValue) !== -1 ? currentCourse.time.findIndex(timeIdx => timeIdx === selectValue) : 0;

    const descriptionContainer = document.querySelector('.services-utils__descriptionContainer');
    const time = document.createElement('p');
    const cost = document.createElement('p');

    descriptionContainer.textContent = '';
    descriptionContainer.style.width = '823px';

    if (idx === 0) {
        time.textContent = `Продолжительность: ${currentCourse.time[0]}`;
        cost.textContent = `Стоимость: ${currentCourse.cost[0]} крон.`;
        descriptionContainer.append(time);
        descriptionContainer.append(cost);
    } else {
        time.textContent = `Продолжительность: индивидуальное количество, уроки 60-70мин`;
        cost.textContent = `Стоимость: ${currentCourse.cost[costInd]} крон за занятие.`;
        descriptionContainer.append(time);
        descriptionContainer.append(cost);
    }
}

tabItems.forEach((item,idx) => {
    item.addEventListener('click', () => {
        tabIdx = idx;
        clearTab();
        hideTabItems();
        choiceTab(tabIdx);
        showTabItem(tabIdx);
        renderSelector(tabIdx);
        renderOptions(tabIdx);
        renderDescription(tabIdx);
    });
});

openServicesBtn.addEventListener('click', () => {
    servicesContainer.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

servicesContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('services-utils__close') || e.target.classList.contains('services-utils')) {
        servicesContainer.style.display = 'none';
        document.body.style.overflow = '';
    }
});

selectCourseTime.addEventListener('change', (e) => {
    renderDescription(tabIdx, e.target.value);
});

selectCourseName.addEventListener('change', (e) => {
    renderOptions(tabIdx);
    renderDescription(tabIdx, e.target.value);
});

clearTab();
hideTabItems();
choiceTab(tabIdx);
showTabItem(tabIdx);
renderSelector(tabIdx);
renderOptions(tabIdx);
renderDescription(tabIdx);
