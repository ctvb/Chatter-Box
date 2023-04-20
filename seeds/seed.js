const sequelize = require('../config/connection');
const { User, Message } = require('../models');

const userSeedData = require('./userSeedData.json');
const messageSeedData = require('./messageSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true,
    });

    for (const message of messageSeedData) {
        const newMessage = await Message.create({
            ...message,
            // Attach a random user ID to each message
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();