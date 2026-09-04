export const MOCK_PROVIDERS = [
  {
    _id: "prov_101",
    name: "Kamal Perera",
    title: "Master Electrician & Home Automation Expert",
    category: "Electrical",
    location: "Colombo",
    rating: 4.8,
    reviewCount: 34,
    hourlyRate: 2500,
    verified: true,
    experienceYears: 12,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    bio: "Certified electrical contractor with over 12 years of experience serving residential and commercial properties in Colombo. Specializing in DB board upgrades, LED lighting, trip switch troubleshooting, and safety inspections.",
    availability: [
      { date: "2026-09-10", startTime: "09:00", endTime: "17:00" },
      { date: "2026-09-11", startTime: "09:00", endTime: "13:00" },
      { date: "2026-09-12", startTime: "10:00", endTime: "18:00" }
    ],
    services: [
      { id: "s101", name: "Wiring & Safety Inspection", price: 3500, description: "Full domestic wiring diagnostic and earth resistance testing" },
      { id: "s102", name: "DB Board Repair & Breaker Replacement", price: 4500, description: "Fix tripping RCCB breakers, main switch issues, and rewiring" },
      { id: "s103", name: "Light Fixture & Fan Installation", price: 2000, description: "Ceiling fans, chandelier, LED panel lights, and outdoor floodlights" }
    ],
    reviews: [
      { id: "r1", author: "Nimal Siripala", rating: 5, date: "2026-08-28", comment: "Kamal arrived right on time and fixed our main board trip issue within an hour. Highly recommended!" },
      { id: "r2", author: "Dilhani Silva", rating: 4.5, date: "2026-08-15", comment: "Very professional work installing chandelier lights in our living room. Neat cable management." }
    ]
  },
  {
    _id: "prov_102",
    name: "Sunil Shantha",
    title: "Certified Master Plumber",
    category: "Plumbing",
    location: "Colombo",
    rating: 4.9,
    reviewCount: 52,
    hourlyRate: 2200,
    verified: true,
    experienceYears: 15,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Expert plumbing services specializing in pipe unblocking, pressure pump installation, overhead water tank installation, and luxury bathroom sanitary fitting in Colombo and surrounding areas.",
    availability: [
      { date: "2026-09-10", startTime: "08:00", endTime: "16:00" },
      { date: "2026-09-11", startTime: "10:00", endTime: "18:00" },
      { date: "2026-09-13", startTime: "09:00", endTime: "15:00" }
    ],
    services: [
      { id: "s201", name: "Pipe Leak Repair & Pressure Testing", price: 3000, description: "Detect hidden underground leaks and repair PPR/PVC pipes" },
      { id: "s202", name: "Overhead Water Tank Cleaning & Fitting", price: 5000, description: "Complete tank flush, float valve replacement, and disinfection" },
      { id: "s203", name: "Clogged Drain & Sewer Line Clearing", price: 3500, description: "High-pressure water jet drain unblocking" }
    ],
    reviews: [
      { id: "r3", author: "Pradeep Fernando", rating: 5, date: "2026-08-20", comment: "Sunil solved a major bathroom leak that two previous plumbers failed to fix. Outstanding quality!" }
    ]
  },
  {
    _id: "prov_103",
    name: "Roshan Gamage",
    title: "Inverter AC Technician & Refrigeration Spec",
    category: "AC Repair",
    location: "Kandy",
    rating: 4.7,
    reviewCount: 28,
    hourlyRate: 2800,
    verified: true,
    experienceYears: 8,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Professional air conditioning repair, chemical cleaning, and R32/R410 gas refills for residential split units and cassette systems in Kandy region.",
    availability: [
      { date: "2026-09-10", startTime: "09:00", endTime: "18:00" },
      { date: "2026-09-12", startTime: "08:30", endTime: "14:00" }
    ],
    services: [
      { id: "s301", name: "Full AC Chemical Service", price: 4000, description: "Deep cleaning of indoor evaporator coil, blower, and outdoor unit" },
      { id: "s302", name: "Refrigerant Gas Top-Up (R32 / R410)", price: 3500, description: "Gas pressure check and precision top-up" }
    ],
    reviews: [
      { id: "r4", author: "Mahesh Cooray", rating: 4.8, date: "2026-08-10", comment: "My inverter AC was not cooling properly. Roshan cleaned it thoroughly and now it's super cold!" }
    ]
  },
  {
    _id: "prov_104",
    name: "CleanMaster Lanka (Pvt) Ltd",
    title: "Premium Residential & Office Deep Cleaning",
    category: "Cleaning",
    location: "Colombo",
    rating: 4.9,
    reviewCount: 74,
    hourlyRate: 3000,
    verified: true,
    experienceYears: 6,
    avatar: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&auto=format&fit=crop&q=80",
    bio: "Full home deep cleaning team equipped with industrial steam cleaners, eco-friendly detergents, and sofa extraction machines operating in Colombo and Rajagiriya.",
    availability: [
      { date: "2026-09-10", startTime: "08:00", endTime: "17:00" },
      { date: "2026-09-11", startTime: "08:00", endTime: "17:00" }
    ],
    services: [
      { id: "s401", name: "Full House Deep Cleaning (Up to 1500 sq ft)", price: 18000, description: "Kitchen degreasing, bathroom scrubbing, floor polishing, and window cleaning" },
      { id: "s402", name: "Sofa & Mattress Shampoo Extraction", price: 6000, description: "Deep steam sanitization and stain removal for 5-seater sofa" }
    ],
    reviews: [
      { id: "r5", author: "Anusha Jayasinghe", rating: 5, date: "2026-08-30", comment: "Left our rented apartment spotless before handing it over to the landlord. Worth every rupee!" }
    ]
  },
  {
    _id: "prov_105",
    name: "Bandara Maintenance Services",
    title: "General Handyman, Carpentry & Masonry",
    category: "Home Maintenance",
    location: "Galle",
    rating: 4.6,
    reviewCount: 19,
    hourlyRate: 1800,
    verified: false,
    experienceYears: 10,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    bio: "Reliable handyman in Galle for door lock repair, tile fixing, curtain rod mounting, roof leak patch work, and custom wooden shelf construction.",
    availability: [
      { date: "2026-09-10", startTime: "08:30", endTime: "16:30" },
      { date: "2026-09-11", startTime: "09:00", endTime: "15:00" }
    ],
    services: [
      { id: "s501", name: "Door Lock & Hinges Replacement", price: 2500, description: "Mortise lock fitting and wooden door alignment" },
      { id: "s502", name: "Tile Patch Repair & Grouting", price: 4000, description: "Replace cracked ceramic floor tiles and renew tile grout" }
    ],
    reviews: [
      { id: "r6", author: "Ruwan Abeysekara", rating: 4.5, date: "2026-08-05", comment: "Bandara came promptly to repair our broken teak door lock. Good craftsmanship." }
    ]
  },
  {
    _id: "prov_106",
    name: "GreenThumb Landscaping",
    title: "Landscape Architecture & Garden Maintenance",
    category: "Gardening",
    location: "Negombo",
    rating: 4.8,
    reviewCount: 22,
    hourlyRate: 2000,
    verified: true,
    experienceYears: 7,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    bio: "Professional garden designers and maintenance crew in Negombo. Services include grass turfing, hedge trimming, weed removal, and indoor plant styling.",
    availability: [
      { date: "2026-09-10", startTime: "07:00", endTime: "14:00" },
      { date: "2026-09-12", startTime: "07:00", endTime: "14:00" }
    ],
    services: [
      { id: "s601", name: "Lawn Mowing & Edge Trimming", price: 3500, description: "Includes grass collection and disposal" },
      { id: "s602", name: "Garden Cleanup & Tree Pruning", price: 5500, description: "Trimming overgrown coconut/fruit trees and garden waste haulage" }
    ],
    reviews: [
      { id: "r7", author: "Samantha Ranasinghe", rating: 5, date: "2026-08-12", comment: "Transformed our front lawn in Negombo. Very polite and hardworking team." }
    ]
  },
  {
    _id: "prov_107",
    name: "Nuwan Auto Care Mobile",
    title: "Mobile Auto Mechanic & Battery Service",
    category: "Car Repair",
    location: "Gampaha",
    rating: 4.9,
    reviewCount: 41,
    hourlyRate: 2500,
    verified: true,
    experienceYears: 14,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    bio: "Emergency mobile vehicle breakdown service in Gampaha. On-site jump starts, brake pad replacement, OBD engine diagnostics, and oil change.",
    availability: [
      { date: "2026-09-10", startTime: "08:00", endTime: "20:00" },
      { date: "2026-09-11", startTime: "08:00", endTime: "20:00" }
    ],
    services: [
      { id: "s701", name: "On-Site Computer OBD Scan & Diagnosis", price: 3000, description: "Check engine light scan and sensor diagnostics" },
      { id: "s702", name: "Mobile Engine Oil & Filter Change", price: 4000, description: "Includes oil disposal and multipoint safety check" }
    ],
    reviews: [
      { id: "r8", author: "Kasun Jayawardena", rating: 5, date: "2026-08-25", comment: "Saved me when my battery died near Gampaha station. Reached within 25 minutes!" }
    ]
  },
  {
    _id: "prov_108",
    name: "Colors of Lanka Painters",
    title: "Interior & Exterior Wall Painting Specialists",
    category: "Painting",
    location: "Colombo",
    rating: 4.7,
    reviewCount: 31,
    hourlyRate: 2100,
    verified: true,
    experienceYears: 9,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    bio: "Dulux and Nippon certified painting contractors specializing in residential house repainting, weather seal exterior coats, and dampness waterproofing in Colombo.",
    availability: [
      { date: "2026-09-10", startTime: "09:00", endTime: "17:00" },
      { date: "2026-09-13", startTime: "09:00", endTime: "17:00" }
    ],
    services: [
      { id: "s801", name: "Single Room Interior Painting", price: 12000, description: "Putty smoothing, primer, and two coats of premium emulsion" },
      { id: "s802", name: "Wall Dampness & Waterproof Treatment", price: 15000, description: "Seal anti-fungal coats before final painting" }
    ],
    reviews: [
      { id: "r9", author: "Menaka Wickramasinghe", rating: 4.7, date: "2026-08-18", comment: "Repainted our 3-bedroom house in Rajagiriya. Extremely neat work with zero paint splashes on furniture." }
    ]
  }
];
