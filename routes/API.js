const path = require('path');
const {Router} = require('express');
const Courses = require('../models/courses');
const router = Router();

router.get('/', async (req,res) => {
    const db = await Courses.getAll();
    res.json(db);
});

module.exports = router;