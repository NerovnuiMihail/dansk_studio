const path = require('path');
const {Router} = require('express');
const Courses = require('../models/courses');
const Lessons = require('../models/lessons');
const Schedule = require('../models/schedule');
const Questionnaire = require('../models/questionnaire');
const router = Router();

router.get('/', async (req,res) => {
    const db = await Courses.getAll();
    res.json(db);
});

router.get('/lessons', async (req,res) => {
    const db = await Lessons.getAll();
    res.json(db);
});

router.get('/schedule', async (req,res) => {
    const db = await Schedule.getAll();
    res.json(db);
});

router.get('/questionnaire', async (req,res) => {
    const db = await Questionnaire.getAll();
    res.json(db);
});

router.get('/questionnaire/:id', async (req,res) => {
    const candidate = await Questionnaire.getOne(req.params.id);

    res.render('questionnaire', {
        title: 'Подробнее',
        candidate: candidate
    });
});

module.exports = router;