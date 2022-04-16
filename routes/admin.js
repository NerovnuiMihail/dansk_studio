const {Router} = require('express');
const Courses = require('../models/courses');
const router = Router();

router.get('/', (req, res) => {
    res.render('admin', {
        isAdmin: true,
        title: 'Административная панель'
    });
});

router.post('/services', async (req,res) => {
    const data = new Courses(req.body.title, req.body.time, req.body.cost);
    await Courses.addCourse(data.profileCourse(), req.body.name);

    res.redirect('/admin');
});

module.exports = router;