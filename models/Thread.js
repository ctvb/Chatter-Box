const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Thread extends Model { }

Thread.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        thread_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'thread',
    }
)

module.exports = Thread;