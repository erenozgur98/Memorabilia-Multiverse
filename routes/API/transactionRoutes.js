const router = require('express').Router();
const transactionController = require('../../controllers/transactionController');

// Routing to the homepage and a get to get all/some transactions in the database using the controllers

router.route('/').get(transactionController.findAllTransactions);

router.route('/').post(transactionController.create);


module.exports = router;