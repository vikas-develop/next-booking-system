# Booking Widget Integration Guide

## Overview

Our embeddable booking widget allows you to integrate a complete booking system into any website with just a few lines of code. The widget is fully responsive, customizable, and supports multi-tenant functionality.

## Features

- ✅ **Multi-tenant Support** - Each business gets their own branded widget
- ✅ **Responsive Design** - Works perfectly on all devices
- ✅ **Custom Branding** - Match your brand colors and styling
- ✅ **Real-time Availability** - Live staff and time slot availability 
- ✅ **Secure Booking** - All data is encrypted and secure
- ✅ **Email Notifications** - Automatic booking confirmations
- ✅ **Analytics Dashboard** - Track bookings and performance

## Quick Start

### 1. Get Your Business Slug

First, you need your unique business slug. This is provided when you create your business account.

Example: `luxe-salon`

### 2. Choose Integration Method

We support three integration methods:

#### Method 1: IFrame Embed (Recommended for beginners)

```html
<iframe 
  src="https://yourdomain.com/widget/your-business-slug" 
  width="100%" 
  height="800" 
  frameborder="0"
  style="border: none; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
</iframe>
```

#### Method 2: JavaScript Widget (Recommended for developers)

```html
<!-- Add this script to your page head -->
<script src="https://yourdomain.com/widget/embed.js"></script>

<!-- Add this div where you want the widget to appear -->
<div id="booking-widget"></div>

<!-- Initialize the widget -->
<script>
  BookingWidget.init({
    container: '#booking-widget',
    businessSlug: 'your-business-slug',
    theme: {
      primaryColor: '#8B5CF6',
      secondaryColor: '#EC4899'
    },
    width: '100%',
    height: 'auto'
  });
</script>
```

#### Method 3: Modal Popup

```html
<!-- Add the trigger button -->
<button onclick="openBookingModal()" class="book-now-btn">
  Book Appointment
</button>

<!-- Add this script -->
<script>
  function openBookingModal() {
    const modal = window.open(
      'https://yourdomain.com/widget/your-business-slug?modal=true',
      'booking',
      'width=800,height=700,scrollbars=yes,resizable=yes'
    );
    
    // Listen for booking completion
    window.addEventListener('message', function(event) {
      if (event.data.type === 'booking-complete') {
        modal.close();
        alert('Booking completed! Reference: ' + event.data.reference);
        // Add your custom logic here
      }
    });
  }
</script>
```

## Advanced Configuration

### Custom Styling

You can customize the widget appearance by passing theme options:

```javascript
BookingWidget.init({
  container: '#booking-widget',
  businessSlug: 'your-business-slug',
  theme: {
    primaryColor: '#your-primary-color',
    secondaryColor: '#your-secondary-color',
    fontFamily: 'Your Font Family',
    borderRadius: '8px'
  },
  settings: {
    showPrices: true,
    showStaffSelection: true,
    autoConfirm: false
  }
});
```

### Event Callbacks

Handle booking events with custom callbacks:

```javascript
BookingWidget.init({
  container: '#booking-widget',
  businessSlug: 'your-business-slug',
  callbacks: {
    onBookingStart: function() {
      console.log('Booking process started');
    },
    onBookingComplete: function(data) {
      console.log('Booking completed:', data);
      // Send conversion tracking event
      gtag('event', 'purchase', {
        'transaction_id': data.reference,
        'value': data.totalPrice,
        'currency': 'USD'
      });
    },
    onBookingError: function(error) {
      console.error('Booking error:', error);
    }
  }
});
```

## Business Configuration

### Setting Up Your Business

1. **Create Business Account**
   ```bash
   POST /api/business
   ```

2. **Configure Widget Settings**
   - Business hours
   - Available services
   - Staff schedules
   - Pricing
   - Custom branding

3. **Get Integration Code**
   - Visit `/demo` page for live preview
   - Copy your custom integration code
   - Test on different devices

### API Configuration

Your business comes with a unique API key for advanced integrations:

```javascript
// Example: Fetch available time slots
fetch('/api/availability', {
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  }
})
```

## Testing & Deployment

### Local Testing

1. Start your development server
2. Visit `http://localhost:3000/demo`
3. Enter your business slug
4. Test all integration methods
5. Verify on different devices

### Production Deployment

1. Replace `localhost:3000` with your production domain
2. Update CORS settings for your domain
3. Configure SSL certificates
4. Test payment processing (if enabled)
5. Set up monitoring and analytics

## Customization Options

### Widget Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `timeSlotDuration` | Number | 30 | Minutes per time slot |
| `advanceBookingDays` | Number | 30 | Days in advance customers can book |
| `bufferTime` | Number | 0 | Minutes between appointments |
| `autoConfirm` | Boolean | false | Auto-confirm bookings |
| `showPrices` | Boolean | true | Display service prices |
| `showStaffSelection` | Boolean | true | Allow staff selection |

### Branding Options

| Option | Type | Description |
|--------|------|-------------|
| `primaryColor` | String | Main brand color (hex) |
| `secondaryColor` | String | Accent brand color (hex) |
| `logo` | String | URL to your logo image |
| `businessName` | String | Display name override |
| `headerText` | String | Custom header message |
| `thankYouMessage` | String | Custom completion message |

## Troubleshooting

### Common Issues

1. **Widget not loading**
   - Check business slug is correct
   - Verify iframe src URL
   - Check for JavaScript errors

2. **Styling issues**
   - Ensure container has proper dimensions
   - Check CSS conflicts
   - Verify custom theme colors

3. **Booking failures**
   - Check business is active
   - Verify staff availability
   - Check service configurations

### Support

- 📧 **Email**: support@bookingsystem.com  
- 📞 **Phone**: (555) 123-BOOK
- 💬 **Live Chat**: Available 9 AM - 6 PM EST
- 📚 **Documentation**: [docs.bookingsystem.com](https://docs.bookingsystem.com)

## Security

- All data transmitted via HTTPS
- Customer information encrypted at rest  
- PCI DSS compliant payment processing
- Regular security audits and updates
- GDPR compliant data handling

## Analytics & Tracking

### Built-in Analytics
- Booking conversion rates
- Popular services and time slots  
- Staff performance metrics
- Customer demographics
- Revenue tracking

### Custom Tracking
```javascript
// Google Analytics integration
BookingWidget.init({
  businessSlug: 'your-business-slug',
  callbacks: {
    onBookingComplete: function(data) {
      gtag('event', 'booking_complete', {
        'service_name': data.serviceName,
        'staff_name': data.staffName,
        'booking_value': data.totalPrice
      });
    }
  }
});
```

## API Reference

### Endpoints

- `GET /api/business?slug=your-slug` - Get business info
- `GET /api/services?business=business-id` - Get services  
- `GET /api/staff?business=business-id` - Get staff
- `POST /api/bookings` - Create booking
- `GET /api/availability` - Check availability

### Webhook Events

Configure webhooks to receive real-time booking notifications:

```json
{
  "event": "booking.created",
  "data": {
    "bookingReference": "BK-20241205-ABC123",
    "customer": {...},
    "service": {...},
    "staff": {...},
    "appointmentDate": "2024-12-06",
    "appointmentTime": "10:00 AM"
  }
}
```

## Examples

Check out our example implementations:

- [HTML + CSS Example](./examples/html-css/)
- [React Component](./examples/react/)  
- [WordPress Plugin](./examples/wordpress/)
- [Shopify Integration](./examples/shopify/)

## Version History

- **v2.0.0** - Multi-tenant support, advanced customization
- **v1.5.0** - Mobile responsiveness improvements  
- **v1.0.0** - Initial release

---

**Ready to get started?** Visit our [demo page](/demo) to see the widget in action and get your integration code! 