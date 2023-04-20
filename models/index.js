// Imported Models
const User = require('./User');
const Chat = require('./Chat');
const Thread = require('./Thread');

// Message belongs to User identified by user_id
Chat.belongsTo(User, {
    foreignKey: 'user_id'
});

// Messages belong to individual Threads
Chat.belongsTo(Thread, {
    foreignKey: 'thread_id'
});

Thread.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


module.exports = {
    User,
    Chat,
    Thread
}