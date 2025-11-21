import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    startdate: {
        type: String,
        required: true
    },
    enddate: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    offer: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',   // <-- MUST match your User model name
        required: true
    }
});

// Model name should be singular + capitalized
const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

export default Booking;
