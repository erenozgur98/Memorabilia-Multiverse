const db = require("../models");

const cart = {

    create: function (req, res) {
        if (req.user) {
            //console.log('Adding Item(s) to Cart');
            db.Cart.find(
                { user: req.user.id },
                { include: { product_name: req.body.product_name, image_link: req.body.image_link } }
            )
                .then((cartItem) => {
                    //console.log('This is your cart: ', cartItem);
                    if (cartItem === null) {
                        //console.log('Adding new item to Cart');
                        db.Cart.create({
                            user: user.req.id,
                            item: item.req.itemId,
                            orderQty: req.body.quantity,
                        })
                    }
                }).then(() => {
                    res.sendStatus(200);
                })
                .catch((err) => {
                    //console.log(err);
                });

        } else {
            res.sendStatus(403);
            console.log("User is not logged in");
        }
    },

    // Deleting an item out of user cart
    deleteOne: function (req, res) {
        //console.log("Requested item from delete", req);
        if (req.user) {
            //console.log("This is the item to be deleted", req.params.id);

            const itemDelete = req.params.id;
            db.Cart.deleteOne(itemDelete)
                .then(cartdb => {
                    console.log("Item has been deleted from cart");
                    res.json(cartdb);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            res.sendStatus(403);
            //console.log('User is not logged in')
        }
    },

    // Updating user cart
    updateOne: function (req, res) {
        if (req.user) {
            db.cart.updateOne({ _id: req.body.id }, { orderQty: req.body.quantity })
                .then((updated) => {
                    console.log('Your cart has been updated', updated);
                    res.json(updated);
                })
        }
    },

    // Creating the order when the customer is ready to buy
    createOrder: function (req, res) {
        if (req, res) {
            db.Cart.find({ user: req.user.id })
                .then((res) => {
                    const order = res.map((element) => {
                        return { item: element.item, orderQty: element.orderQty }
                    })
                    console.log('Here is your order');
                    console.log('Your total is', typeof req.body);
                    return db.Order.create({
                        user: req.user.id,
                        items: order,
                        total: req.body.total
                    })
                }).then(res => {
                    console.log('Your order has been created! Thank you for shopping in the Multiverse!');
                    return db.Cart.remove({ user: req.user.id })
                })
        }
    }
}

module.exports = cart;



