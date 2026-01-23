const express = require('express');
const ClientController = require('../controllers/ClientController');
const FeedbackController = require('../controllers/FeedbackController');
const protect = require('../middleware/authMiddleware');
const adminQueueLimiter = require('../middleware/adminQueueLimiter');
const loginLimiter = require('../middleware/loginLimiter');
const globalQueueLimiter = require('../middleware/globalQueueLimiter');

const { authorizeRole } = require("../middleware/roleMiddleware");

const router = express.Router();

//check this route on app.js
router.post('/submit', (req, res) => ClientController.saveFeedback(req, res));
router.post('/signin', loginLimiter, (req, res) => ClientController.verifyClientAdmin(req, res));
router.post('/logout', (req, res) => ClientController.logout(req, res));
router.post('/queue/generate/:id', protect, adminQueueLimiter, ClientController.generateQueueNumber);
router.post('/verify-queue', globalQueueLimiter, (req, res) => ClientController.verifyQueueNumber(req, res));

router.get('/me', protect, (req, res) => ClientController.getCurrentUser(req, res));
router.get('/getqueue/:id', protect, ClientController.getAllQueue);
router.get('/getByDateToday/:officeId', ClientController.getQueueToday);

router.get('/feedback/:officeId', protect, authorizeRole('hr-admin'), FeedbackController.getFeedbacks);

module.exports = router;