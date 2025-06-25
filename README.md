# 🎯 Multi-Tenant Booking Widget System

A powerful, embeddable booking widget SaaS solution built with Next.js 15 and MongoDB. Allow any business to integrate a fully customizable booking system into their website with just a few lines of code.

## ✨ Key Features

### 🏢 **Multi-Tenant Architecture**
- **Unlimited Businesses** - Each business gets their own unique booking widget
- **Custom Branding** - Full customization with colors, logos, and messaging
- **Unique Business Slugs** - Clean URLs like `yoursite.com/widget/spa-luxe`
- **API Key Management** - Secure access control for each business
- **Business Hours Setup** - Flexible scheduling configuration

### 🔗 **Embeddable Widget**
- **Multiple Integration Methods** - IFrame, JavaScript widget, or popup modal
- **4-Step Booking Process** - Service → Staff → DateTime → Customer Info
- **Real-time Availability** - Dynamic time slot management
- **Mobile Responsive** - Perfect experience on all devices
- **Custom Styling** - Match your website's branding perfectly

### 👩‍💼 **Business Management**
- **Admin Dashboard** - Manage services, staff, and bookings
- **Staff Management** - Team profiles with specialties and schedules
- **Service Catalog** - Detailed offerings with pricing and duration
- **Booking Overview** - Real-time appointment management
- **Customer Database** - Complete client information system

### 🎨 **Customization Options**
- **Brand Colors** - Primary and secondary color customization
- **Logo Integration** - Upload business logos and branding
- **Custom Messaging** - Personalized welcome and confirmation messages
- **Time Slot Configuration** - Flexible appointment duration settings
- **Advance Booking** - Configure how far ahead customers can book

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Database**: [MongoDB](https://mongodb.com/) with Mongoose ODM
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Deployment**: Vercel-optimized
- **Architecture**: Multi-tenant SaaS with business isolation

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- MongoDB database (local or cloud)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vikas-develop/next-booking-system.git
   cd next-booking-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_secret_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Seed the database with sample data
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📚 Integration Guide

### Method 1: IFrame Embed (Simplest)
```html
<iframe 
  src="https://yourdomain.com/widget/your-business-slug" 
  width="100%" 
  height="800" 
  frameborder="0">
</iframe>
```

### Method 2: Popup Modal (Recommended)
```html
<button onclick="openBookingModal('your-business-slug')">
  Book Appointment
</button>

<script>
function openBookingModal(businessSlug) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.8); z-index: 10000; display: flex;
    align-items: center; justify-content: center;
  `;
  
  const iframe = document.createElement('iframe');
  iframe.src = `https://yourdomain.com/widget/${businessSlug}`;
  iframe.style.cssText = `
    width: 90%; max-width: 800px; height: 90%; max-height: 800px;
    border: none; border-radius: 12px; background: white;
  `;
  
  modal.appendChild(iframe);
  document.body.appendChild(modal);
  
  modal.onclick = (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  };
}
</script>
```

### Method 3: JavaScript Widget (Advanced)
```html
<div id="booking-widget"></div>
<script src="https://yourdomain.com/widget.js"></script>
<script>
  BookingWidget.init({
    businessSlug: 'your-business-slug',
    container: '#booking-widget',
    theme: 'light',
    primaryColor: '#8B5CF6'
  });
</script>
```

## 📱 System Routes

| Route | Description | Purpose |
|-------|-------------|---------|
| `/` | Homepage | System overview and features |
| `/demo` | Live Demo | Test widget functionality and integration |
| `/admin` | Admin Dashboard | Business management interface |
| `/admin/businesses` | Business Management | Create and manage businesses |
| `/widget/[businessSlug]` | Booking Widget | Embeddable booking interface |
| `/api/business` | Business API | CRUD operations for businesses |
| `/api/services` | Services API | Service management endpoints |
| `/api/staff` | Staff API | Staff management endpoints |
| `/api/bookings` | Bookings API | Appointment management endpoints |

## 🏗️ Project Structure

```
src/
├── app/
│   ├── admin/                    # Admin interface
│   │   ├── businesses/
│   │   │   └── page.js          # Business management
│   │   └── page.js              # Admin dashboard
│   ├── api/                     # API endpoints
│   │   ├── business/            # Business management API
│   │   ├── services/            # Services API
│   │   ├── staff/               # Staff API
│   │   ├── bookings/            # Bookings API
│   │   └── seed/                # Database seeding
│   ├── booking/
│   │   └── page.js              # Legacy booking page
│   ├── demo/
│   │   └── page.js              # Demo and integration examples
│   ├── widget/
│   │   └── [businessSlug]/
│   │       └── page.js          # Embeddable booking widget
│   ├── services/
│   │   └── page.js              # Services showcase
│   ├── staff/
│   │   └── page.js              # Staff profiles
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   └── page.js                  # Homepage
├── hooks/
│   └── useApi.js                # API interaction hooks
├── lib/
│   ├── data.js                  # Sample data utilities
│   ├── mongodb.js               # Database connection
│   └── seedData.js              # Database seeding data
├── models/                      # MongoDB/Mongoose models
│   ├── Business.js              # Business schema
│   ├── Service.js               # Service schema
│   ├── Staff.js                 # Staff schema
│   └── Booking.js               # Booking schema
└── public/                      # Static assets
```

## 🎯 Database Schema

### Business Model
```javascript
{
  name: String,                    // Business name
  slug: String,                    // Unique URL slug
  apiKey: String,                  // Secure API access
  description: String,             // Business description
  logo: String,                    // Logo URL
  primaryColor: String,            // Brand primary color
  secondaryColor: String,          // Brand secondary color
  welcomeMessage: String,          // Custom welcome message
  confirmationMessage: String,     // Booking confirmation message
  businessHours: [{               // Operating hours
    day: String,
    startTime: String,
    endTime: String,
    isOpen: Boolean
  }],
  settings: {
    slotDuration: Number,          // Appointment duration
    advanceBookingDays: Number,    // How far ahead to allow booking
    bufferTime: Number             // Time between appointments
  }
}
```

### Service Model
```javascript
{
  businessId: ObjectId,            // Reference to business
  name: String,                    // Service name
  description: String,             // Service description
  duration: Number,                // Duration in minutes
  price: Number,                   // Service price
  category: String                 // Service category
}
```

### Staff Model
```javascript
{
  businessId: ObjectId,            // Reference to business
  name: String,                    // Staff member name
  specialty: String,               // Area of expertise
  experience: String,              // Years of experience
  image: String,                   // Profile image URL
  availability: [{                 // Weekly availability
    day: String,
    startTime: String,
    endTime: String,
    isAvailable: Boolean
  }]
}
```

### Booking Model
```javascript
{
  businessId: ObjectId,            // Reference to business
  serviceId: ObjectId,             // Reference to service
  staffId: ObjectId,               // Reference to staff member
  customerName: String,            // Customer information
  customerEmail: String,
  customerPhone: String,
  date: Date,                      // Appointment date
  time: String,                    // Appointment time
  status: String,                  // confirmed/pending/cancelled
  bookingReference: String,        // Unique booking reference
  notes: String                    // Additional notes
}
```

## 🔧 Configuration

### Business Setup
1. **Create Business** - Use admin interface or API
2. **Configure Services** - Add your service offerings
3. **Add Staff Members** - Set up team profiles and availability
4. **Customize Branding** - Set colors, logo, and messaging
5. **Test Widget** - Use demo page for testing

### Widget Customization
```javascript
// Example business configuration
{
  name: "Luxe Salon & Spa",
  slug: "luxe-salon",
  primaryColor: "#8B5CF6",
  secondaryColor: "#EC4899",
  welcomeMessage: "Welcome to Luxe Salon & Spa!",
  settings: {
    slotDuration: 60,              // 60 minutes per slot
    advanceBookingDays: 30,        // Allow booking 30 days ahead
    bufferTime: 15                 // 15 minutes between appointments
  }
}
```

## 🚀 Deployment

### Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/booking-system
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Vercel Deployment
1. **Connect Repository** - Link GitHub repo to Vercel
2. **Configure Environment** - Add environment variables
3. **Deploy** - Automatic deployment from main branch

### MongoDB Setup
- **Local**: Use MongoDB Community Server
- **Cloud**: MongoDB Atlas (recommended)
- **Connection**: Ensure proper network access and authentication

## 📖 API Documentation

### Business Management
- `GET /api/business` - List all businesses
- `POST /api/business` - Create new business
- `GET /api/business/[id]` - Get specific business
- `PUT /api/business/[id]` - Update business
- `DELETE /api/business/[id]` - Delete business

### Services
- `GET /api/services?businessId=[id]` - Get business services
- `POST /api/services` - Create new service

### Staff
- `GET /api/staff?businessId=[id]` - Get business staff
- `POST /api/staff` - Add staff member

### Bookings
- `GET /api/bookings?businessId=[id]` - Get business bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/[id]` - Update booking status

## 🔮 Roadmap

### Immediate Enhancements
- [ ] **Payment Integration** - Stripe/PayPal for deposits
- [ ] **Email Notifications** - Booking confirmations and reminders
- [ ] **SMS Integration** - Appointment reminders via SMS
- [ ] **Calendar Sync** - Google Calendar integration
- [ ] **Advanced Analytics** - Business performance metrics

### Advanced Features
- [ ] **Multi-location Support** - Businesses with multiple locations
- [ ] **Resource Management** - Equipment and room booking
- [ ] **Subscription Management** - SaaS billing and plans
- [ ] **White-label Solution** - Fully brandable platform
- [ ] **Mobile App** - React Native companion app

### Technical Improvements
- [ ] **Caching Layer** - Redis for improved performance
- [ ] **CDN Integration** - Faster widget loading
- [ ] **Real-time Updates** - WebSocket for live booking updates
- [ ] **Advanced Security** - Enhanced API security measures
- [ ] **Load Testing** - Performance optimization

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Development Guidelines
- Follow existing code style and patterns
- Add tests for new features
- Update documentation for API changes
- Ensure mobile responsiveness
- Test with multiple business configurations

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vikas Develop**
- GitHub: [@vikas-develop](https://github.com/vikas-develop)
- Repository: [next-booking-system](https://github.com/vikas-develop/next-booking-system)

## 🙏 Acknowledgments

- Built with [Next.js 15](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide React](https://lucide.dev/)
- Database powered by [MongoDB](https://mongodb.com/)

---

**Ready to integrate booking functionality into any website? Get started with our embeddable widget system today!** 🚀
