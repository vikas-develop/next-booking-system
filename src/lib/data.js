// Sample data for the salon booking system

export const services = [
  {
    id: 'haircut',
    name: 'Haircut & Styling',
    category: 'Hair Services',
    description: 'Professional cuts and styling for all hair types. Includes consultation, wash, cut, and styling.',
    price: { min: 45, max: 75 },
    duration: 45,
    icon: 'scissors'
  },
  {
    id: 'color',
    name: 'Full Color',
    category: 'Hair Coloring',
    description: 'Complete hair color transformation using premium color products.',
    price: { min: 85, max: 150 },
    duration: 180,
    icon: 'palette'
  },
  {
    id: 'highlights',
    name: 'Highlights',
    category: 'Hair Coloring',
    description: 'Add dimension with partial or full highlights using foil or balayage technique.',
    price: { min: 90, max: 180 },
    duration: 240,
    icon: 'palette'
  },
  {
    id: 'treatment',
    name: 'Deep Conditioning Treatment',
    category: 'Hair Treatments',
    description: 'Intensive moisture and repair treatment for damaged or dry hair.',
    price: { min: 65, max: 85 },
    duration: 60,
    icon: 'sparkles'
  },
  {
    id: 'blowout',
    name: 'Wash & Blowout',
    category: 'Hair Services',
    description: 'Cleansing shampoo treatment followed by professional blowout styling.',
    price: { min: 35, max: 45 },
    duration: 30,
    icon: 'sparkles'
  },
  {
    id: 'bridal',
    name: 'Bridal Styling',
    category: 'Special Occasions',
    description: 'Complete bridal styling package including consultation, trial, and wedding day service.',
    price: { min: 150, max: 300 },
    duration: 180,
    icon: 'sparkles'
  }
];

export const staff = [
  {
    id: 'sarah',
    name: 'Sarah Johnson',
    title: 'Senior Color Specialist & Salon Manager',
    specialty: 'Color Specialist',
    experience: '8 years',
    specialties: ['Hair Coloring', 'Highlights', 'Color Correction', 'Balayage'],
    bio: 'Sarah is our lead color specialist with a passion for creating stunning color transformations.',
    availability: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '18:00' },
      saturday: { start: '08:00', end: '16:00' },
      sunday: null
    }
  },
  {
    id: 'michael',
    name: 'Michael Chen',
    title: 'Master Stylist & Cut Specialist',
    specialty: 'Cut & Style Expert',
    experience: '6 years',
    specialties: ['Precision Cuts', 'Men\'s Grooming', 'Beard Styling', 'Modern Styles'],
    bio: 'Michael brings precision and creativity to every cut.',
    availability: {
      monday: null,
      tuesday: { start: '10:00', end: '19:00' },
      wednesday: { start: '10:00', end: '19:00' },
      thursday: { start: '10:00', end: '19:00' },
      friday: { start: '10:00', end: '19:00' },
      saturday: { start: '10:00', end: '19:00' },
      sunday: null
    }
  },
  {
    id: 'emma',
    name: 'Emma Rodriguez',
    title: 'Bridal & Special Events Specialist',
    specialty: 'Bridal & Special Events',
    experience: '10 years',
    specialties: ['Bridal Hair', 'Updos', 'Special Event Styling', 'Hair Extensions'],
    bio: 'Emma has styled hair for over 200 weddings and countless special events.',
    availability: {
      monday: null,
      tuesday: null,
      wednesday: { start: '08:00', end: '18:00' },
      thursday: { start: '08:00', end: '18:00' },
      friday: { start: '08:00', end: '18:00' },
      saturday: { start: '08:00', end: '18:00' },
      sunday: { start: '08:00', end: '18:00' }
    }
  },
  {
    id: 'david',
    name: 'David Kim',
    title: 'Stylist & Treatment Specialist',
    specialty: 'Men\'s Grooming',
    experience: '5 years',
    specialties: ['Hair Treatments', 'Keratin Treatments', 'Scalp Care', 'Hair Repair'],
    bio: 'David focuses on hair health and restoration.',
    availability: {
      monday: { start: '11:00', end: '20:00' },
      tuesday: { start: '11:00', end: '20:00' },
      wednesday: { start: '11:00', end: '20:00' },
      thursday: { start: '11:00', end: '20:00' },
      friday: { start: '11:00', end: '20:00' },
      saturday: { start: '09:00', end: '17:00' },
      sunday: null
    }
  }
];

export const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
];

export const sampleBookings = [
  {
    id: 1,
    customer: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@email.com',
      phone: '(555) 123-4567'
    },
    service: 'haircut',
    stylist: 'sarah',
    date: '2024-12-20',
    time: '10:00 AM',
    status: 'confirmed',
    notes: 'First time client',
    createdAt: '2024-12-15T10:00:00Z'
  },
  {
    id: 2,
    customer: {
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike.chen@email.com',
      phone: '(555) 987-6543'
    },
    service: 'color',
    stylist: 'emma',
    date: '2024-12-20',
    time: '2:00 PM',
    status: 'pending',
    notes: 'Wants to go darker',
    createdAt: '2024-12-16T14:30:00Z'
  },
  {
    id: 3,
    customer: {
      firstName: 'Sarah',
      lastName: 'Davis',
      email: 'sarah.davis@email.com',
      phone: '(555) 456-7890'
    },
    service: 'bridal',
    stylist: 'emma',
    date: '2024-12-21',
    time: '9:00 AM',
    status: 'confirmed',
    notes: 'Wedding day - very important!',
    createdAt: '2024-12-10T09:15:00Z'
  }
];

export const businessHours = {
  monday: { start: '9:00', end: '20:00' },
  tuesday: { start: '9:00', end: '20:00' },
  wednesday: { start: '9:00', end: '20:00' },
  thursday: { start: '9:00', end: '20:00' },
  friday: { start: '9:00', end: '20:00' },
  saturday: { start: '8:00', end: '18:00' },
  sunday: { start: '10:00', end: '17:00' }
};

// Utility functions
export const getServiceById = (id) => services.find(service => service.id === id);
export const getStaffById = (id) => staff.find(member => member.id === id);
export const getServicesByCategory = (category) => services.filter(service => service.category === category);
export const getAvailableStaffForService = (serviceId) => {
  const service = getServiceById(serviceId);
  if (!service) return [];
  
  // For now, return all staff - you could implement logic to filter by specialty
  return staff;
};

export const formatPrice = (priceObj) => {
  if (priceObj.min === priceObj.max) {
    return `$${priceObj.min}`;
  }
  return `$${priceObj.min} - $${priceObj.max}`;
};

export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  return `${hours}h ${remainingMinutes}min`;
}; 