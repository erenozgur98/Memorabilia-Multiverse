const { Transaction } = require("../models");

module.exports = {
    findAllTransactions: function (req, res) {
        Transaction.findAll()
            .then((transactionDB) => {
                res.json(transactionDB);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    create: function (req, res) {
        Transaction.create(
            req.body
        )
            .then((newTransaction) => {
                res.json(newTransaction);
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
