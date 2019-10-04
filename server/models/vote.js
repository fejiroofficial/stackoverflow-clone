import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const voteRecordSchema = Schema({
    vote: {
        type: Number,
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

voteRecordSchema.set('toJSON', {
    transform: (document, returnedVote) => {
      returnedVote.id = returnedVote._id.toString();
      delete returnedVote._id;
      delete returnedVote.__v;
    },
  });

const Answer = model('Vote', voteRecordSchema);

export default Answer;
