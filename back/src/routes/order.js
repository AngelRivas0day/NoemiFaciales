const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.get('/list', orderController.listAll);
router.post('/create', orderController.create);
router.get('/list/:id', orderController.listOne);
router.post('/dataTable/', orderController.listDataTable);
router.put('/update/:id', orderController.edit);
router.put('/confirm/:id', orderController.confirm);
router.put('/delivered/:id', orderController.delivered);
router.put('/archive/:id', orderController.archive);
router.delete('/delete/:id', orderController.delete);

module.exports = router;
