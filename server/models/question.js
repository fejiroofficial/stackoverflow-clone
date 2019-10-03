import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const questionSchema = Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);