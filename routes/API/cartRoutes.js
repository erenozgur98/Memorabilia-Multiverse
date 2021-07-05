const router = require('express').Router();
const itemsController = require('../../controllers/itemsController');
const cartController = require('../../controllers/cartController');

// Routing to the homepage and a get to get all items in the database using the controllers

router.route('/').get(itemsController.findFranchiseProducts);

router.route('/:ItemId').get(itemsController.findOne);

router.route('/').post(cartController.create);

router.route('/:id').delete(cartController.deleteOne);

router.route('/').put(cartController.updateOne);

router.route('/completeOrder').post(cartController.createOrder);

module.exports = router;