import { Scissors, Palette, Sparkles, Clock, DollarSign } from "lucide-react";

export default function Services() {
  const serviceCategories = [
    {
      category: "Hair Services",
      services: [
        {
          name: "Haircut & Styling",
          description: "Professional cuts and styling for all hair types. Includes consultation, wash, cut, and styling.",
          price: "$45 - $75",
          duration: "45 min",
          icon: <Scissors className="w-8 h-8 text-purple-600" />
        },
        {
          name: "Hair Wash & Blowout",
          description: "Cleansing shampoo treatment followed by professional blowout styling.",
          price: "$35 - $45",
          duration: "30 min",
          icon: <Sparkles className="w-8 h-8 text-purple-600" />
        },
        {
          name: "Hair Extensions",
          description: "Add length and volume with premium quality hair extensions.",
          price: "$150 - $300",
          duration: "2-3 hours",
          icon: <Scissors className="w-8 h-8 text-purple-600" />
        }
      ]
    },
    {
      category: "Hair Coloring",
      services: [
        {
          name: "Full Color",
          description: "Complete hair color transformation using premium color products.",
          price: "$85 - $150",
          duration: "2-3 hours",
          icon: <Palette className="w-8 h-8 text-purple-600" />
        },
        {
          name: "Highlights",
          description: "Add dimension with partial or full highlights using foil or balayage technique.",
          price: "$90 - $180",
          duration: "2-4 hours",
          icon: <Palette className="w-8 h-8 text-purple-600" />
        },
        {
          name: "Root Touch-Up",
          description: "Quick color refresh for grown-out roots.",
          price: "$65 - $85",
          duration: "1-1.5 hours",
          icon: <Palette className="w-8 h-8 text-purple-600" />
        },
        {
          name: "Color Correction",
          description: "Fix unwanted color results with expert color correction techniques.",
          price: "$120 - $250",
          duration: "3-5 hours",
          icon: <Palette className="w-8 h-8 text-purple-600" />
        }
      ]
    },
    {
      category: "Hair Treatments",
      services: [
        {
          name: "Deep Conditioning Treatment",
          description: "Intensive moisture and repair treatment for damaged or dry hair.",
          price: "$65 - $85",
          duration: "1 hour",
          icon: <Sparkles className="w-8 h-8 text-purple-600" />
        },
        {
          name: "Keratin Treatment",
          description: "Smoothing treatment to reduce frizz and add shine for up to 4 months.",
          price: "$200 - $350",
          duration: "3-4 hours",
          icon: <Sparkles className="w-8 h-8 text-purple-600" />
        },
        {
          name: "Scalp Treatment",
          description: "Therapeutic scalp massage and treatment for healthy hair growth.",
          price: "$55 - $75",
          duration: "45 min",
          icon: <Sparkles className="w-8 h-8 text-purple-600" />
        }
      ]
    },
    {
      category: "Special Occasions",
      services: [
        {
          name: "Bridal Hair & Makeup",
          description: "Complete bridal styling package including consultation, trial, and wedding day service.",
          price: "$150 - $300",
          duration: "2-3 hours",
          icon: <Sparkles className="w-8 h-8 text-purple-600" />
        },
        {
          name: "Special Event Styling",
          description: "Professional styling for proms, parties, and special events.",
          price: "$75 - $125",
          duration: "1-1.5 hours",
          icon: <Sparkles className="w-8 h-8 text-purple-600" />
        }
      ]
    }
  ];

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
              {category.services.map((service, serviceIndex) => (
                <div key={serviceIndex} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-purple-600">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{service.price}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                    Book This Service
                  </button>
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