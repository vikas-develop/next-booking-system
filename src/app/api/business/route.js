import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Business from '@/models/Business';

// GET /api/business - Get all businesses or get business by slug/apiKey
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const apiKey = searchParams.get('apiKey');
    
    if (slug) {
      const business = await Business.findOne({ slug, isActive: true });
      if (!business) {
        return NextResponse.json({ error: 'Business not found' }, { status: 404 });
      }
      return NextResponse.json(business);
    }
    
    if (apiKey) {
      const business = await Business.findOne({ apiKey, isActive: true });
      if (!business) {
        return NextResponse.json({ error: 'Business not found' }, { status: 404 });
      }
      return NextResponse.json(business);
    }
    
    // Get all businesses (for admin purposes)
    const businesses = await Business.find({ isActive: true })
      .select('-apiKey') // Don't expose API keys
      .sort({ createdAt: -1 });
    
    return NextResponse.json(businesses);
  } catch (error) {
    console.error('Business GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch businesses' },
      { status: 500 }
    );
  }
}

// POST /api/business - Create a new business
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'slug', 'contact.email', 'contact.phone'];
    for (const field of requiredFields) {
      const value = field.includes('.') 
        ? field.split('.').reduce((obj, key) => obj?.[key], body)
        : body[field];
      
      if (!value) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    // Check if slug already exists
    const existingBusiness = await Business.findOne({ slug: body.slug });
    if (existingBusiness) {
      return NextResponse.json(
        { error: 'Business slug already exists' },
        { status: 409 }
      );
    }
    
    // Set default widget settings if not provided
    const businessData = {
      ...body,
      widget: {
        branding: {
          primaryColor: '#8B5CF6',
          secondaryColor: '#EC4899',
          businessName: body.name,
          ...body.widget?.branding
        },
        settings: {
          timeSlotDuration: 30,
          advanceBookingDays: 30,
          bufferTime: 0,
          requireCustomerInfo: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            notes: false
          },
          autoConfirm: false,
          showPrices: true,
          showStaffSelection: true,
          ...body.widget?.settings
        },
        customization: {
          headerText: `Book your appointment with ${body.name}`,
          thankYouMessage: 'Thank you for booking with us! We look forward to serving you.',
          ...body.widget?.customization
        }
      },
      businessHours: {
        monday: { open: '9:00', close: '17:00', closed: false },
        tuesday: { open: '9:00', close: '17:00', closed: false },
        wednesday: { open: '9:00', close: '17:00', closed: false },
        thursday: { open: '9:00', close: '17:00', closed: false },
        friday: { open: '9:00', close: '17:00', closed: false },
        saturday: { open: '10:00', close: '16:00', closed: false },
        sunday: { open: '10:00', close: '16:00', closed: true },
        ...body.businessHours
      }
    };
    
    const business = new Business(businessData);
    await business.save();
    
    return NextResponse.json(business, { status: 201 });
  } catch (error) {
    console.error('Business POST error:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create business' },
      { status: 500 }
    );
  }
} 