'use client';

import { Star, Clock, Award, User } from "lucide-react";
import { useStaff } from '@/hooks/useApi';

export default function Staff() {
  const { data: staff, loading, error } = useStaff();

  const formatAvailability = (availability) => {
    if (!availability || typeof availability !== 'object') return 'Contact for availability';
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const workingDays = [];
    
    days.forEach(day => {
      const daySchedule = availability[day];
      if (daySchedule && daySchedule.start && daySchedule.end) {
        const dayName = day.charAt(0).toUpperCase() + day.slice(1);
        workingDays.push(`${dayName}: ${daySchedule.start} - ${daySchedule.end}`);
      }
    });
    
    return workingDays.length > 0 ? workingDays.join(', ') : 'Contact for availability';
  };

  const renderEducation = (education) => {
    if (!education || education.length === 0) return null;
    
    return education.map((edu, index) => (
      <div key={index} className="text-sm text-gray-600">
        {edu.institution} - {edu.certification} ({edu.year})
      </div>
    ));
  };

  const renderAchievements = (achievements) => {
    if (!achievements || achievements.length === 0) return null;
    
    return achievements.map((achievement, index) => (
      <div key={index} className="text-sm text-gray-600 flex items-center">
        <Award className="w-3 h-3 mr-1 text-yellow-500" />
        {achievement}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Expert Team</h1>
            <p className="text-xl text-gray-600">Loading our talented stylists...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <div className="bg-gray-200 h-6 w-32 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 w-24 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="bg-gray-200 h-4 w-full rounded"></div>
                  <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                </div>
                <div className="bg-gray-200 h-4 w-1/2 rounded mb-4"></div>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Expert Team</h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-600 text-lg">
                Sorry, we couldn't load our team information at the moment. Please try again later.
              </p>
              <p className="text-red-500 text-sm mt-2">Error: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Expert Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our talented team of professional stylists and beauty experts. 
            Each member brings unique skills and passion to create your perfect look.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staff?.map((member) => (
            <div key={member._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-purple-600 font-medium">{member.position}</p>
                  <div className="flex items-center mt-1">
                    <Clock className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{member.experience} years experience</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {member.bio}
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Specialties:</h4>
                <div className="flex flex-wrap gap-2">
                  {member.specialties?.map((specialty, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {member.education && member.education.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Education:</h4>
                  {renderEducation(member.education)}
                </div>
              )}

              {member.achievements && member.achievements.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Achievements:</h4>
                  <div className="space-y-1">
                    {renderAchievements(member.achievements)}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Availability:</h4>
                <p className="text-sm text-gray-600">
                  {formatAvailability(member.availability)}
                </p>
              </div>

              <div className="flex gap-2">
                <a 
                  href="/booking"
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium text-center"
                >
                  Book with {member.name.split(' ')[0]}
                </a>
                <button className="border border-purple-600 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors font-medium">
                  Portfolio
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-purple-600 text-white rounded-2xl p-8 text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Can't Decide on a Stylist?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let us match you with the perfect stylist based on your needs and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/booking"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Consultation
            </a>
            <a 
              href="tel:+15551234567"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Call for Advice
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 