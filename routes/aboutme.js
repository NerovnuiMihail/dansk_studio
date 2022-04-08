const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('aboutme', {
        isAboutme: true,
        title: 'Обо мне'
    });
});

module.exports = router