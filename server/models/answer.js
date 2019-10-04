import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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

answerSchema.set('toJSON', {
    transform: (document, returnedAnswer) => {
        returnedAnswer.id = returnedAnswer._id.toString();
      delete returnedAnswer._id;
      delete returnedAnswer.__v;
    },
  });

const Answer = model('Answer', answerSchema);

export default Answer;
