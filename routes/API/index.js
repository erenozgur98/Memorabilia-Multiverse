const router = require('express').Router();
const userRoute = require('./userRoute');

router.use('/users', userRoute);

module.exports = router;