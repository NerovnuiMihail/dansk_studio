const path = require('path');
const {Router} = require('express');
const Lessons = require('../models/lessons');
const Schedule = require('../models/schedule');
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        isHome: true,
        title: 'Главная'
    });
});

router.get('/questionnaire', (req, res) => {
    res.download(path.join(__dirname,'..','public', 'questionnaire.txt'));
});

router.post('/freelesson', async (req, res) => {
    const lesson = new Lessons(req.body.name, req.body.email, req.body.tel);
    await Lessons.addLesson(lesson.profileLesson());
    res.redirect('/utils');
});

router.post('/schedule', async (req, res) => {
    const schedule = new Schedule(req.body.name, req.body.email, req.body.tel, req.body.skype);
    await Schedule.addSchedule(schedule.profileSchedule());
    res.redirect('/utils');
});

module.exports = router