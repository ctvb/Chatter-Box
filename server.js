const express = require('express');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const helpers = require('./utils/helpers');

// import sequelize connection
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super secret secret',
    cookie: {

        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',

    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({

        db: sequelize
    })
};

// Commented out for debugging purposes (Currently spams console log with )
app.use(session(sess));

// Inform Express.js on which template engine to use
// app.engine('handlebars', exphbs({ defaultLayout:'main' }));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
})