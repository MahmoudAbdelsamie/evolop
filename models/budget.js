const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Budget = sequelize.define('budget', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    amount: {
        type: Sequelize.DOUBLE
    },
    start_date: {
        type: Sequelize.DATE,
    },
    end_date: {
        type: Sequelize.DATE,
    }
});

module.exports = Budget;