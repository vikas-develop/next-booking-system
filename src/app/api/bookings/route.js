import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Service from '@/models/Service';
import Staff from '@/models/Staff';

// GET /api/bookings - Get all bookings with optional filters
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    const staffId = searchParams.get('staffId');
    
    let query = {};
    
    if (status) query.status = status;
    if (date) query.appointmentDate = new Date(date);
    if (staffId) query.staff = staffId;
    
    const bookings = await Booking.find(query)
      .populate('service', 'name category price duration')
      .populate('staff', 'name title specialty')
      .sort({ appointmentDate: 1, appointmentTime: 1 });
    
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validate service and staff exist
    const service = await Service.findById(body.service);
    const staff = await Staff.findById(body.staff);
    
    if (!service || !staff) {
      return NextResponse.json(
        { success: false, error: 'Invalid service or staff selection' },
        { status: 400 }
      );
    }
    
    // Set price and duration from service
    body.totalPrice = body.totalPrice || service.price.min;
    body.duration = service.duration;
    
    const booking = new Booking(body);
    await booking.save();
    
    // Populate the booking with service and staff details
    await booking.populate(['service', 'staff']);
    
    return NextResponse.json(
      { success: true, data: booking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create booking' },
      { status: 400 }
    );
  }
} 