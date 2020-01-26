const router = require('express').Router();
const { authenticate } = require('./middleware/auth');

const userController = require('./controllers/user');
const productCategoryController = require('./controllers/productCategory');

router.post('/user/auth', userController.login);

router.get('/product_category', authenticate, productCategoryController.index);
router.get('/product_category/:id', authenticate, productCategoryController.show);
router.post('/product_category', authenticate, productCategoryController.store);
router.put('/product_category/:id', authenticate, productCategoryController.update);
router.delete('/product_category/:id', authenticate, productCategoryController.destroy);

module.exports = router;