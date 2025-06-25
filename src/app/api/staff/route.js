import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Staff from '@/models/Staff';

// GET /api/staff - Get all staff members
export async function GET() {
  try {
    await connectDB();
    const staff = await Staff.find({ isActive: true }).sort({ name: 1 });
    return NextResponse.json({ success: true, data: staff });
  } catch (error) {
    console.error('Error fetching staff:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch staff' },
      { status: 500 }
    );
  }
}

// POST /api/staff - Create a new staff member
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const staffMember = new Staff(body);
    await staffMember.save();
    
    return NextResponse.json(
      { success: true, data: staffMember },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating staff member:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create staff member' },
      { status: 400 }
    );
  }
} 