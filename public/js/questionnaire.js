'use strict';

const submitDescription = document.querySelector('.enroll__subtitle');
const submitBtn = document.querySelector('.enroll__form-submit');
const formContainer = document.forms.enroll__form;

function checkIsRequired() {
    const nameInp = formContainer.name.value;
    const email = formContainer.email.value;
    const checkbox = formContainer.checkbox.checked;

    if (nameInp === '' || email === '' || checkbox !== true) {
        submitDescription.style.display = 'block';
        submitDescription.textContent = 'Заполните обязательные поля (Имя, Email) и подтвердите согласие на обработку данных!';
        return false;
    } else {
        submitDescription.style.display = 'none';
        return true;
    }
}

function getData() {
    const targetLearn = formContainer.target_learn.value;
    const yourProblem = formContainer.your_problem.value;
    const yourLvl = formContainer.your_lvl.value;
    const howLong = formContainer.how_long.value;
    const whereLearn = formContainer.where_learn.value;
    const anotherLanguage = formContainer.another_language.value;
    const whichTypeSchool = formContainer.which_type_school.value;
    const whatsHard = formContainer.whats_hard.value;
    const howMatchTime = formContainer.how_match_time.value;
    const file = formContainer.file.value;
    const nameInp = formContainer.name.value;
    const email = formContainer.email.value;
    const phone = formContainer.phone.value;

    return {
        name: nameInp,
        email: email,
        phone: phone ? phone : 'Не указано',
        targetLearn: targetLearn ? targetLearn : 'Не указано',
        yourProblem: yourProblem ? yourProblem : 'Не указано',
        yourLvl: yourLvl ? yourLvl : 'Не указано',
        howLong: howLong ? howLong : 'Не указано',
        whereLearn: whereLearn ? whereLearn : 'Не указано',
        anotherLanguage: anotherLanguage ? anotherLanguage : 'Не указано',
        whichTypeSchool: whichTypeSchool ? whichTypeSchool : 'Не указано',
        whatsHard: whatsHard ? whatsHard : 'Не указано',
        howMatchTime: howMatchTime ? howMatchTime : 'Не указано'
    }
}

async function fetchData() {
    const data = getData();
    const URL = 'http://localhost:3000/enroll';

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }); 

        // const json = await response.json();
        // console.log('Успех:', JSON.stringify(json));

        if (response.ok) {
            submitDescription.style.display = 'block';
            submitDescription.innerHTML = 'Спасибо! Мы скоро с вами свяжемся и предложим лучшую программу в соответствии с вашим уровнем <br> владения языка';
            setTimeout(() => {
                submitDescription.style.display = 'none';
                formContainer.reset();
            }, 4000);
        }
    } catch (err) {
        console.error('Поизошла ошибка: ', err);
        submitDescription.style.display = 'block';
        submitDescription.innerHTML = 'Что-то пошло не так. Повторите попытку позднее.';
        setTimeout(() => {
            submitDescription.style.display = 'none';
        }, 4000);
    }

}

formContainer.addEventListener('submit', (e) => {
    e.preventDefault();

    if (checkIsRequired()) {
        fetchData();
    }
});