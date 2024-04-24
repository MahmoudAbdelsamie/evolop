const express = require('express');
require('dotenv').config();


const sequelize = require('./utils/database')
const User = require('./models/user');
const Budget = require('./models/budget');
const Category = require('./models/category');

const PORT = process.env.PORT || 5000;

const app = express();

// Setting DB Relations 
User.hasMany(Budget);
User.hasMany(Category);

Budget.belongsTo(User);
Budget.belongsTo(Category);

Category.belongsTo(User);
Category.hasMany(Budget);




sequelize
    .sync({force: true})
    // .sync()
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server is running on Port ${PORT}`);
        })
    })
    .catch(err => {
        console.log('Error: ', err);
    })
