const sequelize = require('../config/connection');

const { Product, Transaction, User, Franchise }  = require('../models');

const productSeedData = require('./productsDataSeed.json');
// const transactionsDataSeed = require('./transactionsDataSeed.json');
// const userDataSeed = require('./userDataSeed.json');
// const franchiseSeed = require('./franchiseDataSeed.json');

// const librarySeedData = require('./librarySeedData.json');

// Add the `async` keyword to the function `seedDatabase` to make Asynchronous.
const seedDatabase = async () => {

  // Add the `await` keyword infront of the expressions inside the `async` function.
  await sequelize.sync({ force: true });

  // Once JavaScript recogonizes the `await` keyword it waits for the promise to be fufilled before moving on.
//   await Franchise.bulkCreate(franchiseSeed);
  await Product.bulkCreate(productSeedData);
//   await User.bulkCreate(userDataSeed);
//   await Transaction.bulkCreate(transactionsDataSeed);
  
  process.exit(0);
};

seedDatabase();
