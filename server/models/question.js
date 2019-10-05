import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const calculateVotes = async (question) => {
    const upVotes = await Vote.find({
      question,
      value: 1,
    }).countDocuments();
    const downVotes = await Vote.find({
      question,
      value: -1,
    }).countDocuments();
    return upVotes - downVotes;
}

const questionSchema = Schema({
    title: {
        type: String,
        index: true,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        index: true,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

questionSchema.set('toJSON', {
    transform: (document, returnedQuestion) => {
      delete returnedQuestion._id;
      delete returnedQuestion.__v;
    },
  });

questionSchema.index({ title: 'text', description: 'text' });
  
questionSchema.virtual('upvotes').get(() => {
    return calculateVotes(this);
  });


const Question = model('Question', questionSchema);

export default Question;
