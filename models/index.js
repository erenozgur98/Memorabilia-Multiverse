const Product = require('./Product');
const Transaction = require('./Transaction');
const User = require('./User');
const Franchise = require('./Franchise');
// const Cart = require('./Cart');

Franchise.hasMany(Product);
Product.belongsTo(Franchise);

User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = { User, Transaction, Product, Franchise };