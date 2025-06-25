'use client';

import { Scissors, Palette, Sparkles, Clock, DollarSign } from "lucide-react";
import { useServices } from '@/hooks/useApi';

export default function Services() {
  const { data: services, loading, error } = useServices();

  // Group services by category
  const groupServicesByCategory = (services) => {
    if (!services) return [];
    
    const grouped = services.reduce((acc, service) => {
      const category = service.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(service);
      return acc;
    }, {});

    return Object.entries(grouped).map(([category, services]) => ({
      category,
      services
    }));
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'scissors': return <Scissors className="w-8 h-8 text-purple-600" />;
      case 'palette': return <Palette className="w-8 h-8 text-purple-600" />;
      case 'sparkles': return <Sparkles className="w-8 h-8 text-purple-600" />;
      default: return <Scissors className="w-8 h-8 text-purple-600" />;
    }
  };

  const formatPrice = (price) => {
    if (price.min === price.max) {
      return `$${price.min}`;
    }
    return `$${price.min} - $${price.max}`;
  };

  const formatDuration = (minutes) => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
            <p className="text-xl text-gray-600">Loading our services...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 p-3 rounded-lg mr-4 w-14 h-14"></div>
                  <div className="bg-gray-200 h-6 w-32 rounded"></div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="bg-gray-200 h-4 w-full rounded"></div>
                  <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-gray-200 h-4 w-20 rounded"></div>
                  <div className="bg-gray-200 h-4 w-16 rounded"></div>
                </div>
                <div className="bg-gray-200 h-10 w-full rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-600 text-lg">
                Sorry, we couldn't load our services at the moment. Please try again later.
              </p>
              <p className="text-red-500 text-sm mt-2">Error: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const serviceCategories = groupServicesByCategory(services);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of professional hair and beauty services. 
            Each service is performed by our expert stylists using premium products.
          </p>
        </div>

        {/* Service Categories */}
        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {category.category}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.services.map((service) => (
                <div key={service._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      {getIconComponent(service.icon)}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-purple-600">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{formatPrice(service.price)}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{formatDuration(service.duration)}</span>
                    </div>
                  </div>
                  
                  <a 
                    href="/booking"
                    className="block w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium text-center"
                  >
                    Book This Service
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div className="bg-purple-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Appointment?</h2>
          <p className="text-xl mb-8 opacity-90">
            Choose from our wide range of services and book online or call us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/booking"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Online
            </a>
            <a 
              href="tel:+15551234567"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 