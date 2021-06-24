const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Transaction extends Model {}

Transaction.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            //allowNull: false
            // ,
            // references: {
            //     model: "product",
            //     key: "id"
            //   }
        },
        quantity: {
            type: DataTypes.INTEGER,
            //allowNull: false,
        },
        franchise_id: {  //TODO get seed data changed
            type: DataTypes.INTEGER,
            //allowNull: false
            // ,
            // references: {
            //     model: "franchise",
            //     key: "id"
            //   }
        },
        user_id: {
            type: DataTypes.INTEGER,
            //allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            //allowNull: false
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName:'transaction'
    }
);

module.exports=Transaction;