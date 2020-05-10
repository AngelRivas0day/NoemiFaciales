const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const md_auth = require('../middlewares/ensureAuth');

router.get('/list', serviceController.list);
router.post('/create', md_auth.ensureAuth, serviceController.add);
router.get('/list/:id', serviceController.edit);
router.post('/dataTable/', serviceController.listDataTable);
router.put('/update/:id', md_auth.ensureAuth, serviceController.update);
router.delete('/delete/:id', md_auth.ensureAuth, serviceController.delete);
router.put('/update-image/:id', md_auth.ensureAuth, serviceController.uploadImage);
router.get('/get-image/:fileName', serviceController.getImage);

module.exports = router;
