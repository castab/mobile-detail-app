export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? 'Fresh Finish',
  tagline: 'Premium Mobile Detailing, At Your Door.',
  contact: {
    phone: '',
    email: '',
  },
  copy: {
    a11y: {
      navLabel: 'Primary',
      menuOpenLabel: 'Open menu',
      menuCloseLabel: 'Close menu',
      menuOverlayCloseLabel: 'Close menu',
      calendarPreviousMonth: 'Previous month',
      calendarNextMonth: 'Next month',
    },
    ctas: {
      bookNow: 'Book Now',
      ourServices: 'Our Services',
      bookThisService: 'Book This Service',
      confirmBooking: 'Confirm Booking',
    },
    footer: {
      adminLinkLabel: 'Admin Console',
    },
    home: {
      supportingText:
        'Premium mobile detailing for busy schedules. We bring the tools, the care, and the finish right to your driveway.',
      howItWorks: {
        heading: 'How It Works',
        steps: [
          {
            title: 'Choose Your Service',
            description: 'Pick exterior or interior care based on what your vehicle needs most.',
          },
          {
            title: 'Pick a Time',
            description: 'Select a date and a time slot that fits your day.',
          },
          {
            title: 'We Come to You',
            description: 'On appointment day, we arrive on-site and handle the rest.',
          },
        ],
      },
      trustSignals: [
        'Fully Insured',
        'No Hidden Fees',
        'We Come to You',
        'Satisfaction Guaranteed',
      ],
    },
    servicesPage: {
      heading: 'Our Services',
      categoryLabels: {
        EXTERIOR_WASH: 'Exterior',
        INTERIOR_CLEANING: 'Interior',
      },
      readyToBookHeading: 'Ready to book?',
    },
    bookingPage: {
      heading: 'Book Your Appointment',
      steps: {
        step1Label: 'Step 1',
        step1Heading: 'Select Service',
        step2Label: 'Step 2',
        step2Heading: 'Pick a Date & Time',
        step3Label: 'Step 3',
        step3Heading: 'Your Details',
      },
      calendar: {
        weekdaysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      },
      timeSlots: [
        { label: '8:00 AM', status: 'available' },
        { label: '10:00 AM', status: 'selected' },
        { label: '12:00 PM', status: 'available' },
        { label: '2:00 PM', status: 'disabled' },
        { label: '4:00 PM', status: 'available' },
      ],
      form: {
        fullName: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        address: 'Service Address',
        vehicleType: 'Vehicle Type',
        additionalNotes: 'Additional Notes',
        vehicleTypes: ['Sedan', 'SUV', 'Truck', 'Van', 'Other'],
      },
      summary: {
        summaryHeading: 'Appointment Summary',
        serviceLabel: 'Service',
        dateLabel: 'Date',
        timeLabel: 'Time',
      },
    },
  },
  nav: [
    { label: 'Services', href: '/services' },
    { label: 'Book Now', href: '/book' },
  ],
} as const

export type AppNavItem = (typeof appConfig.nav)[number]
export type BookingTimeSlot = (typeof appConfig.copy.bookingPage.timeSlots)[number]
