const router = require('express').Router();
const franchiseController = require('../../controllers/franchiseController');

// Routing to the homepage and a get to get all items in the database using the controllers

router.route('/').get(franchiseController.find);

module.exports = router;