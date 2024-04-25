const router = require('express').Router();

const budgetController = require('../controllers/budget');

router.get('/budgets', budgetController.getBudgets);
router.get('/budget/:id', budgetController.getBudgetById);


router.post('/budget', budgetController.addBudget);

router.put('/budget/:id', budgetController.updateBudgetById);

router.delete('/budget/:id', budgetController.deleteBudgetById);



module.exports = router;