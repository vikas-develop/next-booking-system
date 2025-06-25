import { Star, Award, Calendar, Scissors, Palette, Sparkles } from "lucide-react";

export default function Staff() {
  const teamMembers = [
    {
      id: 'sarah',
      name: 'Sarah Johnson',
      title: 'Senior Color Specialist & Salon Manager',
      experience: '8 years',
      specialties: ['Hair Coloring', 'Highlights', 'Color Correction', 'Balayage'],
      bio: 'Sarah is our lead color specialist with a passion for creating stunning color transformations. She specializes in natural-looking highlights and complex color corrections.',
      education: ['Aveda Institute Graduate', 'Advanced Color Theory Certification', 'Salon Management Diploma'],
      achievements: ['Top Colorist Award 2023', 'Customer Choice Award 2022'],
      availability: 'Mon-Fri: 9AM-6PM, Sat: 8AM-4PM'
    },
    {
      id: 'michael',
      name: 'Michael Chen',
      title: 'Master Stylist & Cut Specialist',
      experience: '6 years',
      specialties: ['Precision Cuts', 'Men\'s Grooming', 'Beard Styling', 'Modern Styles'],
      bio: 'Michael brings precision and creativity to every cut. His expertise in both classic and contemporary styles makes him a favorite among clients of all ages.',
      education: ['Paul Mitchell School Graduate', 'Advanced Cutting Techniques', 'Men\'s Grooming Specialist'],
      achievements: ['Best Men\'s Stylist 2023', 'Innovation in Styling Award'],
      availability: 'Tue-Sat: 10AM-7PM'
    },
    {
      id: 'emma',
      name: 'Emma Rodriguez',
      title: 'Bridal & Special Events Specialist',
      experience: '10 years',
      specialties: ['Bridal Hair', 'Updos', 'Special Event Styling', 'Hair Extensions'],
      bio: 'Emma has styled hair for over 200 weddings and countless special events. Her artistic vision and attention to detail ensure every client looks absolutely stunning.',
      education: ['Cosmetology Institute Graduate', 'Bridal Hair Specialist Certification', 'Hair Extension Master Class'],
      achievements: ['Bridal Stylist of the Year 2022', '5-Star Wedding Wire Rating'],
      availability: 'Wed-Sun: 8AM-6PM (By appointment for events)'
    },
    {
      id: 'david',
      name: 'David Kim',
      title: 'Stylist & Treatment Specialist',
      experience: '5 years',
      specialties: ['Hair Treatments', 'Keratin Treatments', 'Scalp Care', 'Hair Repair'],
      bio: 'David focuses on hair health and restoration. His expertise in various treatments helps clients achieve not just beautiful hair, but healthy hair.',
      education: ['Beauty School Graduate', 'Keratin Treatment Certification', 'Scalp Health Specialist'],
      achievements: ['Treatment Specialist Award', 'Client Satisfaction Excellence'],
      availability: 'Mon-Fri: 11AM-8PM, Sat: 9AM-5PM'
    },
    {
      id: 'lisa',
      name: 'Lisa Thompson',
      title: 'Junior Stylist',
      experience: '2 years',
      specialties: ['Basic Cuts', 'Blowouts', 'Styling', 'Hair Washing'],
      bio: 'Lisa is our newest team member with fresh ideas and enthusiasm. She excels at creating beautiful everyday styles and is always eager to learn new techniques.',
      education: ['Recent Cosmetology Graduate', 'Customer Service Excellence Training'],
      achievements: ['Rising Star Award', 'Best New Stylist Nominee'],
      availability: 'Mon-Sat: 9AM-6PM'
    }
  ];

  const getSpecialtyIcon = (specialty) => {
    if (specialty.toLowerCase().includes('color')) return <Palette className="w-4 h-4" />;
    if (specialty.toLowerCase().includes('cut')) return <Scissors className="w-4 h-4" />;
    if (specialty.toLowerCase().includes('treatment')) return <Sparkles className="w-4 h-4" />;
    return <Star className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our talented stylists bring years of experience, creativity, and passion to every appointment. 
            Get to know the professionals who will help you achieve your perfect look.
          </p>
        </div>

        {/* Team Members */}
        <div className="space-y-12">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id} 
              className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex flex-col lg:flex`}
            >
              {/* Photo Section */}
              <div className="lg:w-1/3 bg-gradient-to-br from-purple-500 to-pink-500 p-8 flex items-center justify-center">
                <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-6xl font-bold text-purple-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-2/3 p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h2>
                    <p className="text-xl text-purple-600 font-semibold mb-2">{member.title}</p>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>{member.experience} of experience</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">{member.bio}</p>

                {/* Specialties */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {getSpecialtyIcon(specialty)}
                        <span className="ml-1">{specialty}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education & Achievements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-purple-600" />
                      Education
                    </h3>
                    <ul className="space-y-1">
                      {member.education.map((edu, idx) => (
                        <li key={idx} className="text-gray-600 text-sm">• {edu}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-purple-600" />
                      Achievements
                    </h3>
                    <ul className="space-y-1">
                      {member.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-600 text-sm">• {achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Availability */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Availability</h3>
                  <p className="text-gray-600">{member.availability}</p>
                </div>

                {/* Book Button */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                    Book with {member.name.split(' ')[0]}
                  </button>
                  <button className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                    View Portfolio
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-purple-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Meet Your Perfect Stylist?</h2>
          <p className="text-xl mb-8 opacity-90">
            Book a consultation or appointment with any of our talented team members.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/booking"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Appointment
            </a>
            <a 
              href="tel:+15551234567"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Call for Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 