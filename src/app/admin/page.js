'use client';

import { useState } from 'react';
import { Calendar, Users, DollarSign, Star, CheckCircle, Clock, Phone, Mail, Edit, Trash2, X } from 'lucide-react';
import { format } from 'date-fns';
import { useBookings, useServices, useStaff, useUpdateBooking, useDeleteBooking } from '@/hooks/useApi';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const { data: bookings, loading: bookingsLoading, refetch: refetchBookings } = useBookings();
  const { data: services, loading: servicesLoading } = useServices();
  const { data: staff, loading: staffLoading } = useStaff();
  const { updateBooking } = useUpdateBooking();
  const { deleteBooking } = useDeleteBooking();

  // Calculate dashboard metrics
  const today = new Date();
  const todayBookings = bookings?.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate.toDateString() === today.toDateString();
  }) || [];

  const thisWeekRevenue = bookings?.reduce((total, booking) => {
    const bookingDate = new Date(booking.date);
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    if (bookingDate >= weekStart && booking.status === 'confirmed') {
      const service = services?.find(s => s._id === booking.service);
      return total + (service?.price?.min || 0);
    }
    return total;
  }, 0) || 0;

  const totalCustomers = bookings?.reduce((customers, booking) => {
    const email = booking.customer.email;
    if (!customers.includes(email)) {
      customers.push(email);
    }
    return customers;
  }, []).length || 0;

  const averageRating = 4.8; // This would come from reviews/ratings if implemented

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    if (price.min === price.max) {
      return `$${price.min}`;
    }
    return `$${price.min} - $${price.max}`;
  };

  const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
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

  const getServiceName = (serviceId) => {
    const service = services?.find(s => s._id === serviceId);
    return service?.name || 'Unknown Service';
  };

  const getStaffName = (staffId) => {
    const staffMember = staff?.find(s => s._id === staffId);
    return staffMember?.name || 'Unknown Staff';
  };

  const formatSafeDate = (dateValue, formatString = 'MMM d, yyyy') => {
    try {
      if (!dateValue) return 'Date not available';
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return 'Invalid date';
      return format(date, formatString);
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Date error';
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBooking(bookingId, { status: newStatus });
      refetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status');
    }
  };

  const handleDeleteBooking = async () => {
    if (!bookingToDelete) return;

    try {
      await deleteBooking(bookingToDelete._id);
      refetchBookings();
      setShowDeleteModal(false);
      setBookingToDelete(null);
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking');
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Bookings</p>
              <p className="text-3xl font-bold text-purple-600">{todayBookings.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Week Revenue</p>
              <p className="text-3xl font-bold text-green-600">${thisWeekRevenue}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-3xl font-bold text-blue-600">{totalCustomers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-3xl font-bold text-yellow-600">{averageRating}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Schedule</h2>
        {bookingsLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center p-4 border rounded-lg animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="bg-gray-200 h-4 w-32 rounded mb-2"></div>
                  <div className="bg-gray-200 h-3 w-24 rounded"></div>
                </div>
                <div className="bg-gray-200 h-6 w-20 rounded"></div>
              </div>
            ))}
          </div>
        ) : todayBookings.length === 0 ? (
          <p className="text-gray-500">No bookings for today</p>
        ) : (
          <div className="space-y-4">
            {todayBookings.map((booking) => (
              <div key={booking._id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {booking.customer.firstName} {booking.customer.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {getServiceName(booking.service)} with {getStaffName(booking.staff)}
                    </p>
                    <p className="text-sm text-gray-500">{booking.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">All Bookings</h2>
      {bookingsLoading ? (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ) : bookings && bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Service</th>
                <th className="text-left py-3 px-4">Staff</th>
                <th className="text-left py-3 px-4">Date & Time</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{booking.customer.firstName} {booking.customer.lastName}</p>
                      <p className="text-sm text-gray-600">{booking.customer.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {getServiceName(booking.service)}
                  </td>
                  <td className="py-3 px-4">
                    {getStaffName(booking.staff)}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p>{formatSafeDate(booking.date)}</p>
                      <p className="text-sm text-gray-600">{booking.time}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Details"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setBookingToDelete(booking);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No bookings found</p>
      )}
    </div>
  );

  const renderCustomers = () => {
    const uniqueCustomers = bookings?.reduce((customers, booking) => {
      const email = booking.customer.email;
      if (!customers.find(c => c.email === email)) {
        customers.push({
          ...booking.customer,
          bookingsCount: bookings.filter(b => b.customer.email === email).length,
          lastBooking: booking.date
        });
      }
      return customers;
    }, []) || [];

    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Customers</h2>
        {bookingsLoading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ) : uniqueCustomers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Phone</th>
                  <th className="text-left py-3 px-4">Bookings</th>
                  <th className="text-left py-3 px-4">Last Visit</th>
                </tr>
              </thead>
              <tbody>
                {uniqueCustomers.map((customer, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">
                      {customer.firstName} {customer.lastName}
                    </td>
                    <td className="py-3 px-4">{customer.email}</td>
                    <td className="py-3 px-4">{customer.phone}</td>
                    <td className="py-3 px-4">{customer.bookingsCount}</td>
                    <td className="py-3 px-4">
                      {formatSafeDate(customer.lastBooking)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No customers found</p>
        )}
      </div>
    );
  };

  const renderReports = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Reports & Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Popular Services</h3>
          {services?.slice(0, 5).map((service, index) => (
            <div key={service._id} className="flex justify-between items-center py-2">
              <span className="text-sm">{service.name}</span>
              <span className="text-sm text-gray-600">
                {bookings?.filter(b => b.service === service._id).length || 0} bookings
              </span>
            </div>
          ))}
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Top Stylists</h3>
          {staff?.slice(0, 5).map((member, index) => (
            <div key={member._id} className="flex justify-between items-center py-2">
              <span className="text-sm">{member.name}</span>
              <span className="text-sm text-gray-600">
                {bookings?.filter(b => b.staff === member._id).length || 0} bookings
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your salon operations</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'bookings', label: 'Bookings' },
              { id: 'customers', label: 'Customers' },
              { id: 'reports', label: 'Reports' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'bookings' && renderBookings()}
        {activeTab === 'customers' && renderCustomers()}
        {activeTab === 'reports' && renderReports()}

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Booking Details</h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <strong>Customer:</strong> {selectedBooking.customer.firstName} {selectedBooking.customer.lastName}
                </div>
                <div>
                  <strong>Email:</strong> {selectedBooking.customer.email}
                </div>
                <div>
                  <strong>Phone:</strong> {selectedBooking.customer.phone}
                </div>
                <div>
                  <strong>Service:</strong> {getServiceName(selectedBooking.service)}
                </div>
                <div>
                  <strong>Staff:</strong> {getStaffName(selectedBooking.staff)}
                </div>
                <div>
                  <strong>Date:</strong> {formatSafeDate(selectedBooking.date, 'EEEE, MMMM d, yyyy')}
                </div>
                <div>
                  <strong>Time:</strong> {selectedBooking.time}
                </div>
                <div>
                  <strong>Status:</strong> {selectedBooking.status}
                </div>
                {selectedBooking.specialRequests && (
                  <div>
                    <strong>Special Requests:</strong> {selectedBooking.specialRequests}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && bookingToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-red-600">Delete Booking</h3>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mb-6">
                Are you sure you want to delete the booking for {bookingToDelete.customer.firstName} {bookingToDelete.customer.lastName}? 
                This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleDeleteBooking}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 