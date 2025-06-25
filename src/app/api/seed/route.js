import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seedData';

// POST /api/seed - Seed the database with initial data
export async function POST() {
  try {
    // Only allow seeding in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { success: false, error: 'Database seeding is not allowed in production' },
        { status: 403 }
      );
    }

    const result = await seedDatabase();
    
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        servicesCount: result.services.length,
        staffCount: result.staff.length,
        bookingsCount: result.bookings.length
      }
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to seed database' },
      { status: 500 }
    );
  }
} 