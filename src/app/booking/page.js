'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';

export default function Booking() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedStylist, setSelectedStylist] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const services = [
    { id: 'haircut', name: 'Haircut & Styling', price: '$45-75', duration: '45 min' },
    { id: 'color', name: 'Hair Coloring', price: '$85-150', duration: '2-3 hours' },
    { id: 'highlights', name: 'Highlights', price: '$90-180', duration: '2-4 hours' },
    { id: 'treatment', name: 'Hair Treatment', price: '$65-85', duration: '1 hour' },
    { id: 'blowout', name: 'Wash & Blowout', price: '$35-45', duration: '30 min' },
    { id: 'bridal', name: 'Bridal Styling', price: '$150-300', duration: '2-3 hours' }
  ];

  const stylists = [
    { id: 'sarah', name: 'Sarah Johnson', specialty: 'Color Specialist', experience: '8 years' },
    { id: 'michael', name: 'Michael Chen', specialty: 'Cut & Style Expert', experience: '6 years' },
    { id: 'emma', name: 'Emma Rodriguez', specialty: 'Bridal & Special Events', experience: '10 years' },
    { id: 'david', name: 'David Kim', specialty: 'Men\'s Grooming', experience: '5 years' }
  ];

  // Generate next 14 days for booking
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = addDays(today, i);
      dates.push({
        date: format(date, 'yyyy-MM-dd'),
        display: format(date, 'MMM d, yyyy'),
        day: format(date, 'EEEE')
      });
    }
    return dates;
  };

  const availableDates = generateDates();

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the booking data to your backend
    alert('Booking submitted! We will contact you shortly to confirm your appointment.');
  };

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Appointment</h1>
          <p className="text-xl text-gray-600">
            Follow the steps below to schedule your perfect salon experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Select Service */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">1</div>
              Select Service
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedService === service.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{service.duration}</p>
                    </div>
                    <span className="text-purple-600 font-semibold">{service.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Select Stylist */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">2</div>
              Choose Your Stylist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stylists.map((stylist) => (
                <div
                  key={stylist.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedStylist === stylist.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setSelectedStylist(stylist.id)}
                >
                  <div className="flex items-center">
                    <div className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{stylist.name}</h3>
                      <p className="text-sm text-gray-600">{stylist.specialty}</p>
                      <p className="text-xs text-gray-500">{stylist.experience} experience</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Select Date & Time */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">3</div>
              Pick Date & Time
            </h2>
            
            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                Select Date
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {availableDates.map((dateObj) => (
                  <button
                    key={dateObj.date}
                    type="button"
                    className={`p-3 rounded-lg text-sm transition-all ${
                      selectedDate === dateObj.date
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                    }`}
                    onClick={() => setSelectedDate(dateObj.date)}
                  >
                    <div className="font-medium">{dateObj.day}</div>
                    <div className="text-xs opacity-80">{dateObj.display.split(',')[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-purple-600" />
                  Select Time
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`p-2 rounded-lg text-sm transition-all ${
                        selectedTime === time
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Customer Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">4</div>
              Your Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={customerInfo.firstName}
                  onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={customerInfo.lastName}
                  onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={customerInfo.email}
                  onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={customerInfo.phone}
                  onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Special Requests or Notes
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Any special requests, allergies, or additional information..."
                value={customerInfo.notes}
                onChange={(e) => handleCustomerInfoChange('notes', e.target.value)}
              />
            </div>
          </div>

          {/* Booking Summary & Submit */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Booking Summary</h2>
            
            {selectedService && selectedStylist && selectedDate && selectedTime && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Service</p>
                    <p className="font-medium">
                      {services.find(s => s.id === selectedService)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Stylist</p>
                    <p className="font-medium">
                      {stylists.find(s => s.id === selectedStylist)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">
                      {availableDates.find(d => d.date === selectedDate)?.display}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-medium">{selectedTime}</p>
                  </div>
                </div>
              </div>
            )}
            
            <button
              type="submit"
              disabled={!selectedService || !selectedStylist || !selectedDate || !selectedTime || !customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone}
              className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Book Appointment
            </button>
            
            <p className="text-sm text-gray-600 mt-4 text-center">
              We'll send you a confirmation email and may call to confirm your appointment details.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 