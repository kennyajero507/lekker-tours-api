/**
 * Default content for the site-settings singleton.
 *
 * These lived as `default:` on the Mongoose schema, which applied them field by
 * field. Postgres JSON columns have no such mechanism, so the defaults live
 * here and are applied in two places: when the singleton row is first created,
 * and when a PATCH arrives for a section that has never been saved.
 */
export const SITE_SETTINGS_DEFAULTS = {
  // Paths here resolve against the web app, which ships /logo.png. A blank
  // footer logo or favicon means "use the main logo".
  branding: {
    siteName: 'Lekker Tours and Travel',
    logoUrl: '/logo.png',
    footerLogoUrl: '',
    faviconUrl: '',
  },

  aboutPage: {
    title: 'About Lekker Tours and Travel',
    subtitle: 'Explore • Discover • Experience',
    missionStatement:
      'To design and coordinate accessible, enjoyable and well-organised travel experiences by combining local destination knowledge, responsive customer service and carefully selected travel partners.',
    visionStatement:
      'To become a trusted and customer-focused travel company known for memorable experiences, dependable service and meaningful connections across Kenya and East Africa.',
    // Blank means the web app shows its built-in company overview, which
    // quotes the office address from `contact` and so cannot live here as text.
    storyHtml: '',
    heroImageUrl: '/images/maasai-warriors-landscape.jpg',
    // Empty on purpose: fleet sizes, headcounts and years in operation have
    // not been confirmed, so no figures are shown until an admin enters them.
    stats: [],
  },

  servicesPage: {
    title: 'Our Services',
    subtitle: 'Tours, safaris, holidays and travel services: planned and coordinated from Nairobi.',
    introText:
      'Whether it is a weekend safari, a family holiday, a group excursion, a beach escape, an airport transfer or a tailor-made itinerary, our goal is to be one dependable point of contact from planning to completion.',
    bannerImageUrl: '/images/mara-herd-safari.jpg',
    // The company profile's service portfolio, in the profile's own order.
    // `icon` is optional: a card without one shows its position number.
    servicesList: [
      {
        title: 'East Africa Safaris',
        description:
          "Tailor-made and packaged safaris to the leading wildlife destinations of Kenya, Tanzania, Uganda and Rwanda, matched to the traveller's time, interests and budget",
      },
      {
        title: 'Holiday Packages',
        description:
          'Domestic and regional holidays covering safari, beach, city, nature, family and special-occasion travel.',
      },
      {
        title: 'Custom Tours & Excursions',
        description:
          'Private day trips, weekend getaways, cultural experiences, nature activities and personalised itineraries.',
      },
      {
        title: 'Airport Transfers',
        description:
          'Pre-arranged airport pickup and drop-off coordination for individuals, families, groups and corporate travellers.',
      },
      {
        title: 'Accommodation Booking',
        description:
          'Assistance with selecting and arranging hotels, lodges, camps and other suitable accommodation.',
      },
      {
        title: 'Group Travel',
        description:
          'Travel planning for schools, churches, families, social groups, clubs, companies and other organised groups.',
      },
      {
        title: 'Corporate & Business Travel',
        description:
          'Travel coordination for meetings, retreats, conferences, staff movements and business trips.',
      },
      {
        title: 'Transport & Ground Logistics',
        description:
          'Coordination of suitable vehicles, drivers, transfers and ground movement according to itinerary requirements.',
      },
      {
        title: 'International & Regional Travel',
        description:
          'Travel planning beyond Kenya through suitable airline, hotel and destination partners, where required.',
      },
      {
        title: 'Ticketing & Reservations',
        description:
          "Arrangement of domestic, regional and international flight tickets, SGR and long-distance bus tickets, and park entry, event and activity bookings. We handle date changes, reissues and confirmations, and keep every ticket aligned to the traveller's itinerary so connections, transfers and accommodation fit together without gaps.",
      },
      {
        title: 'Visa & Travel Documentation',
        description:
          'Guidance on visa requirements, eTA and entry permits, passport validity and supporting documents for travel into and out of Kenya and the wider region.',
      },
      {
        title: 'Travel Insurance',
        description:
          'Arrangement of suitable travel insurance through licensed partners, covering medical emergencies, evacuation, trip cancellation and lost baggage.',
      },
    ],
  },

  // The headline, intro and banner belong to the Contact page alone. The four
  // fields after them override their counterparts in `contact` on that page
  // only; blank defers to `contact`, so the two cannot drift apart by accident.
  contactPage: {
    inquiryHeadline: 'Start Your Journey',
    inquiryIntro:
      'From the first enquiry to the final sunset of your tour, our Nairobi specialists are ready to craft your expedition.',
    bannerImageUrl: '/images/balloon-mara-dawn.jpg',
    address: '',
    workingHours: '',
    mapEmbedUrl: '',
    inquiryEmail: '',
  },

  banner: {
    active: false,
    announcementText: '',
    ctaLabel: '',
    ctaLink: '',
  },

  footer: {
    // Blank shows "<site name>. All rights reserved." after the year.
    copyrightText: '',
    quickLinks: [
      { label: 'Our Safaris', href: '/tours' },
      { label: 'Weekend Escapes', href: '/tours?category=WeekendEscape' },
      { label: 'Destinations', href: '/destinations' },
      { label: 'Services', href: '/services' },
      { label: 'Journal', href: '/blog' },
      { label: 'About Us', href: '/about' },
      { label: 'Partnerships', href: '/partners' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },

  hero: {
    title: 'Feel the Pulse of the African Wilderness',
    subtitle:
      'Expertly curated expeditions from the heart of Nairobi to the legendary golden plains.',
    backgroundImage: {
      url: '/images/mara-wildebeest-migration.jpg',
      alt: 'Wildebeest crossing the Maasai Mara plains',
    },
    primaryCta: { label: 'Explore Expeditions', href: '/tours' },
    secondaryCta: { label: 'Plan My Trip', href: '/contact' },
    // The images the hero crossfades to after the background image above.
    slides: [
      { url: '/images/mara-lions-stalking.jpg', alt: 'Lions moving through long grass in the Maasai Mara' },
      { url: '/images/amboseli-elephant-kilimanjaro.jpg', alt: 'An elephant on the savanna with Kilimanjaro behind' },
      { url: '/images/balloon-mara-sunrise.jpg', alt: 'Hot air balloons rising over the plains at sunrise' },
      { url: '/images/serengeti-zebra-wildebeest.jpg', alt: 'Zebra and wildebeest grazing across open grassland' },
    ],
  },

  values: [],

  contact: {
    phone: '+254 182 308 871',
    whatsapp: '+254 182 308 872',
    email: 'lekkertours@gmail.com',
    addressLine: 'Agip House, Haile Selassie Avenue',
    poBox: 'P.O Box 13689-00200',
    city: 'Nairobi, Kenya',
    supportHours: 'We aim to respond to enquiries as quickly as practical',
  },

  socials: {},

  newsletter: {
    heading: 'Stories from the bush',
    blurb: 'Occasional dispatches on wildlife, seasons and new expeditions. No noise.',
  },

  footerBlurb:
    'Bringing the pulse of the African wilderness to life through expertly curated expeditions. Based in Nairobi, serving East Africa with excellence.',

  // Empty by default: the homepage renders a placeholder until an admin sets a
  // real video, rather than shipping someone else's footage as Lekker's own.
  video: {},

  seo: {
    defaultTitle: 'Lekker Tours and Travel',
    defaultDescription:
      'Expertly curated safari expeditions and weekend escapes across East Africa, from our base in Nairobi.',
    ogImage: '/images/mara-elephant-savanna.jpg',
  },
};
