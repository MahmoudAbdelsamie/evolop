
exports.getBudgets = (req, res, next) => {
    req.user
        .getBudgets()
        .then(budgets => {
            if(!budgets) {
                return res.status(404).send({
                    message: 'Budgets Not Found'
                })
            }
            return res.status(200).send({
                status: 'Success',
                message: 'Budgets Retrieved Successfully...',
                data: budgets
            })
        })
        .catch(err => {
            return res.status(500).send({
                error: err.message
            })
        })
};

// Get Budget by Id
exports.getBudgetById = (req, res, next) => {
    const { id } = req.params;
    req.user
        .getBudgets({ where: { id: id }})
        .then(budgets => {
            const budget = budgets[0];
            if(!budget) {
                return res.status(404).send({
                    message: 'Budget Not Found'
                })
            }
            return res.status(200).send({
                status: 'Success',
                message: 'Budget Retrieved Successfully...',
                data: budget
            })
        })
        .catch(err => {
            return res.status(500).send({
                error: err.message
            })
        })
};


// Add Budget
exports.addBudget = (req, res, next) => {
    const {
        amount,
        start_date,
        end_date,
        categoryId
    } = req.body;
    
    req.user
        .createBudget({
            amount: amount,
            start_date: start_date,
            end_date: end_date,
            categoryId: categoryId
        })
        .then(result => {
            return res.status(200).send({
                status: 'Success',
                message: 'Budget Created Successfully...'
            })
        })
        .catch(err => {
            return res.status(500).send({
                error: err.message
            })
        })

};


// Update Budget by Id
exports.updateBudgetById = (req, res, next) => {
    const { id } = req.params;
    const {
        amount,
        start_date,
        end_date,
        categoryId
    } = req.body;

    req.user
        .getBudgets({ where: { id: id }})
        .then(budgets => {
            const budget = budgets[0];
            if(!budget) {
                return res.status(404).send({
                    message: 'Budget Not Found'
                })
            }
            budget.amount = amount;
            budget.start_date = start_date;
            budget.end_date = end_date;
            budget.categoryId = categoryId;
            return budget.save();
        })
        .then(result => {
            return res.status(200).send({
                status: 'Success',
                message: 'Budget Updated Successfully...'
            });
        })
        .catch(err => {
            return res.status(500).send({
                error: err.message
            })
        })
};


// Delete Budget by Id
exports.deleteBudgetById = (req, res, next) => {
    const { id } = req.params;
    req.user
        .getBudgets({ where: { id: id }})
        .then(budgets => {
            const budget = budgets[0];
            if(!budget) {
                return res.status(404).send({
                    message: 'Budget Not Found'
                })
            }
            return budget.destroy();
        })
        .then(result => {
            return res.status(200).send({
                status: 'Success',
                message: 'Budget Deleted Successfully'
            });
        })
        .catch(err => {
            return res.status(500).send({
                error: err.message
            })
        })
};