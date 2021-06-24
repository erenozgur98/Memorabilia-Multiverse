const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cart extends Model { }

Cart.init(
    {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            references: {
                model: "user",
                key: "id"
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            references: {
                model: "product",
                key: "id"
            }
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'cart',
    }
);

module.exports = Cart;