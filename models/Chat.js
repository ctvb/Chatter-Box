const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Chat extends Model { }

Chat.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        message_id: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            unique: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time_stamp: {
            type: DataTypes.DATE,
            // allowNull: false,
            default: DataTypes.NOW
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'chat',
    }
)

module.exports = Chat;