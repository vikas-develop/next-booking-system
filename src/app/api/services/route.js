import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

// GET /api/services - Get all services (with business filter support)
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('business');
    
    let query = { isActive: true };
    if (businessId) {
      query.business = businessId;
    }
    
    const services = await Service.find(query)
      .populate('business', 'name slug')
      .sort({ category: 1, name: 1 });
    
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST /api/services - Create a new service
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const service = new Service(body);
    await service.save();
    
    return NextResponse.json(
      { success: true, data: service },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create service' },
      { status: 400 }
    );
  }
} 