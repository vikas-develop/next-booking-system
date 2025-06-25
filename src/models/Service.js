import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  // Multi-tenant support
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: [true, 'Business is required'],
  },
  
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    trim: true,
  },
  duration: {
    type: Number, // Duration in minutes
    required: [true, 'Service duration is required'],
    min: [15, 'Service duration must be at least 15 minutes'],
  },
  price: {
    min: {
      type: Number,
      required: [true, 'Minimum price is required'],
      min: [0, 'Price cannot be negative'],
    },
    max: {
      type: Number,
      required: [true, 'Maximum price is required'],
      min: [0, 'Price cannot be negative'],
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    trim: true,
  },
  // Staff who can perform this service
  availableStaff: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
  }],
  // Service-specific settings
  settings: {
    bufferTime: { type: Number, default: 0 }, // minutes
    requiresConsultation: { type: Boolean, default: false },
    maxAdvanceBooking: { type: Number, default: 30 }, // days
  },
}, {
  timestamps: true,
});

// Validate that max price is greater than or equal to min price
ServiceSchema.pre('save', function(next) {
  if (this.price.max < this.price.min) {
    next(new Error('Maximum price must be greater than or equal to minimum price'));
  }
  next();
});

// Index for efficient queries
ServiceSchema.index({ business: 1, category: 1 });
ServiceSchema.index({ business: 1, isActive: 1 });
ServiceSchema.index({ name: 'text', description: 'text' });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema); 