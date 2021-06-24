const router = require('express').Router();
const userRoute = require('./userRoute');
const franchiseRoutes = require('./franchiseRoutes');
const productRoutes = require('./productRoutes');
const transactionRoutes = require('./transactionRoutes');

router.use('/users', userRoute);
router.use('/products', productRoutes);
router.use('/transactions', transactionRoutes);
router.use('/franchise', franchiseRoutes);

module.exports = router;