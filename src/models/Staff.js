import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
  // Multi-tenant support
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: [true, 'Business is required'],
  },
  
  name: {
    type: String,
    required: [true, 'Staff name is required'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Staff title/position is required'],
    trim: true,
  },
  experience: {
    type: Number,
    required: [true, 'Years of experience is required'],
    min: [0, 'Experience cannot be negative'],
  },
  specialties: [{
    type: String,
    trim: true,
  }],
  bio: {
    type: String,
    trim: true,
  },
  education: [{
    type: String,
  }],
  achievements: [{
    type: String,
  }],
  image: {
    type: String,
    trim: true,
  },
  contact: {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      trim: true,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  // Staff working schedule
  schedule: {
    monday: { 
      available: { type: Boolean, default: true },
      start: { type: String, default: '9:00' },
      end: { type: String, default: '17:00' },
      breaks: [{ start: String, end: String }]
    },
    tuesday: { 
      available: { type: Boolean, default: true },
      start: { type: String, default: '9:00' },
      end: { type: String, default: '17:00' },
      breaks: [{ start: String, end: String }]
    },
    wednesday: { 
      available: { type: Boolean, default: true },
      start: { type: String, default: '9:00' },
      end: { type: String, default: '17:00' },
      breaks: [{ start: String, end: String }]
    },
    thursday: { 
      available: { type: Boolean, default: true },
      start: { type: String, default: '9:00' },
      end: { type: String, default: '17:00' },
      breaks: [{ start: String, end: String }]
    },
    friday: { 
      available: { type: Boolean, default: true },
      start: { type: String, default: '9:00' },
      end: { type: String, default: '17:00' },
      breaks: [{ start: String, end: String }]
    },
    saturday: { 
      available: { type: Boolean, default: false },
      start: { type: String, default: '10:00' },
      end: { type: String, default: '16:00' },
      breaks: [{ start: String, end: String }]
    },
    sunday: { 
      available: { type: Boolean, default: false },
      start: { type: String, default: '10:00' },
      end: { type: String, default: '16:00' },
      breaks: [{ start: String, end: String }]
    },
  },
  // Services this staff member can perform
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  }],
  // Staff settings
  settings: {
    bookingBuffer: { type: Number, default: 15 }, // minutes between appointments
    allowBackToBackBookings: { type: Boolean, default: false },
    maxDailyAppointments: { type: Number, default: 12 },
  },
  profileImage: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
StaffSchema.index({ business: 1, isActive: 1 });
StaffSchema.index({ business: 1, specialties: 1 });
StaffSchema.index({ name: 'text', bio: 'text', specialties: 'text' });

export default mongoose.models.Staff || mongoose.model('Staff', StaffSchema); 