import mongoose from 'mongoose';

const callbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'errors.required'],
    trim: true,
    minlength: [2, 'name_length'], // Мінімальна довжина з вашим ключем
    maxlength: [20, 'name_length'], // Максимальна довжина з тим самим ключем
  },

  phone: {
    type: String,
    required: [true, 'errors.required'],
    match: [/^\+?[1-9]\d{1,14}$/, 'errors.invalid_phone'],
    trim: true,
  },

  status: {
    type: String,
    enum: {
      values: ['new', 'called', 'cancelled'],
      message: 'errors.invalid_status', // Ключ для вашої локалізації
    },
    default: 'new',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Callback = mongoose.model('Callback', callbackSchema);
export default Callback;
