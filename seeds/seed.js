const sequelize = require('../config/connection');
const { User, Chat } = require('../models');

const userSeedData = require('./userSeedData.json');
const chatSeedData = require('./messageSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true,
    });

    for (const chat of chatSeedData) {
        const newChat = await Chat.create({
            ...chat,
            // Attach a random user ID to each message
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();