'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { format, addDays, isWeekend, isSameDay } from 'date-fns';

export default async function BookingWidget({ params }) {
  const { businessSlug } = await params;
  
  return <BookingWidgetClient businessSlug={businessSlug} />;
}

function BookingWidgetClient({ businessSlug }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalSteps = 4;

  // Fetch business data and configuration
  useEffect(() => {
    fetchBusinessData();
  }, [businessSlug]);

  const fetchBusinessData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch business data
      const businessResponse = await fetch(`/api/business?slug=${businessSlug}`);
      if (!businessResponse.ok) {
        throw new Error('Business not found');
      }
      const businessData = await businessResponse.json();
      setBusiness(businessData);
      
      // Fetch services for this business
      const servicesResponse = await fetch(`/api/services?business=${businessData._id}`);
      if (servicesResponse.ok) {
        const servicesData = await servicesResponse.json();
        setServices(servicesData);
      }
      
      // Fetch staff for this business
      const staffResponse = await fetch(`/api/staff?business=${businessData._id}`);
      if (staffResponse.ok) {
        const staffData = await staffResponse.json();
        setStaff(staffData);
      }
      
    } catch (error) {
      console.error('Error fetching business data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Generate available dates based on business settings
  const generateAvailableDates = () => {
    if (!business) return [];
    
    const dates = [];
    let currentDate = new Date();
    const maxDays = business.widget?.settings?.advanceBookingDays || 30;
    
    while (dates.length < 10 && dates.length < maxDays) {
      if (!isWeekend(currentDate)) {
        dates.push(new Date(currentDate));
      }
      currentDate = addDays(currentDate, 1);
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  // Generate time slots based on business settings
  const generateTimeSlots = () => {
    if (!business) return [];
    
    const slots = [];
    const duration = business.widget?.settings?.timeSlotDuration || 30;
    
    // Default time slots - can be customized based on business hours
    const startHour = 9;
    const endHour = 18;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += duration) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString([], { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        });
        slots.push(displayTime);
      }
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const formatPrice = (price) => {
    if (!price) return 'Price not available';
    if (price.min === price.max) {
      return `$${price.min}`;
    }
    return `$${price.min} - $${price.max}`;
  };

  const formatDuration = (minutes) => {
    if (!minutes) return '';
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${remainingMinutes}min`;
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookingSubmit = async () => {
    if (!selectedService || !selectedStaff || !selectedDate || !selectedTime) {
      alert('Please complete all booking steps.');
      return;
    }

    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
      alert('Please fill in all required customer information.');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        business: business._id,
        customer: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone
        },
        service: selectedService._id,
        staff: selectedStaff._id,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        specialRequests: customerInfo.specialRequests || '',
        totalPrice: selectedService.price.min, // Use minimum price for now
        duration: selectedService.duration,
        status: business.widget?.settings?.autoConfirm ? 'confirmed' : 'pending',
        createdBy: 'widget',
        source: {
          widget: true,
          referrer: document.referrer || 'direct',
          userAgent: navigator.userAgent
        }
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Booking submission failed');
      }

      const result = await response.json();
      setBookingReference(result.bookingReference);
      setBookingComplete(true);
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('There was an error submitting your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Apply custom branding
  const primaryColor = business?.widget?.branding?.primaryColor || '#8B5CF6';
  const secondaryColor = business?.widget?.branding?.secondaryColor || '#EC4899';
  const businessName = business?.widget?.branding?.businessName || business?.name;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: primaryColor }} />
          <p className="text-gray-600">Loading booking widget...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Widget Not Available</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Success state
  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-4">
              {business.widget?.customization?.thankYouMessage || 
                `Thank you for booking with ${businessName}! We look forward to serving you.`}
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Booking Reference: <strong>{bookingReference}</strong>
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
              <div className="space-y-2 text-left">
                <p><strong>Service:</strong> {selectedService?.name}</p>
                <p><strong>Staff:</strong> {selectedStaff?.name}</p>
                <p><strong>Date:</strong> {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : ''}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Duration:</strong> {formatDuration(selectedService?.duration)}</p>
                {business.widget?.settings?.showPrices && (
                  <p><strong>Price:</strong> {formatPrice(selectedService?.price)}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.parent.postMessage({ type: 'booking-complete', reference: bookingReference }, '*')}
                className="px-8 py-3 rounded-lg font-semibold transition-colors text-white"
                style={{ backgroundColor: primaryColor }}
              >
                Close
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="border px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Book Another Service
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {business.widget?.customization?.headerText || `Book with ${businessName}`}
          </h1>
          <p className="text-gray-600">
            {business.description || 'Select your service and preferred time'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  step <= currentStep
                    ? 'text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
                style={{
                  backgroundColor: step <= currentStep ? primaryColor : undefined
                }}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(currentStep / totalSteps) * 100}%`,
                backgroundColor: primaryColor
              }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Service</h2>
                <p className="text-gray-600">Select the service you'd like to book</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service._id}
                    onClick={() => setSelectedService(service)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedService?._id === service._id
                        ? 'bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    style={{
                      borderColor: selectedService?._id === service._id ? primaryColor : undefined
                    }}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{formatDuration(service.duration)}</span>
                      {business.widget?.settings?.showPrices && (
                        <span className="font-semibold" style={{ color: primaryColor }}>
                          {formatPrice(service.price)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Staff Selection */}
          {currentStep === 2 && business.widget?.settings?.showStaffSelection && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Stylist</h2>
                <p className="text-gray-600">Select your preferred staff member</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staff.map((member) => (
                  <div
                    key={member._id}
                    onClick={() => setSelectedStaff(member)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedStaff?._id === member._id
                        ? 'bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    style={{
                      borderColor: selectedStaff?._id === member._id ? primaryColor : undefined
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.title}</p>
                        <p className="text-xs text-gray-500">{member.experience} years experience</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Date & Time Selection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Date & Time</h2>
                <p className="text-gray-600">Choose your preferred appointment slot</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Available Dates</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {availableDates.map((date) => (
                      <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 rounded-lg border text-sm transition-all ${
                          selectedDate && isSameDay(selectedDate, date)
                            ? 'text-white'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                        style={{
                          backgroundColor: selectedDate && isSameDay(selectedDate, date) ? primaryColor : undefined
                        }}
                      >
                        <div className="font-semibold">{format(date, 'EEE')}</div>
                        <div>{format(date, 'MMM d')}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Available Times</h3>
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg border text-sm transition-all ${
                          selectedTime === time
                            ? 'text-white'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                        style={{
                          backgroundColor: selectedTime === time ? primaryColor : undefined
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Customer Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h2>
                <p className="text-gray-600">Please provide your contact details</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.firstName}
                    onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.lastName}
                    onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              {business.widget?.settings?.requireCustomerInfo?.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={customerInfo.specialRequests}
                    onChange={(e) => setCustomerInfo({...customerInfo, specialRequests: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows="3"
                    placeholder="Any special requests or notes..."
                  />
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !selectedService) ||
                  (currentStep === 2 && business.widget?.settings?.showStaffSelection && !selectedStaff) ||
                  (currentStep === 3 && (!selectedDate || !selectedTime))
                }
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors text-white ${
                  (currentStep === 1 && !selectedService) ||
                  (currentStep === 2 && business.widget?.settings?.showStaffSelection && !selectedStaff) ||
                  (currentStep === 3 && (!selectedDate || !selectedTime))
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'hover:opacity-90'
                }`}
                style={{
                  backgroundColor: (currentStep === 1 && !selectedService) ||
                    (currentStep === 2 && business.widget?.settings?.showStaffSelection && !selectedStaff) ||
                    (currentStep === 3 && (!selectedDate || !selectedTime)) ? undefined : primaryColor
                }}
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleBookingSubmit}
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors text-white"
                style={{ backgroundColor: primaryColor }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Booking...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete Booking</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 