const express = require('express');
const mainController = require('./../controllers/mainController');

const router = express.Router();

router
    .route('/')
    .get(mainController.getAllInfo);

//only one module to export, so this way
module.exports = router;
