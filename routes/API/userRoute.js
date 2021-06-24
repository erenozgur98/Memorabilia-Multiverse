const router = require('express').Router();
const User = require('../../models/User');

router.get('/', async (req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        const newUser = await user.save();
        console.log(newUser);
        const userJson = JSON.parse(JSON.stringify(newUser));
        delete userJson.password;
        res.json(userJson);
    } catch (err) {
        console.log(err);
        res.status(400).json({ mes: 'Invalid Username or Password' });
    }
});

module.exports = router;