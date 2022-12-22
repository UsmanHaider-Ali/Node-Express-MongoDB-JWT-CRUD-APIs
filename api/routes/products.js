const express = require('express');
const router = express.Router();
// const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/products');

// const fileStorage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function(req, file, cb) {
//         cb(null, new Date().toISOString() + file.fieldname);
//     },
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
//         cb(null, true);
//     else
//         cb(null, false);
// };

// const upload = multer({
//     storage: fileStorage,
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 1024 * 1024 * 1
//     },
// });

router.get('/get_all_prodcts', productController.getAllProducts);

router.get('/get_one_product/:productId', productController.getOneProduct);

//  upload.single('image'),
router.post('/add_new_product', checkAuth, productController.addNewProduct);

router.patch('/update_product/:productId', checkAuth, productController.updateProduct);

router.delete('/delete_product/:productId', checkAuth, productController.deleteProduct);

module.exports = router;