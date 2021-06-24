const router = require('express').Router();
const userRoute = require('./useRoute');

router.use('/users', userRoute);

module.exports = router;