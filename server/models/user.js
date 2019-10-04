import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = Schema({
    // TODO: Define Schema
    firstName: {
        type: String,
        required: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function save(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSaltSync(10);
        user.password = await bcrypt.hashSync(user.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});


userSchema.set('toJSON', {
    transform: (document, returnedUser) => {
      returnedUser.id = returnedUser._id.toString();
      delete returnedUser._id;
      delete returnedUser.__v;
      delete returnedUser.password
    },
  });


userSchema.methods.comparePassword = function(passwordReq, userPassword) {
    const allowEntry = bcrypt.compareSync(passwordReq, userPassword);
    if (!allowEntry) {
      return res.status(401).json({
        success: 'false',
        message: 'You have entered an invalid email or password',
      });
    }
};

const User = model('User', userSchema);

export default User;
