# 💇‍♀️ Luxe Salon - Complete Booking System

A modern, full-featured salon booking system built with Next.js 15, offering seamless appointment scheduling, staff management, and admin dashboard functionality.

## ✨ Features

### 🏠 **Customer Experience**
- **Beautiful Homepage** - Elegant hero section with service previews
- **Comprehensive Services** - Detailed catalog with pricing and descriptions
- **Easy Booking Process** - 4-step booking system with real-time availability
- **Staff Profiles** - Meet the team with specialties and experience
- **Responsive Design** - Perfect experience on all devices

### 👩‍💼 **Admin Management**
- **Dashboard Overview** - Key metrics and today's schedule
- **Booking Management** - View, confirm, and manage all appointments
- **Status Tracking** - Real-time booking status updates
- **Customer Information** - Complete customer contact details
- **Professional Interface** - Clean, intuitive admin panel

### 🎨 **Design & UX**
- **Modern UI** - Professional purple/pink color scheme
- **Smooth Animations** - Hover effects and transitions
- **Professional Icons** - Lucide React icon library
- **Accessibility** - WCAG compliant design
- **Mobile-First** - Optimized for all screen sizes

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Language**: TypeScript-ready JavaScript
- **Deployment**: Vercel-optimized

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
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
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📱 Pages & Routes

| Route | Description | Features |
|-------|-------------|----------|
| `/` | Homepage | Hero section, services preview, call-to-action |
| `/services` | Services Catalog | Detailed services with pricing and descriptions |
| `/booking` | Booking System | 4-step appointment booking process |
| `/staff` | Team Profiles | Staff members with specialties and experience |
| `/admin` | Admin Dashboard | Booking management and analytics |

## 🏗️ Project Structure

```
src/
├── app/
│   ├── admin/
│   │   └── page.js          # Admin dashboard
│   ├── booking/
│   │   └── page.js          # Booking system
│   ├── services/
│   │   └── page.js          # Services catalog
│   ├── staff/
│   │   └── page.js          # Staff profiles
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout with navigation
│   └── page.js              # Homepage
├── lib/
│   └── data.js              # Sample data and utilities
└── public/                  # Static assets
```

## 🎯 Key Components

### Booking Flow
1. **Service Selection** - Choose from available services
2. **Stylist Selection** - Pick preferred team member
3. **Date & Time** - Select appointment slot
4. **Customer Info** - Enter contact details

### Admin Features
- **Real-time Dashboard** - Today's bookings and key metrics
- **Booking Management** - Status updates and customer communication
- **Staff Scheduling** - Manage team availability
- **Revenue Tracking** - Weekly revenue overview

## 📊 Sample Data

The system includes sample data for:
- **Services**: Hair cuts, coloring, treatments, special occasions
- **Staff**: 5 team members with specialties and schedules
- **Bookings**: Example appointments with different statuses
- **Business Hours**: Configurable salon operating hours

## 🔧 Customization

### Branding
- Update colors in `tailwind.config.js`
- Modify salon name and info in `layout.js`
- Replace logo and images in `public/` folder

### Services
- Edit service data in `src/lib/data.js`
- Add new service categories and pricing
- Update service icons and descriptions

### Staff
- Modify team member profiles in `src/lib/data.js`
- Add staff photos and specialties
- Configure availability schedules

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms
- **Netlify**: Connect GitHub repo for automatic deploys
- **AWS Amplify**: Deploy with built-in CI/CD
- **Railway**: Simple deployment with database options

## 🔮 Future Enhancements

### Planned Features
- [ ] **Database Integration** - Replace sample data with real database
- [ ] **Payment Processing** - Stripe/PayPal integration
- [ ] **Email Notifications** - Booking confirmations and reminders
- [ ] **SMS Notifications** - Appointment reminders
- [ ] **User Authentication** - Customer accounts and login
- [ ] **Online Reviews** - Customer feedback system
- [ ] **Inventory Management** - Product tracking
- [ ] **Loyalty Program** - Rewards and discounts

### Technical Improvements
- [ ] **API Routes** - Backend endpoints for data management
- [ ] **Database Schema** - PostgreSQL/MySQL integration
- [ ] **Authentication** - NextAuth.js implementation
- [ ] **Image Uploads** - Staff photos and service images
- [ ] **Calendar Integration** - Google Calendar sync
- [ ] **Multi-language** - Internationalization support

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vikas Develop**
- GitHub: [@vikas-develop](https://github.com/vikas-develop)
- Repository: [next-booking-system](https://github.com/vikas-develop/next-booking-system)

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon library
- **Vercel** - For the deployment platform

---

⭐ **Star this repository if you find it helpful!**

📧 **Questions?** Open an issue or reach out via GitHub.

🚀 **Ready to revolutionize your salon business?** Get started with this booking system today!
