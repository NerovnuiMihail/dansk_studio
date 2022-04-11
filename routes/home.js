const path = require('path');
const {Router} = require('express');
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

module.exports = router