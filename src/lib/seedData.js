import connectDB from './mongodb.js';
import Service from '../models/Service.js';
import Staff from '../models/Staff.js';
import Booking from '../models/Booking.js';

// Seed Services
const seedServices = async () => {
  const services = [
    {
      name: 'Haircut & Styling',
      category: 'Hair Services',
      description: 'Professional cuts and styling for all hair types. Includes consultation, wash, cut, and styling.',
      price: { min: 45, max: 75 },
      duration: 45,
      icon: 'scissors'
    },
    {
      name: 'Full Color',
      category: 'Hair Coloring',
      description: 'Complete hair color transformation using premium color products.',
      price: { min: 85, max: 150 },
      duration: 180,
      icon: 'palette'
    },
    {
      name: 'Highlights',
      category: 'Hair Coloring',
      description: 'Add dimension with partial or full highlights using foil or balayage technique.',
      price: { min: 90, max: 180 },
      duration: 240,
      icon: 'palette'
    },
    {
      name: 'Deep Conditioning Treatment',
      category: 'Hair Treatments',
      description: 'Intensive moisture and repair treatment for damaged or dry hair.',
      price: { min: 65, max: 85 },
      duration: 60,
      icon: 'sparkles'
    },
    {
      name: 'Wash & Blowout',
      category: 'Hair Services',
      description: 'Cleansing shampoo treatment followed by professional blowout styling.',
      price: { min: 35, max: 45 },
      duration: 30,
      icon: 'sparkles'
    },
    {
      name: 'Bridal Styling',
      category: 'Special Occasions',
      description: 'Complete bridal styling package including consultation, trial, and wedding day service.',
      price: { min: 150, max: 300 },
      duration: 180,
      icon: 'sparkles'
    },
    {
      name: 'Root Touch-Up',
      category: 'Hair Coloring',
      description: 'Quick color refresh for grown-out roots.',
      price: { min: 65, max: 85 },
      duration: 90,
      icon: 'palette'
    },
    {
      name: 'Keratin Treatment',
      category: 'Hair Treatments',
      description: 'Smoothing treatment to reduce frizz and add shine for up to 4 months.',
      price: { min: 200, max: 350 },
      duration: 240,
      icon: 'sparkles'
    }
  ];

  try {
    await Service.deleteMany({});
    const createdServices = await Service.insertMany(services);
    console.log(`✅ ${createdServices.length} services seeded successfully`);
    return createdServices;
  } catch (error) {
    console.error('❌ Error seeding services:', error);
    throw error;
  }
};

// Seed Staff
const seedStaff = async () => {
  const staff = [
    {
      name: 'Sarah Johnson',
      title: 'Senior Color Specialist & Salon Manager',
      specialty: 'Color Specialist',
      experience: '8 years',
      specialties: ['Hair Coloring', 'Highlights', 'Color Correction', 'Balayage'],
      bio: 'Sarah is our lead color specialist with a passion for creating stunning color transformations. She specializes in natural-looking highlights and complex color corrections.',
      education: ['Aveda Institute Graduate', 'Advanced Color Theory Certification', 'Salon Management Diploma'],
      achievements: ['Top Colorist Award 2023', 'Customer Choice Award 2022'],
      availability: {
        monday: { start: '09:00', end: '18:00' },
        tuesday: { start: '09:00', end: '18:00' },
        wednesday: { start: '09:00', end: '18:00' },
        thursday: { start: '09:00', end: '18:00' },
        friday: { start: '09:00', end: '18:00' },
        saturday: { start: '08:00', end: '16:00' },
        sunday: { start: null, end: null }
      }
    },
    {
      name: 'Michael Chen',
      title: 'Master Stylist & Cut Specialist',
      specialty: 'Cut & Style Expert',
      experience: '6 years',
      specialties: ['Precision Cuts', 'Men\'s Grooming', 'Beard Styling', 'Modern Styles'],
      bio: 'Michael brings precision and creativity to every cut. His expertise in both classic and contemporary styles makes him a favorite among clients of all ages.',
      education: ['Paul Mitchell School Graduate', 'Advanced Cutting Techniques', 'Men\'s Grooming Specialist'],
      achievements: ['Best Men\'s Stylist 2023', 'Innovation in Styling Award'],
      availability: {
        monday: { start: null, end: null },
        tuesday: { start: '10:00', end: '19:00' },
        wednesday: { start: '10:00', end: '19:00' },
        thursday: { start: '10:00', end: '19:00' },
        friday: { start: '10:00', end: '19:00' },
        saturday: { start: '10:00', end: '19:00' },
        sunday: { start: null, end: null }
      }
    },
    {
      name: 'Emma Rodriguez',
      title: 'Bridal & Special Events Specialist',
      specialty: 'Bridal & Special Events',
      experience: '10 years',
      specialties: ['Bridal Hair', 'Updos', 'Special Event Styling', 'Hair Extensions'],
      bio: 'Emma has styled hair for over 200 weddings and countless special events. Her artistic vision and attention to detail ensure every client looks absolutely stunning.',
      education: ['Cosmetology Institute Graduate', 'Bridal Hair Specialist Certification', 'Hair Extension Master Class'],
      achievements: ['Bridal Stylist of the Year 2022', '5-Star Wedding Wire Rating'],
      availability: {
        monday: { start: null, end: null },
        tuesday: { start: null, end: null },
        wednesday: { start: '08:00', end: '18:00' },
        thursday: { start: '08:00', end: '18:00' },
        friday: { start: '08:00', end: '18:00' },
        saturday: { start: '08:00', end: '18:00' },
        sunday: { start: '08:00', end: '18:00' }
      }
    },
    {
      name: 'David Kim',
      title: 'Stylist & Treatment Specialist',
      specialty: 'Treatment Specialist',
      experience: '5 years',
      specialties: ['Hair Treatments', 'Keratin Treatments', 'Scalp Care', 'Hair Repair'],
      bio: 'David focuses on hair health and restoration. His expertise in various treatments helps clients achieve not just beautiful hair, but healthy hair.',
      education: ['Beauty School Graduate', 'Keratin Treatment Certification', 'Scalp Health Specialist'],
      achievements: ['Treatment Specialist Award', 'Client Satisfaction Excellence'],
      availability: {
        monday: { start: '11:00', end: '20:00' },
        tuesday: { start: '11:00', end: '20:00' },
        wednesday: { start: '11:00', end: '20:00' },
        thursday: { start: '11:00', end: '20:00' },
        friday: { start: '11:00', end: '20:00' },
        saturday: { start: '09:00', end: '17:00' },
        sunday: { start: null, end: null }
      }
    }
  ];

  try {
    await Staff.deleteMany({});
    const createdStaff = await Staff.insertMany(staff);
    console.log(`✅ ${createdStaff.length} staff members seeded successfully`);
    return createdStaff;
  } catch (error) {
    console.error('❌ Error seeding staff:', error);
    throw error;
  }
};

// Seed Sample Bookings
const seedBookings = async (services, staff) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const bookings = [
    {
      customer: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@email.com',
        phone: '(555) 123-4567'
      },
      service: services.find(s => s.name === 'Haircut & Styling')._id,
      staff: staff.find(s => s.name === 'Sarah Johnson')._id,
      appointmentDate: today,
      appointmentTime: '10:00 AM',
      status: 'confirmed',
      notes: 'First time client',
      totalPrice: 65,
      duration: 45
    },
    {
      customer: {
        firstName: 'Mike',
        lastName: 'Chen',
        email: 'mike.chen@email.com',
        phone: '(555) 987-6543'
      },
      service: services.find(s => s.name === 'Full Color')._id,
      staff: staff.find(s => s.name === 'Emma Rodriguez')._id,
      appointmentDate: today,
      appointmentTime: '2:00 PM',
      status: 'pending',
      notes: 'Wants to go darker',
      totalPrice: 120,
      duration: 180
    },
    {
      customer: {
        firstName: 'Sarah',
        lastName: 'Davis',
        email: 'sarah.davis@email.com',
        phone: '(555) 456-7890'
      },
      service: services.find(s => s.name === 'Bridal Styling')._id,
      staff: staff.find(s => s.name === 'Emma Rodriguez')._id,
      appointmentDate: tomorrow,
      appointmentTime: '9:00 AM',
      status: 'confirmed',
      notes: 'Wedding day - very important!',
      totalPrice: 250,
      duration: 180
    }
  ];

  try {
    await Booking.deleteMany({});
    const createdBookings = await Booking.insertMany(bookings);
    console.log(`✅ ${createdBookings.length} bookings seeded successfully`);
    return createdBookings;
  } catch (error) {
    console.error('❌ Error seeding bookings:', error);
    throw error;
  }
};

// Main seed function
export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    await connectDB();
    console.log('✅ Connected to MongoDB');
    
    const services = await seedServices();
    const staff = await seedStaff();
    const bookings = await seedBookings(services, staff);
    
    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Summary:
    - ${services.length} services
    - ${staff.length} staff members
    - ${bookings.length} sample bookings`);
    
    return { services, staff, bookings };
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
};

// Export individual functions for flexibility
export { seedServices, seedStaff, seedBookings }; 