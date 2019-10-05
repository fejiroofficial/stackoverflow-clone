import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const subscribeSchema = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'Question'
    },
}, {
    timestamps: true
});

subscribeSchema.set('toJSON', {
    transform: (document, returnedSubscription) => {
      delete returnedSubscription._id;
      delete returnedSubscription.__v;
    },
  });

subscribeSchema.index({ question: 1, user: 1 }, { unique: true });

const Subscription = model('Subscription', subscribeSchema);

export default Subscription;
