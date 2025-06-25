import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Business from '@/models/Business';

// GET /api/business/[id] - Get business by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const business = await Business.findById(params.id);
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }
    
    return NextResponse.json(business);
  } catch (error) {
    console.error('Business GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch business' },
      { status: 500 }
    );
  }
}

// PUT /api/business/[id] - Update business
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    const business = await Business.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }
    
    return NextResponse.json(business);
  } catch (error) {
    console.error('Business PUT error:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update business' },
      { status: 500 }
    );
  }
}

// DELETE /api/business/[id] - Delete business (soft delete)
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const business = await Business.findByIdAndUpdate(
      params.id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );
    
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Business deactivated successfully' });
  } catch (error) {
    console.error('Business DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete business' },
      { status: 500 }
    );
  }
} 