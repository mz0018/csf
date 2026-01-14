const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    respondent: {
        name: {
            type: String,
        },
        phone: {
            type: String,
        }
    },

    queueNumber: {
        type: String,
        required: true
    },

    selectedOffice: {
        type: String,
        required: true
    },

    services: {
        selected: {
            type: [
                {
                    id: {
                        type: String,
                        required: true
                    },
                    name: {
                        type: String,
                        required: true
                    }
                }
            ],
            required: true
        },
        otherText: {
            type: String,
        }
    },

    demographics: {
        affiliations: {
            type: [String],
            required: true
        },
        genders: {
            type: [String],
            required: true
        },
        ageGroups: {
            type: [String],
            required: true
        },
        employmentStatus: {
            type: [String],
            required: true
        },
        addresses: {
            type: Object,
            required: true
        }
    },

    ratings: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                },
                value: {
                    type: Number,
                    required: true
                }
            }
        ],
        required: true
    },

    otherSuggestions: {
        type: String,
    },

    submittedAt: {
        type: Date,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
