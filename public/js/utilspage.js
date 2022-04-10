'use strict';


const tabItems = document.querySelectorAll('.tab__item');
const tabContentItems = document.querySelectorAll('.tab-content__item');

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
choiceTab(0);
showTabItem(0);

tabItems.forEach((item,idx) => {
    item.addEventListener('click', () => {
        clearTab();
        hideTabItems();

        choiceTab(idx);
        showTabItem(idx);
    });
});