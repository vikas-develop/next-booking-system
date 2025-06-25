import mongoose from 'mongoose';

const BusinessSchema = new mongoose.Schema({
  // Basic Business Information
  name: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Business slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'],
  },
  description: {
    type: String,
    trim: true,
  },
  
  // Contact Information
  contact: {
    email: {
      type: String,
      required: [true, 'Business email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Business phone is required'],
      trim: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: 'USA' },
    },
    website: {
      type: String,
      trim: true,
    },
  },
  
  // Business Hours
  businessHours: {
    monday: { open: String, close: String, closed: { type: Boolean, default: false } },
    tuesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    wednesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    thursday: { open: String, close: String, closed: { type: Boolean, default: false } },
    friday: { open: String, close: String, closed: { type: Boolean, default: false } },
    saturday: { open: String, close: String, closed: { type: Boolean, default: false } },
    sunday: { open: String, close: String, closed: { type: Boolean, default: true } },
  },
  
  // Widget Customization
  widget: {
    branding: {
      primaryColor: { type: String, default: '#8B5CF6' },
      secondaryColor: { type: String, default: '#EC4899' },
      logo: String,
      businessName: String, // Override display name
    },
    settings: {
      timeSlotDuration: { type: Number, default: 30 }, // minutes
      advanceBookingDays: { type: Number, default: 30 },
      bufferTime: { type: Number, default: 0 }, // minutes between bookings
      requireCustomerInfo: {
        firstName: { type: Boolean, default: true },
        lastName: { type: Boolean, default: true },
        email: { type: Boolean, default: true },
        phone: { type: Boolean, default: true },
        notes: { type: Boolean, default: false },
      },
      autoConfirm: { type: Boolean, default: false },
      showPrices: { type: Boolean, default: true },
      showStaffSelection: { type: Boolean, default: true },
    },
    customization: {
      headerText: String,
      thankYouMessage: String,
      termsAndConditions: String,
      privacyPolicy: String,
    },
  },
  
  // Status and Configuration
  isActive: {
    type: Boolean,
    default: true,
  },
  plan: {
    type: String,
    enum: ['free', 'basic', 'premium', 'enterprise'],
    default: 'free',
  },
  subscription: {
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled', 'trial'],
      default: 'trial',
    },
  },
  
  // API Configuration
  apiKey: {
    type: String,
    unique: true,
    required: false,
  },
  
  // Stats
  stats: {
    totalBookings: { type: Number, default: 0 },
    monthlyBookings: { type: Number, default: 0 },
    lastBookingDate: Date,
  },
}, {
  timestamps: true,
});

// Indexes
BusinessSchema.index({ slug: 1 });
BusinessSchema.index({ apiKey: 1 });
BusinessSchema.index({ isActive: 1 });
BusinessSchema.index({ 'subscription.status': 1 });

// Ensure API key is set
BusinessSchema.pre('save', function(next) {
  if (!this.apiKey) {
    this.apiKey = 'bk_' + Math.random().toString(36).substr(2, 16) + Date.now().toString(36);
  }
  next();
});

// Virtual for full address
BusinessSchema.virtual('contact.fullAddress').get(function() {
  const addr = this.contact.address;
  if (!addr || !addr.street) return '';
  return `${addr.street}, ${addr.city || ''} ${addr.state || ''} ${addr.zipCode || ''}`.trim();
});

export default mongoose.models.Business || mongoose.model('Business', BusinessSchema); 