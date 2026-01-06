const express = require('express');
const SuperAdminController = require('../controllers/SuperAdminController');

const router = express.Router();

router.post('/signup', (req, res) => SuperAdminController.registerSuperAdmin(req, res));
router.post('/signin', (req, res)  => SuperAdminController.verifySuperAdmin(req, res));
router.post('/register-user', (req, res) => SuperAdminController.registerUser(req, res));

module.exports = router;