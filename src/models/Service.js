import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: ['Hair Services', 'Hair Coloring', 'Hair Treatments', 'Special Occasions'],
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
  },
  price: {
    min: {
      type: Number,
      required: [true, 'Minimum price is required'],
      min: 0,
    },
    max: {
      type: Number,
      required: [true, 'Maximum price is required'],
      min: 0,
    },
  },
  duration: {
    type: Number, // Duration in minutes
    required: [true, 'Service duration is required'],
    min: 15,
  },
  icon: {
    type: String,
    default: 'scissors',
  },
  isActive: {
    type: Boolean,
    default: true,
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

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema); 