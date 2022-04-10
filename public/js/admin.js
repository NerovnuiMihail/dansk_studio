'use strict';

const addServicesForm = document.forms[0];

addServicesForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = addServicesForm.elements.title.value;
    const time = addServicesForm.elements.time.value;
    const cost = addServicesForm.elements.cost.value;
    const name = addServicesForm.elements['name-course'].value;
    const URL = 'http://localhost:3000/admin/services';
    const coursesList = {
        'АВТОРСКИЕ КУРСЫ ПО ПРОИЗНОШЕНИЮ': 'authors course',
        'ИНДИВИДУАЛЬНЫЕ ЗАНЯТИЯ': 'individual lesson',
        'ЗАНЯТИЯ В ГРУППАХ': 'group lesson'
    };

    function getData() {
        return {
            title,
            time,
            cost,
            name: coursesList[name]
        }
    }

    const data = getData();

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
    
    e.target.reset();
});


