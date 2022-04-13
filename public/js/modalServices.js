'use strict';

const tabItems = document.querySelectorAll('.tab__item');
const tabContentItems = document.querySelectorAll('.tab-content__item');
const openServicesBtn = document.querySelector('.utils-btn-course');
const servicesContainer = document.querySelector('.services-utils');
const servicesForm = document.forms.services_utils;
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

clearTab();
hideTabItems();
choiceTab(tabIdx);
showTabItem(tabIdx);

tabItems.forEach((item,idx) => {
    item.addEventListener('click', () => {
        tabIdx = idx;
        clearTab();
        hideTabItems();

        choiceTab(tabIdx);
        showTabItem(tabIdx);
    });
});

openServicesBtn.addEventListener('click', () => {
    servicesContainer.style.display = 'block';
});

servicesContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('services-utils__close') || e.target.classList.contains('services-utils')) {
        servicesContainer.style.display = 'none';
    }
});


//////


const selectCourseName = document.querySelector('#coursename');
const selectCourseTime = document.querySelector('#time');
const tabNames = ['authors course','individual lesson','group lesson'];

async function fetchSelectData(idx) {
    const db = await fetch('http://localhost:3000/api');
    const dataApi = await db.json();
    return dataApi[idx];
}

async function renderSelector(idx) {
    const dataApi = await fetchSelectData(idx);
    const data = dataApi[tabNames[idx]];
    console.log(data);

    data.forEach(item => {
        const option = document.createElement('option');
        option.textContent = item.title;
        option.value = item.title;
        selectCourseName.append(option);
    });
}

renderSelector(1);