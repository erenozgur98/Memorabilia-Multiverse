const express = require("express");
const session = require('express-session');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./routes');

const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});
