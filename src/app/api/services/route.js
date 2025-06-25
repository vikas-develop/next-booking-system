import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

// GET /api/services - Get all services
export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({ isActive: true }).sort({ category: 1, name: 1 });
    return NextResponse.json({ success: true, data: services });
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