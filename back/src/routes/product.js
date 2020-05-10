const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const md_auth = require('../middlewares/ensureAuth');

router.get('/list', productController.listAll);
router.post('/create', md_auth.ensureAuth, productController.create);
router.get('/list/:id', productController.listOne);
router.post('/dataTable/', productController.listDataTable);
router.put('/update/:id', md_auth.ensureAuth, productController.update);
router.delete('/delete/:id', md_auth.ensureAuth, productController.delete);
router.put('/update-image/:id', md_auth.ensureAuth, productController.uploadImage);
router.get('/get-image/:fileName', productController.getImage);

module.exports = router;