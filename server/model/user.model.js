import {model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15,
        select: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

userSchema.pre('save', async function(next) {
   try {
     const user = this;
     console.log("Before saving user: ", user);
     if(user.email.includes("@") &&user.email.includes(".")) {
         const salt = await bcrypt.genSaltSync(10); //
         const hashedPassword = await bcrypt.hash(user.password, salt);
         user.password = hashedPassword;
         console.log("After hashing password: ", user);
         next();
     } else {
        return next(new Error("Invalid email format"));
     }
   } catch (error) {
        console.log("Error in pre-save hook: ", error);
        return next(error);
   }
})

const User = model('users', userSchema);

export default User;