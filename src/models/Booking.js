import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  customer: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service is required'],
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: [true, 'Staff member is required'],
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required'],
  },
  appointmentTime: {
    type: String,
    required: [true, 'Appointment time is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'pending',
  },
  notes: {
    type: String,
    trim: true,
    default: '',
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: 0,
  },
  duration: {
    type: Number, // Duration in minutes
    required: [true, 'Duration is required'],
    min: 15,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'cancelled', 'refunded'],
    default: 'pending',
  },
  reminderSent: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
}, {
  timestamps: true,
});

// Index for efficient queries
BookingSchema.index({ appointmentDate: 1, appointmentTime: 1 });
BookingSchema.index({ 'customer.email': 1 });
BookingSchema.index({ staff: 1, appointmentDate: 1 });
BookingSchema.index({ status: 1 });

// Virtual for full customer name
BookingSchema.virtual('customer.fullName').get(function() {
  return `${this.customer.firstName} ${this.customer.lastName}`;
});

// Check for booking conflicts before saving
BookingSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('appointmentDate') || this.isModified('appointmentTime') || this.isModified('staff')) {
    const conflictingBooking = await this.constructor.findOne({
      _id: { $ne: this._id },
      staff: this.staff,
      appointmentDate: this.appointmentDate,
      appointmentTime: this.appointmentTime,
      status: { $in: ['pending', 'confirmed'] }
    });
    
    if (conflictingBooking) {
      next(new Error('This time slot is already booked for the selected staff member'));
    }
  }
  next();
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema); 