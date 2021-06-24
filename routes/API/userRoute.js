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

router.get('/login', async (req, res) => {
    try {
        if (req.session.userId) {
            res.send({ loggedIn: true, userId: req.session.userId });
        } else {
            res.send({ loggedIn: false });
        }
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
            password: req.body.password,
        });
        const newUser = await user.save();
        console.log(newUser);
        const userJson = JSON.parse(JSON.stringify(newUser));
        delete userJson.password;
        res.json(userJson);
    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: 'Invalid Username or Password ' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });

        if (!user) {
            res.status(400).json({ msg: 'Incorrect Username or Password ' });
            return;
        };

        const validatePassword = await user.checkPassword(req.body.password);
        if (!validatePassword) {
            res.status(400).json({ msg: 'Incorrect Username of Password ' });
            return;
        };

        req.session.save(() => {
            res.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;
        });

        res.json({ user: user, message: 'Logged In!' });

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            },
            {
                where: {
                    id: req.params.id,
                }
            }
        );
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});


module.exports = router;