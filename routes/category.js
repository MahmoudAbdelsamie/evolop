const router = require('express').Router();

const categoryController = require('../controllers/category');

router.get('/categories', categoryController.getCategories);
router.get('/category/:id', categoryController.getCategoryById);
router.get('/category-budget/:id', categoryController.getCategoryBudgetById);

router.post('/category', categoryController.addCategory)

router.put('/category/:id', categoryController.updateCategory);

router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;