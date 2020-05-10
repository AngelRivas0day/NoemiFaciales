const express = require('express');
const router = express.Router();

const generalController = require('../controllers/generalController');
const md_auth = require('../middlewares/ensureAuth');

router.get('/list/:id', generalController.getAll);
router.put('/update/', generalController.update);
router.put('/update-image/:id', [md_auth.ensureAuth], generalController.updateImage);
router.get('/get-image/:fileName', generalController.getImage);

module.exports = router;