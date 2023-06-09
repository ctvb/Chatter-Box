// Imported Models
const User = require('./User');
const Chat = require('./Chat');

// Message belongs to User identified by user_id
Chat.belongsTo(User, {
    foreignKey: 'user_id'
});


module.exports = {
    User,
    Chat
}