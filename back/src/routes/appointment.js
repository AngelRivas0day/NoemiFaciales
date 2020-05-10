const express = require('express');
const router = express.Router();

const appointmentsController = require('../controllers/appointmentsController');
const md_auth = require('../middlewares/ensureAuth');

router.get('/list', appointmentsController.listAll);
router.post('/create', appointmentsController.create);
router.get('/list/:id', appointmentsController.listOne);
router.post('/dataTable/', appointmentsController.listDataTable);
router.put('/update/:id', [md_auth.ensureAuth], appointmentsController.edit);
router.put('/confirm/:id', [md_auth.ensureAuth], appointmentsController.confirm);
router.put('/achieve/:id', [md_auth.ensureAuth], appointmentsController.archive);
router.delete('/delete/:id', [md_auth.ensureAuth], appointmentsController.delete);

module.exports = router;
