const router = require('express').Router();
const { authenticate } = require('./middleware/auth');

const userProfileController = require('./controllers/userProfile');
const userController = require('./controllers/user');
const productCategoryController = require('./controllers/productCategory');
const productController = require('./controllers/product');

router.post('/user/auth', userController.login);

router.get('/user_profile', authenticate, userProfileController.index);
router.get('/user_profile/:id', authenticate, userProfileController.show);
router.post('/user_profile', authenticate, userProfileController.store);
router.put('/user_profile/:id', authenticate, userProfileController.update);
router.delete('/user_profile/:id', authenticate, userProfileController.destroy);

router.get('/product_category', authenticate, productCategoryController.index);
router.get('/product_category/:id', authenticate, productCategoryController.show);
router.post('/product_category', authenticate, productCategoryController.store);
router.put('/product_category/:id', authenticate, productCategoryController.update);
router.delete('/product_category/:id', authenticate, productCategoryController.destroy);

router.get('/product', authenticate, productController.index);
router.get('/product/:id', authenticate, productController.show);
router.post('/product', authenticate, productController.store);
router.put('/product/:id', authenticate, productController.update);
router.delete('/product/:id', authenticate, productController.destroy);

module.exports = router;