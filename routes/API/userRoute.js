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

router.get('/user', async (req, res) => {
    console.log('*********************** LINE 16, ', req.session, req.user);
  try {
    if (req.user) {
        const userData = await User.findByPk(req.user)
        console.log('******************** /user ', req.user)
        const userInfo = {
            role: userData.dataValues.role,
            username: userData.dataValues.username,
            email: userData.dataValues.email
        };
        res.json(userInfo);
    } else {
        res.status(403).json({ message: 'Something went wrong getting the user '});
    }
  } catch(err) {
      console.log('********************line 19 catch err', err);
  };
});

// POST create a new user
router.post('/signup', async (req, res) => {
    try {
        if (!req.body.role) req.body.role = 'user';

        const email = await User.findOne({ where: { email: req.body.email }});
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
    try {
        const user = await User.findOne({ where: { username: req.body.username } });

        if (!user) {
            res.status(400).json({ msg: 'Incorrect Username or Password' });
            return;
        };

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            res.status(400).json({ message: 'Login failed. Please try again!' });
            return;
        }

        req.session.save(() => {
            res.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;
        });

        res.json({ user: user, message: 'Logged In!' });
        console.log(user);

    } catch (err) {
        console.log(err);
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