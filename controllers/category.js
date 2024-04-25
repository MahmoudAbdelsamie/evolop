const Budget = require('../models/budget');


// get Categories
exports.getCategories = (req, res, next) => {
    req.user
        .getCategories()
        .then(categories => {
            if(!categories) {
                return res.status(404).send({
                    message: 'No Categories Founded'
                })
            }
            return res.status(200).send({
                status: 'Success',
                message: 'Categories Retrieved',
                data: categories
            })
        })
        .catch(err => {
            return res.status(500).send({
                error: err.message
            });
        })
}

// get Category by Id
exports.getCategoryById = (req, res, next) => {
    const { id } = req.params;
    req.user
        .getCategories({where: { id: id }})
        .then(categories => {
            const category = categories[0];
            if(!category) {
                return res.status(404).send({
                    message: 'No Category Founded'
                })
            }
            return res.status(200).send({
                status: 'Success',
                message: 'Category Retrieved',
                data: category
            })
        })
        .catch(err => {
            return res.status(500).send({
                error: err.message
            })
        })
};

// // Get Category Budget
exports.getCategoryBudgetById = (req, res, next) => {
    const { id } = req.params;
    req.user
        .getCategories({ where: { id: id }, include: [Budget]})
        .then(categories => {
            const category = categories[0];
            if(!category) {
                return res.status(404).send({
                    message: 'Category Budget Not Found'
                })
            }
            return res.status(200).send({
                status: 'Success',
                message: 'Category Budget Retrieved Successfully...',
                data: category
            })
        })
        .catch(err => {
            return res.status(500).send({
                error: err.message
            })
        })
};


// Add Category
exports.addCategory = (req, res, next) => {
    const { name, description } = req.body;
    req.user
        .createCategory({
            name: name,
            description: description
        })
        .then(result => {
            return res.status(201).send({
                status: 'Success',
                message: 'Category Created Successfully'
            })
        })
        .catch(err => {
            return res.status(500).send({
                error: err.message
            });
        })
}

// Update Category By id
exports.updateCategory = (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    req.user
        .getCategories({ where: { id: id }})
        .then(categories => {
            const category = categories[0];
            if(!category) {
                return res.status(404).send({
                    message: 'No Category Founded'
                })
            }
            category.name = name;
            category.description = description;
            return category.save();
        })
        .then(result => {
            return res.status(200).send({
                status: 'Success',
                message: 'Category Updated Successfully...'
            })
        })
        .catch(err => {
            return res.status(500).send({
                error: err.message
            })
        })
}; 

// Delete category by id 
exports.deleteCategory = (req, res, next) => {
    const { id } = req.params;
    req.user
        .getCategories({ where: { id: id }})
        .then(categories => {
            const category = categories[0];
            if(!category) {
                return res.status(404).send({
                    message: 'No Category Founded'
                })
            }
            return category.destroy();
        })
        .then(result => {
            return res.status(200).send({
                status: 'Success',
                message: 'Category Deleted Successfully'
            })
        })
        .catch(err => {
            return res.status(500).send({
                error: err.message
            })
        })
}
