const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.get("/login", async (req, res) => {
    console.log('line 16', req.session, req.session.user_id);
    try {
      if (req.session.user_id) {
        res.send({ logged_in: true, user_id: req.session.user_id });
      } else {
        res.send({ logged_in: false });
      }
    } catch (err) {
      console.log("Line 23", err)
      res.status(400).json(err);
    }
  })

router.get('/user', async (req, res) => {
    console.log('*********************** LINE 30, ', req.session, req.session.logged_in, req.session.user_id);
    try {
        if (req.session.logged_in) {
            const userData = await User.findByPk(req.session.user_id);
            const userInfo = {
                role: userData.dataValues.role,
                username: userData.dataValues.username,
                email: userData.dataValues.email,
                logged_in: true
            };
            res.json(userInfo);
        } else {
            res.status(403).json({ message: 'Something went wrong getting the user, could mean that you are not logged in/signedup yet ' });
        }
    } catch (err) {
        console.log('********************line 19 catch err', err);
    };
});

// POST create a new user
router.post('/signup', async (req, res) => {
    try {
        if (!req.body.role) req.body.role = 'user';

        const email = await User.findOne({ where: { email: req.body.email } });
        const user = await User.findOne({ where: { username: req.body.username } });
        if (user) {
            console.log('signup error =========', 'That username is taken!')
            res.status(400).json({ message: 'That username is taken' });
        } else if (email) {
            console.log('signup error =========', 'That email is taken!');
            res.status(400).json({ message: 'That email is taken' });
        } else {
            const newUser = await User.create(req.body);
            delete newUser.password;
            res.json(newUser);
            console.log(newUser);
        };
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
})

// POST user login
router.post('/login', async (req, res) => {
    console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', req.body, req.session);
    try {
        const user = await User.findOne({ where: { username: req.body.username } });

        if (!user) {
            res.status(403).json({ msg: 'Incorrect Username' });
            return;
        };

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            res.status(401).json({ message: 'Incorrect Password' });
            return;
        }

        const userData = JSON.parse(JSON.stringify(user));
        console.log('ladskasfhdlksadf', userData);

        // req.session.save(() => {
        //     req.session.user_id = userData.id;
        //     req.session.username = userData.username;
        //     req.session.logged_in = true;
        // });

        req.session.user_id = userData.id
        req.session.logged_in = true;
        req.session.username = userData.username;

        const userInfo = {
            username: user.dataValues.username,
            role: user.dataValues.role,
            id: user.dataValues.id,
            email: user.dataValues.email,
        };


        res.json({ user: user, userInfo});
        console.log('**************************** Line 88', user);

    } catch (err) {
        console.log('Line 100 ERROR ----------------------------------', err);
        res.status(400).json(err);
    }
});

// GET one user
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        if (!userData) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT update a user
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
    console.log('logout route ---------------------------------', req.session);
    if (req.session) {
        req.session.destroy(() => {
            res.status(204).end();
        });
        console.log('logged out, line 125 userRoute.js ==============================')
    } else {
        res.status(404).end();
    };
});


module.exports = router;