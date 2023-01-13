const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Home_Page');
});

module.exports = router;