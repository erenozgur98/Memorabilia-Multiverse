const router = require('express').Router();
const itemsController = require('../../controllers/itemsController');

// Routing to the homepage and a get to get all items in the database using the controllers

router.route('/fran/:franchiseId').get(itemsController.findFranchiseProducts);

router.route('/').get(itemsController.findAll);

router.route('/:ItemId').get(itemsController.findOne);

module.exports = router;