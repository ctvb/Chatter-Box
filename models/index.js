// Imported Models
const User = require('./models/User');
const Message = require('./models/Message');
const Thread = require('./models/Thread');

// Message belongs to User identified by user_id
Message.belongsTo(User, {
    foreignKey: 'user_id'
});

// Messages belong to individual Threads
Message.belongsTo(Thread, {
    foreignKey: 'thread_id'
});

Thread.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


module.exports = {
    User,
    Message,
    Thread
}