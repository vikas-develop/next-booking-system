'use client';

import { useState } from 'react';
import { Copy, ExternalLink, Code, Smartphone, Monitor, Tablet } from 'lucide-react';

export default function IntegrationDemo() {
  const [selectedMethod, setSelectedMethod] = useState('iframe');
  const [businessSlug, setBusinessSlug] = useState('luxe-salon');
  const [copied, setCopied] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop');

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';

  const integrationMethods = {
    iframe: {
      title: 'IFrame Embed',
      description: 'Simple iframe embed - easiest integration method',
      code: `<iframe 
  src="${baseUrl}/widget/${businessSlug}" 
  width="100%" 
  height="800" 
  frameborder="0"
  style="border: none; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
</iframe>`,
      pros: ['Easy to implement', 'No technical knowledge required', 'Secure sandbox'],
      cons: ['Fixed height', 'Limited customization', 'Mobile responsiveness depends on container']
    },
    
    javascript: {
      title: 'JavaScript Widget',
      description: 'Dynamic JavaScript widget with more customization options',
      code: `<!-- Add this script to your page head -->
<script src="${baseUrl}/widget/embed.js"></script>

<!-- Add this div where you want the widget to appear -->
<div id="booking-widget"></div>

<!-- Initialize the widget -->
<script>
  BookingWidget.init({
    container: '#booking-widget',
    businessSlug: '${businessSlug}',
    theme: {
      primaryColor: '#8B5CF6',
      secondaryColor: '#EC4899'
    },
    width: '100%',
    height: 'auto'
  });
</script>`,
      pros: ['Responsive design', 'Custom theming', 'Event callbacks', 'Dynamic height'],
      cons: ['Requires JavaScript', 'Slightly more complex setup']
    },
    
    popup: {
      title: 'Popup Modal',
      description: 'Open booking widget in a popup modal triggered by a button',
      code: `<!-- Add the trigger button -->
<button 
  onclick="openBookingModal()" 
  style="background: #8B5CF6; color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
  Book Appointment
</button>

<!-- Add this script -->
<script>
  function openBookingModal() {
    const modal = window.open(
      '${baseUrl}/widget/${businessSlug}?modal=true',
      'booking',
      'width=800,height=700,scrollbars=yes,resizable=yes'
    );
    
    // Listen for booking completion
    window.addEventListener('message', function(event) {
      if (event.data.type === 'booking-complete') {
        modal.close();
        alert('Booking completed! Reference: ' + event.data.reference);
      }
    });
  }
</script>`,
      pros: ['Non-intrusive', 'Maintains page layout', 'Good user experience'],
      cons: ['Popup blockers may interfere', 'Requires JavaScript']
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getPreviewDimensions = () => {
    switch (previewDevice) {
      case 'mobile':
        return { width: '375px', height: '667px' };
      case 'tablet':
        return { width: '768px', height: '600px' };
      default:
        return { width: '100%', height: '600px' };
    }
  };

  // Add the actual openBookingModal function for the demo
  const openBookingModal = () => {
    const modal = window.open(
      `/widget/${businessSlug}?modal=true`,
      'booking',
      'width=800,height=700,scrollbars=yes,resizable=yes'
    );
    
    // Listen for booking completion
    window.addEventListener('message', function(event) {
      if (event.data.type === 'booking-complete') {
        modal.close();
        alert('Booking completed! Reference: ' + event.data.reference);
      }
    });
  };

  // Make the function globally available for the demo
  if (typeof window !== 'undefined') {
    window.openBookingModal = openBookingModal;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Booking Widget Integration
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Embed our booking system into your website with just a few lines of code. 
            Choose from multiple integration methods to fit your needs.
          </p>
        </div>

        {/* Business Slug Input */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Configuration</h2>
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Slug
            </label>
            <input
              type="text"
              value={businessSlug}
              onChange={(e) => setBusinessSlug(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="your-business-slug"
            />
            <p className="text-sm text-gray-500 mt-1">
              This is your unique business identifier found in your dashboard
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Integration Methods */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Integration Methods</h2>
            
            {Object.entries(integrationMethods).map(([key, method]) => (
              <div 
                key={key}
                className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all border-2 ${
                  selectedMethod === key 
                    ? 'border-purple-500 ring-2 ring-purple-200' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => setSelectedMethod(key)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{method.title}</h3>
                    <p className="text-gray-600 text-sm">{method.description}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedMethod === key 
                      ? 'bg-purple-500 border-purple-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedMethod === key && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Pros</h4>
                    <ul className="space-y-1">
                      {method.pros.map((pro, index) => (
                        <li key={index} className="text-green-600">• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-700 mb-2">Cons</h4>
                    <ul className="space-y-1">
                      {method.cons.map((con, index) => (
                        <li key={index} className="text-orange-600">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {/* Code Example */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Code Example - {integrationMethods[selectedMethod].title}
                </h3>
                <button
                  onClick={() => handleCopy(integrationMethods[selectedMethod].code)}
                  className="flex items-center space-x-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{integrationMethods[selectedMethod].code}</code>
              </pre>
            </div>
          </div>

          {/* Live Preview */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Live Preview</h2>
              
              {/* Device Toggle */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-2 rounded-md transition-colors ${
                    previewDevice === 'mobile' 
                      ? 'bg-white shadow-sm text-purple-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice('tablet')}
                  className={`p-2 rounded-md transition-colors ${
                    previewDevice === 'tablet' 
                      ? 'bg-white shadow-sm text-purple-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-2 rounded-md transition-colors ${
                    previewDevice === 'desktop' 
                      ? 'bg-white shadow-sm text-purple-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex flex-col items-center">
                <div 
                  className="border border-gray-300 rounded-lg overflow-hidden transition-all duration-300"
                  style={getPreviewDimensions()}
                >
                  <iframe
                    src={`/widget/${businessSlug}`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 'none' }}
                    title="Booking Widget Preview"
                  />
                </div>
                
                <div className="mt-4 flex items-center space-x-4">
                  <a
                    href={`/widget/${businessSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in new tab</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Live Demo Buttons */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Try Live Demo</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Test the popup modal integration:</p>
                  <button
                    onClick={openBookingModal}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Open Booking Modal
                  </button>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Or open widget in new tab:</p>
                  <a
                    href={`/widget/${businessSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Widget</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Integration Checklist */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Checklist</h3>
              <div className="space-y-3">
                {[
                  'Copy the integration code for your preferred method',
                  'Replace "luxe-salon" with your business slug',
                  'Customize colors and styling to match your brand',
                  'Test the widget on different devices and browsers',
                  'Monitor booking analytics in your dashboard'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mt-0.5">
                      <span className="text-purple-600 text-xs font-semibold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Information */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Need Help?</h3>
              <p className="text-purple-700 mb-4">
                Our support team is here to help you integrate the booking widget successfully.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-purple-600">📧 Email: support@bookingsystem.com</p>
                <p className="text-purple-600">📞 Phone: (555) 123-BOOK</p>
                <p className="text-purple-600">💬 Live Chat: Available 9 AM - 6 PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 