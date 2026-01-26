const Feedback = require('../models/feedbacks/FeedbackSchema');
const computeAvg = require('../helpers/computeAvg');

class FeedbackController {

  async getFeedbacks(req, res) {
    try {
      const { officeId } = req.params;

      const page = Number(req.query.page) || 1;
      const limit = 15;
      const skip = (page - 1) * limit;

      const filter = { selectedOffice: officeId };

      const total = await Feedback.countDocuments(filter);

      const feedback = await Feedback.find(filter)
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      const averages = {};

      feedback.forEach(fb => {
        const responsiveness   = fb.ratings.find(r => r.name === 'Responsiveness')?.value;
        const reliability      = fb.ratings.find(r => r.name === 'Reliability')?.value;
        const accessFacilities = fb.ratings.find(r => r.name === 'Access & Facilities')?.value;
        const communication    = fb.ratings.find(r => r.name === 'Communication')?.value;
        const costs            = fb.ratings.find(r => r.name === 'Costs')?.value;
        const integrity        = fb.ratings.find(r => r.name === 'Integrity')?.value;
        const assurance        = fb.ratings.find(r => r.name === 'Assurance')?.value;
        const outcome          = fb.ratings.find(r => r.name === 'Outcome')?.value;

        const avg = computeAvg(
          responsiveness,
          reliability,
          accessFacilities,
          communication,
          costs,
          integrity,
          assurance,
          outcome
        );

        console.log('COMPUTED AVG:', avg);

        averages[fb._id] = avg;
      });

      res.status(200).json({
        feedback,
        averages,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      });

    } catch (err) {
      console.error('Backend error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new FeedbackController();
