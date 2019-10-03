import mongoose from 'mongoose';
const { Schema } = mongoose;

const answerSchema = Schema({
    answer: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Answer', answerSchema);