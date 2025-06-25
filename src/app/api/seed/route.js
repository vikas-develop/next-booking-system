import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Business from '@/models/Business';
import Service from '@/models/Service';
import Staff from '@/models/Staff';
import Booking from '@/models/Booking';

// POST /api/seed - Seed the database with initial data
export async function POST() {
  try {
    await connectDB();

    // Clear existing data
    await Business.deleteMany({});
    await Service.deleteMany({});
    await Staff.deleteMany({});
    await Booking.deleteMany({});

    // Create sample business
    const business = new Business({
      name: 'Luxe Salon & Spa',
      slug: 'luxe-salon',
      description: 'Premium salon and spa services in the heart of the city',
      contact: {
        email: 'info@luxesalon.com',
        phone: '(555) 123-4567',
        address: {
          street: '123 Beauty Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        website: 'https://luxesalon.com'
      },
      businessHours: {
        monday: { open: '9:00', close: '18:00', closed: false },
        tuesday: { open: '9:00', close: '18:00', closed: false },
        wednesday: { open: '9:00', close: '18:00', closed: false },
        thursday: { open: '9:00', close: '19:00', closed: false },
        friday: { open: '9:00', close: '19:00', closed: false },
        saturday: { open: '8:00', close: '17:00', closed: false },
        sunday: { open: '10:00', close: '16:00', closed: false }
      },
      widget: {
        branding: {
          primaryColor: '#8B5CF6',
          secondaryColor: '#EC4899',
          businessName: 'Luxe Salon & Spa'
        },
        settings: {
          timeSlotDuration: 30,
          advanceBookingDays: 30,
          bufferTime: 15,
          requireCustomerInfo: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            notes: true
          },
          autoConfirm: false,
          showPrices: true,
          showStaffSelection: true
        },
        customization: {
          headerText: 'Book your luxurious salon experience',
          thankYouMessage: 'Thank you for choosing Luxe Salon & Spa! We can\'t wait to pamper you.',
          termsAndConditions: 'By booking, you agree to our terms and conditions.',
          privacyPolicy: 'Your privacy is important to us.'
        }
      },
      plan: 'premium',
      subscription: {
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        status: 'active'
      }
    });

    await business.save();
    console.log('Business created:', business.name);

    // Create services for the business
    const servicesData = [
      {
        business: business._id,
        name: 'Women\'s Haircut & Style',
        description: 'Professional haircut with wash, cut, style, and blowdry',
        category: 'Hair Services',
        duration: 60,
        price: { min: 65, max: 85 },
        isActive: true
      },
      {
        business: business._id,
        name: 'Men\'s Haircut',
        description: 'Classic men\'s haircut with wash and style',
        category: 'Hair Services',
        duration: 30,
        price: { min: 35, max: 45 },
        isActive: true
      },
      {
        business: business._id,
        name: 'Hair Color - Full',
        description: 'Complete hair coloring service with consultation',
        category: 'Hair Coloring',
        duration: 120,
        price: { min: 120, max: 200 },
        isActive: true
      },
      {
        business: business._id,
        name: 'Highlights',
        description: 'Professional highlighting service',
        category: 'Hair Coloring',
        duration: 90,
        price: { min: 95, max: 150 },
        isActive: true
      },
      {
        business: business._id,
        name: 'Deep Conditioning Treatment',
        description: 'Intensive hydrating treatment for damaged hair',
        category: 'Hair Treatments',
        duration: 45,
        price: { min: 45, max: 65 },
        isActive: true
      },
      {
        business: business._id,
        name: 'Keratin Treatment',
        description: 'Smoothing treatment for frizzy, unmanageable hair',
        category: 'Hair Treatments',
        duration: 180,
        price: { min: 250, max: 350 },
        isActive: true
      },
      {
        business: business._id,
        name: 'Bridal Hair & Makeup',
        description: 'Complete bridal styling package',
        category: 'Special Occasions',
        duration: 120,
        price: { min: 200, max: 300 },
        isActive: true
      },
      {
        business: business._id,
        name: 'Special Event Styling',
        description: 'Hair styling for special events and occasions',
        category: 'Special Occasions',
        duration: 90,
        price: { min: 85, max: 125 },
        isActive: true
      }
    ];

    const services = await Service.insertMany(servicesData);
    console.log(`${services.length} services created`);

    // Create staff for the business
    const staffData = [
      {
        business: business._id,
        name: 'Sarah Williams',
        title: 'Senior Hair Stylist',
        bio: 'Sarah has over 10 years of experience in hair cutting, coloring, and styling.',
        specialties: ['Hair Cutting', 'Color Correction', 'Balayage'],
        experience: 10,
        isActive: true,
        contact: {
          email: 'sarah@luxesalon.com',
          phone: '(555) 123-4568'
        },
        schedule: {
          monday: { available: true, start: '9:00', end: '17:00' },
          tuesday: { available: true, start: '9:00', end: '17:00' },
          wednesday: { available: true, start: '9:00', end: '17:00' },
          thursday: { available: true, start: '9:00', end: '18:00' },
          friday: { available: true, start: '9:00', end: '18:00' },
          saturday: { available: true, start: '8:00', end: '16:00' },
          sunday: { available: false }
        }
      },
      {
        business: business._id,
        name: 'Michael Chen',
        title: 'Master Colorist',
        bio: 'Michael specializes in advanced color techniques and has trained internationally.',
        specialties: ['Hair Coloring', 'Highlights', 'Creative Color'],
        experience: 8,
        isActive: true,
        contact: {
          email: 'michael@luxesalon.com',
          phone: '(555) 123-4569'
        },
        schedule: {
          monday: { available: true, start: '10:00', end: '18:00' },
          tuesday: { available: true, start: '10:00', end: '18:00' },
          wednesday: { available: false },
          thursday: { available: true, start: '10:00', end: '19:00' },
          friday: { available: true, start: '10:00', end: '19:00' },
          saturday: { available: true, start: '9:00', end: '17:00' },
          sunday: { available: true, start: '10:00', end: '16:00' }
        }
      },
      {
        business: business._id,
        name: 'Emma Johnson',
        title: 'Hair Treatment Specialist',
        bio: 'Emma focuses on hair health and restoration with specialized treatments.',
        specialties: ['Keratin Treatments', 'Hair Restoration', 'Deep Conditioning'],
        experience: 6,
        isActive: true,
        contact: {
          email: 'emma@luxesalon.com',
          phone: '(555) 123-4570'
        },
        schedule: {
          monday: { available: true, start: '9:00', end: '17:00' },
          tuesday: { available: true, start: '9:00', end: '17:00' },
          wednesday: { available: true, start: '9:00', end: '17:00' },
          thursday: { available: true, start: '9:00', end: '17:00' },
          friday: { available: true, start: '9:00', end: '17:00' },
          saturday: { available: false },
          sunday: { available: false }
        }
      },
      {
        business: business._id,
        name: 'David Rodriguez',
        title: 'Senior Stylist',
        bio: 'David excels in both men\'s and women\'s styling with a modern approach.',
        specialties: ['Men\'s Cuts', 'Women\'s Styling', 'Special Events'],
        experience: 7,
        isActive: true,
        contact: {
          email: 'david@luxesalon.com',
          phone: '(555) 123-4571'
        },
        schedule: {
          monday: { available: false },
          tuesday: { available: true, start: '10:00', end: '18:00' },
          wednesday: { available: true, start: '10:00', end: '18:00' },
          thursday: { available: true, start: '10:00', end: '18:00' },
          friday: { available: true, start: '10:00', end: '18:00' },
          saturday: { available: true, start: '8:00', end: '16:00' },
          sunday: { available: true, start: '10:00', end: '16:00' }
        }
      }
    ];

    const staff = await Staff.insertMany(staffData);
    console.log(`${staff.length} staff members created`);

    // Link services to staff (many-to-many relationship)
    for (const service of services) {
      // Assign appropriate staff to each service based on specialties
      const availableStaff = staff.filter(member => {
        const specialties = member.specialties.map(s => s.toLowerCase());
        const serviceName = service.name.toLowerCase();
        const serviceCategory = service.category.toLowerCase();
        
        return specialties.some(specialty => 
          serviceName.includes(specialty.replace(/[^a-z]/g, '')) ||
          serviceCategory.includes(specialty.replace(/[^a-z]/g, ''))
        );
      });
      
      if (availableStaff.length === 0) {
        // If no specific match, assign to all staff
        service.availableStaff = staff.map(s => s._id);
      } else {
        service.availableStaff = availableStaff.map(s => s._id);
      }
      
      await service.save();
    }

    // Create sample bookings
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    const bookingsData = [
      {
        business: business._id,
        customer: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phone: '(555) 987-6543'
        },
        service: services[0]._id, // Women's Haircut & Style
        staff: staff[0]._id, // Sarah Williams
        appointmentDate: tomorrow,
        appointmentTime: '10:00 AM',
        totalPrice: 75,
        duration: 60,
        status: 'confirmed',
        specialRequests: 'Please use sulfate-free products',
        createdBy: 'widget',
        source: {
          widget: true,
          referrer: 'https://example-salon-website.com'
        }
      },
      {
        business: business._id,
        customer: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '(555) 876-5432'
        },
        service: services[1]._id, // Men's Haircut
        staff: staff[3]._id, // David Rodriguez
        appointmentDate: tomorrow,
        appointmentTime: '2:00 PM',
        totalPrice: 40,
        duration: 30,
        status: 'pending',
        createdBy: 'widget',
        source: {
          widget: true,
          referrer: 'direct'
        }
      },
      {
        business: business._id,
        customer: {
          firstName: 'Emily',
          lastName: 'Davis',
          email: 'emily.davis@example.com',
          phone: '(555) 765-4321'
        },
        service: services[2]._id, // Hair Color - Full
        staff: staff[1]._id, // Michael Chen
        appointmentDate: dayAfterTomorrow,
        appointmentTime: '11:00 AM',
        totalPrice: 160,
        duration: 120,
        status: 'confirmed',
        specialRequests: 'Looking for a natural brunette color',
        createdBy: 'widget',
        source: {
          widget: true,
          referrer: 'https://beauty-blog.com'
        }
      }
    ];

    const bookings = await Booking.insertMany(bookingsData);
    console.log(`${bookings.length} bookings created`);

    // Update business stats
    business.stats.totalBookings = bookings.length;
    business.stats.monthlyBookings = bookings.length;
    business.stats.lastBookingDate = new Date();
    await business.save();

    return NextResponse.json({
      message: 'Database seeded successfully!',
      data: {
        business: {
          id: business._id,
          name: business.name,
          slug: business.slug,
          apiKey: business.apiKey
        },
        services: services.length,
        staff: staff.length,
        bookings: bookings.length
      }
    });

  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error.message },
      { status: 500 }
    );
  }
} 