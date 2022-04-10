const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('enroll', {
        isEnroll: true,
        title: 'Как записаться'
    });
});

module.exports = router;