import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  bookingStartDate: { type: String, required: true },

  phone: { type: String, default: '' },
  comment: { type: String, default: '' },

  createdAt: { type: Date, default: Date.now },

  status: {
    type: String,
    enum: ['pending', 'processing', 'confirmed', 'rejected'],
    default: 'pending',
  },
});

const Booking = mongoose.model('Booking', bookingSchema, 'bookings');
export default Booking;
