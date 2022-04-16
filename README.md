# Студия изучения датского языка - Dansk studio

---

[Макет] https://www.figma.com/file/ZMioqFQedUdCTlQP0agTgv/Dansk-studio?node-id=0%3A1

---

## В разработке использовались:
- NodeJS - Express
- Handlebars
- ES6+

---

## Не использовались сборщики файлов и базы данных, защиты данных

---

## Запуск приложения:
    npm run start

---

## Функционал:
- JSON - файлы используются вместо стандартных баз данных
- Можно получить "псевдо анкету", пустой txt файл
- Обработка данных из форм происходит не на сервере, сервер принимает готовый BODY и уже его записывает в "псевдо БД на JSON"
- Через "псевдо админку" - http://localhost:3000/admin можно просмотреть заявки на пробный урок, заявки на получение расписания занятий, анкеты будущих учеников
- Через "псевдо админку" можно создать новые курсы