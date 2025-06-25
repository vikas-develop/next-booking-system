import Image from "next/image";
import { Scissors, Calendar, Users, Star } from "lucide-react";

export default function Home() {
  const services = [
    {
      name: "Haircut & Styling",
      description: "Professional cuts and styling for all hair types",
      price: "Starting at $45",
      duration: "45 min",
      icon: <Scissors className="w-8 h-8 text-purple-600" />
    },
    {
      name: "Hair Coloring",
      description: "Expert color treatments and highlights",
      price: "Starting at $85",
      duration: "2-3 hours",
      icon: <Star className="w-8 h-8 text-purple-600" />
    },
    {
      name: "Hair Treatment",
      description: "Deep conditioning and repair treatments",
      price: "Starting at $65",
      duration: "1 hour",
      icon: <Users className="w-8 h-8 text-purple-600" />
    }
  ];

  const features = [
    {
      title: "Expert Stylists",
      description: "Our team of professional stylists brings years of experience and passion to every appointment."
    },
    {
      title: "Premium Products",
      description: "We use only the highest quality hair care products from leading brands in the industry."
    },
    {
      title: "Luxurious Environment",
      description: "Relax in our modern, comfortable salon designed for your ultimate comfort and enjoyment."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Luxe Salon
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Transform your look with our expert stylists and premium services. 
              Book your appointment today and experience luxury hair care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </a>
              <a
                href="/services"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Popular Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our range of professional hair and beauty services designed to make you look and feel your best.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-semibold ml-3">{service.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600 font-semibold">{service.price}</span>
                  <span className="text-gray-500">{service.duration}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="/services"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              View All Services
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Luxe Salon?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional service and results that exceed your expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Look?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your appointment today and let our expert stylists help you achieve the perfect look.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Now
            </a>
            <a
              href="tel:+15551234567"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
