const express = require('express');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const helpers = require('./utils/helpers');
const Chat = require('./models/Chat');

// import sequelize connection
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;

// Required for the socket.io server
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const formatMessage = require('./utils/messages');
const { ChatMessage } = require('./models');

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

const createChatMessage = async (text, user_id) => {
    try {
        await Chat.create({
            text: text,
            user_id: user_id
        });
    } catch (error) {
        console.error(error);
    }
};

app.use(session(sess));

// Starts the server for socket.io
server.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:3000`);
});

const botName = 'Chat Bot';
io.on('connection', async socket => {
    try {
        // Get the 10 most recent chat messages from the database
        const messages = await Chat.findAll({
            limit: 10,
            order: [['time_stamp', 'DESC']]
        });

        // Emit each message to the client
        messages.reverse().forEach(message => {
            socket.emit('message', formatMessage('USER', message.text));
        });
    } catch (error) {
        console.error(error);
    }

    socket.emit('message', formatMessage(botName, `Welcome to the chat!`))

    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));

    socket.on('disconnect', () => {
        socket.emit('message', formatMessage('USER', 'A user has left the chat'));
    })

    socket.on('chatMessage', async (msg) => {
        io.emit('message', formatMessage('USER', msg));

        try {
            // Save the message to the database
            await createChatMessage(msg);
        } catch (error) {
            console.error(error);
        }
    });
});


// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);

sequelize.sync({ force: false }).then(() => {
    console.log('Database Synced');
    // app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

