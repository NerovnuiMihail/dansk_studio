const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        isHome: true,
        title: 'Главная'
    });
});

module.exports = router