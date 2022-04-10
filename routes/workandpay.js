const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('workandpay', {
        isPay: true,
        title: 'Участие и оплата'
    });
});

module.exports = router;