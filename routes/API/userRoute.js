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

router.post('/signup', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const userData = {
            email: email.toLowerCase(),
            username,
            password
        };

        
        // const existingUsername = await User.findOne({ username: req.body.username });

        // if (existingUsername) {
        //     return res.status(400).json({ message: 'Username already exists' });
        // };

        const newUser = await User.create(req.body);
        delete newUser.password;
        const savedUser = newUser.save();
        res.json(newUser);
        console.log('New User:', newUser, 'Saved User: ', savedUser);
       
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
})

// router.post('/signup', async (req, res) => {
//     try {
//         const { email, username } = req.body;
//         const hashedPassword = await hashPassword(req.body.password);

//         const userData = { email: email.toLowerCase(), username, password: hashedPassword };

//         const existingUsername = await User.findOne({ username: req.body.username });

//         if (existingUsername) {
//             return res.status(400).json({ message: 'Username already exists' });
//         };

//         const newUser = new User(userData);
//         const savedUser = newUser.save();

//         if (savedUser) {
//             const token = createToken(savedUser);

//             const { username, email } = savedUser;

//             const userInfo = { username, email };
//             console.log('TESTING IF USERINFO GOT THE INFO: ', userInfo.username);

//             return res.json({
//                 message: 'User created',
//                 token,
//                 userInfo
//             })
//         } else {
//             return res.status(400).json({
//                 message: 'There was a problem'
//             });
//         };
//     } catch (err) {
//       return res.status(404).json({
//         message: 'There was a problem creating your account'
//       });
//     }
// });


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