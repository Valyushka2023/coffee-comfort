import mongoose from 'mongoose';

const callbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Будь ласка, введіть ім'я"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Будь ласка, введіть номер телефону'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['new', 'called', 'cancelled'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Callback = mongoose.model('Callback', callbackSchema);
export default Callback;
