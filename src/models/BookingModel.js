import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'errors.required'],
    trim: true,
    minlength: [2, 'name_length'],
    maxlength: [20, 'name_length'],
  },

  email: {
    type: String,
    required: [true, 'errors.required'],
    match: [/^\S+@\S+\.\S+$/, 'errors.invalid_email'],
    trim: true,
    lowercase: true,
  },

  bookingStartDate: {
    type: String,
    required: [true, 'errors.required'],
    trim: true,
  },

  phone: {
    type: String,
    required: [true, 'errors.required'],
    match: [/^\+?[1-9]\d{1,14}$/, 'errors.invalid_phone'],
    trim: true,
  },
  // Нове поле для зони
  selectedZone: {
    type: String,
    default: '',
  },
  comment: {
    type: String,
    default: '',
    maxlength: [150, 'comment_too_long'],
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: {
      values: ['pending', 'processing', 'confirmed', 'rejected'],
      message: 'errors.invalid_status', // Ключ, який прийде, якщо статус буде іншим
    },
    default: 'pending',
  },
});

const Booking = mongoose.model('Booking', bookingSchema, 'bookings');
export default Booking;
