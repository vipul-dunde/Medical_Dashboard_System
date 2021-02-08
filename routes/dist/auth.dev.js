"use strict";

var express = require('express');

authController = require('../controllers/auth_controll'); // grtting from auth from contoller

var router = express.Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/addpatient', authController.addpatient);
router.post('/dashboard', authController.dashboard);
router.post('/adddoctor', authController.adddoctor);
router.post('/deletepage', authController.deletepage);
router.post('/complain', authController.complain);
router.post('/salary', authController.complain);
module.exports = router;