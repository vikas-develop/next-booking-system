import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Staff name is required'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Staff title is required'],
    trim: true,
  },
  specialty: {
    type: String,
    required: [true, 'Staff specialty is required'],
    trim: true,
  },
  experience: {
    type: String,
    required: [true, 'Experience is required'],
  },
  specialties: [{
    type: String,
    required: true,
  }],
  bio: {
    type: String,
    required: [true, 'Bio is required'],
  },
  education: [{
    type: String,
  }],
  achievements: [{
    type: String,
  }],
  availability: {
    monday: {
      start: { type: String, default: null },
      end: { type: String, default: null },
    },
    tuesday: {
      start: { type: String, default: null },
      end: { type: String, default: null },
    },
    wednesday: {
      start: { type: String, default: null },
      end: { type: String, default: null },
    },
    thursday: {
      start: { type: String, default: null },
      end: { type: String, default: null },
    },
    friday: {
      start: { type: String, default: null },
      end: { type: String, default: null },
    },
    saturday: {
      start: { type: String, default: null },
      end: { type: String, default: null },
    },
    sunday: {
      start: { type: String, default: null },
      end: { type: String, default: null },
    },
  },
  profileImage: {
    type: String,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Staff || mongoose.model('Staff', StaffSchema); 