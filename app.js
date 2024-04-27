const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();


const categoryRoutes = require('./routes/category');
const budgetRoutes = require('./routes/budget')

const sequelize = require('./utils/database')
const User = require('./models/user');
const Budget = require('./models/budget');
const Category = require('./models/category');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
    User
        .findByPk(1)
        .then(user => {
            if(user) {
                req.user = user;
                next();
            } else {
                throw new Error('No User found To inject at req...')
            }
        })
        .catch(err => {
            console.log('Error: ', err);
        })

});


app.use(categoryRoutes);
app.use(budgetRoutes);

// Setting DB Relations 
User.hasMany(Budget);
User.hasMany(Category);

Budget.belongsTo(User);
Budget.belongsTo(Category);

Category.belongsTo(User);
Category.hasMany(Budget);




sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk(1)
    })
    .then(user => {
        if(!user) {
            return User.create({username: 'Mahmoud', email: 'mahmoud@gmail.com', password: 'mmmmm'})
        }
        return user;
    })
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server is running on Port ${PORT}`);
        })
    })
    .catch(err => {
        console.log('Error: ', err);
    })
