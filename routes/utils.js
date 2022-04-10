const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('utils', {
        isUtils: true,
        title: 'Услуги'
    });
});

module.exports = router;