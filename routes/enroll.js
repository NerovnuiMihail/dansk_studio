const {Router} = require('express');
const router = Router();
const Questionnaire =  require('../models/questionnaire');

router.get('/', (req, res) => {
    res.render('enroll', {
        isEnroll: true,
        title: 'Как записаться'
    });
});

router.post('/', async (req,res) => {
    const enroll = new Questionnaire(req.body.name, req.body.email, req.body.phone, req.body.targetLearn, req.body.yourProblem, req.body.yourLvl, req.body.howLong, req.body.whereLearn, req.body.anotherLanguage,req.body.whichTypeSchool, req.body.whatsHard, req.body.howMatchTime);
    await Questionnaire.addQuestionnaire(enroll.profileQuestionnaire());    
    res.json(req.body);
});

module.exports = router;