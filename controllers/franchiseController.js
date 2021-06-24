const db = require("../models");

module.exports = {
    find: async function(req, res){
        try {
            const franchises = await db.Franchise.findAll();
            res.json(franchises);
        } catch (err) {
           console.log(err);
           res.status(404);
        }
    }
};