import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

// GET /api/bookings/[id] - Get a specific booking
export async function GET(request, { params }) {
  try {
    await connectDB();
    const booking = await Booking.findById(params.id)
      .populate('service', 'name category price duration')
      .populate('staff', 'name title specialty');
    
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

// PUT /api/bookings/[id] - Update a booking
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    
    const booking = await Booking.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    ).populate(['service', 'staff']);
    
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update booking' },
      { status: 400 }
    );
  }
}

// PATCH /api/bookings/[id] - Update booking status
export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { status } = await request.json();
    
    const booking = await Booking.findByIdAndUpdate(
      params.id,
      { status },
      { new: true, runValidators: true }
    ).populate(['service', 'staff']);
    
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update booking status' },
      { status: 400 }
    );
  }
}

// DELETE /api/bookings/[id] - Delete a booking
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const booking = await Booking.findByIdAndDelete(params.id);
    
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
} 