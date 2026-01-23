const Feedback = require('../models/feedbacks/FeedbackSchema');

class FeedbackController {
    async getFeedbacks(req, res) {
        try {
            const feedbacks = await Feedback.find();

            console.log(feedbacks);
            // res.json(feedbacks);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new FeedbackController();