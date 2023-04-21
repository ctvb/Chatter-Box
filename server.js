const express = require('express');
const routes = require('./routes');
const exphbs = require('express-handlebars');

// import sequelize connection
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

// const { Server } = require('socket.io');
// const io = new Server({ });
// Inform Express.js on which template engine to use
app.engine('handlebars', exphbs({ defaultLayout:'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
})

// io.on('connection', (socket) => {
//     console.log('a user connected');
// })

// io.listen(3000);