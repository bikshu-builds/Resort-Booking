'use server'
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',   // <-- Should match your Booking model name
        }
    ]
});

// Prevent recompiling model in Next.js hot reload
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
