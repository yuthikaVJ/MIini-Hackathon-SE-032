import { MOCK_PROVIDERS } from '../data/mockProviders.js';

const STORAGE_KEY = 'helaconnect_bookings_v1';

// Available time slot presets for provider confirmation
export const AVAILABLE_TIME_SLOTS = [
  '09:00 AM – 10:00 AM',
  '10:00 AM – 11:00 AM',
  '11:00 AM – 12:00 PM',
  '01:00 PM – 02:00 PM',
  '02:00 PM – 03:00 PM',
  '03:00 PM – 04:00 PM',
  '04:00 PM – 05:00 PM'
];

// Initial mock bookings representing the complete lifecycle
const INITIAL_BOOKINGS = [
  {
    _id: "book_201",
    customerId: "cust_01",
    customerName: "Nimal Perera",
    customerPhone: "0771234567",
    providerId: "prov_101",
    providerName: "Kamal Perera",
    providerCategory: "Electrical",
    serviceId: "s101",
    serviceName: "Wiring & Safety Inspection",
    requestedDate: "2026-09-10",
    requestedTime: "02:00 PM",
    confirmedDate: null,
    confirmedTimeSlot: null,
    location: "Colombo 03",
    description: "Trip switch keeps tripping whenever AC is switched on. Need urgent inspection.",
    status: "PENDING",
    createdAt: "2026-09-04T08:30:00.000Z"
  },
  {
    _id: "book_202",
    customerId: "cust_01",
    customerName: "Nimal Perera",
    customerPhone: "0771234567",
    providerId: "prov_102",
    providerName: "Sunil Shantha",
    providerCategory: "Plumbing",
    serviceId: "s201",
    serviceName: "Pipe Leak Repair & Pressure Testing",
    requestedDate: "2026-09-11",
    requestedTime: "10:00 AM",
    confirmedDate: null,
    confirmedTimeSlot: null,
    location: "Colombo 03",
    description: "Under-sink water leakage in main bathroom.",
    status: "ACCEPTED",
    createdAt: "2026-09-03T14:15:00.000Z"
  },
  {
    _id: "book_203",
    customerId: "cust_01",
    customerName: "Nimal Perera",
    customerPhone: "0771234567",
    providerId: "prov_103",
    providerName: "Roshan Gamage",
    providerCategory: "AC Repair",
    serviceId: "s301",
    serviceName: "Full AC Chemical Service",
    requestedDate: "2026-09-12",
    requestedTime: "09:00 AM",
    confirmedDate: "2026-09-12",
    confirmedTimeSlot: "09:00 AM – 10:00 AM",
    location: "Colombo 03",
    description: "Living room inverter AC requires deep chemical clean.",
    status: "CONFIRMED",
    createdAt: "2026-09-02T11:00:00.000Z"
  },
  {
    _id: "book_204",
    customerId: "cust_01",
    customerName: "Nimal Perera",
    customerPhone: "0771234567",
    providerId: "prov_105",
    providerName: "Bandara Maintenance Services",
    providerCategory: "Home Maintenance",
    serviceId: "s501",
    serviceName: "Door Lock & Hinges Replacement",
    requestedDate: "2026-09-08",
    requestedTime: "03:00 PM",
    confirmedDate: null,
    confirmedTimeSlot: null,
    location: "Colombo 03",
    description: "Teak main door lock cylinder replacement.",
    status: "REJECTED",
    createdAt: "2026-09-01T09:45:00.000Z"
  },
  {
    _id: "book_205",
    customerId: "cust_02",
    customerName: "Kasun Silva",
    customerPhone: "0719876543",
    providerId: "prov_101",
    providerName: "Kamal Perera",
    providerCategory: "Electrical",
    serviceId: "s103",
    serviceName: "Light Fixture & Fan Installation",
    requestedDate: "2026-09-10",
    requestedTime: "04:00 PM",
    confirmedDate: null,
    confirmedTimeSlot: null,
    location: "Dehiwala",
    description: "Installation of 2 ceiling fans and 4 LED downlights.",
    status: "PENDING",
    createdAt: "2026-09-04T09:10:00.000Z"
  }
];

function getStoredBookings() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return [...INITIAL_BOOKINGS];
    }
    return JSON.parse(data);
  } catch (err) {
    console.error("Error accessing localStorage bookings:", err);
    return [...INITIAL_BOOKINGS];
  }
}

function saveBookings(bookings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
}

export const bookingService = {
  /**
   * Create a new booking request
   */
  async createBooking(bookingData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!bookingData.providerId || !bookingData.serviceName || !bookingData.requestedDate || !bookingData.location) {
          reject(new Error("Missing required booking parameters."));
          return;
        }

        const bookings = getStoredBookings();
        const newBooking = {
          _id: `book_${Date.now()}`,
          customerId: bookingData.customerId || "cust_01",
          customerName: bookingData.customerName || "Nimal Perera",
          customerPhone: bookingData.customerPhone || "0771234567",
          providerId: bookingData.providerId,
          providerName: bookingData.providerName || "Service Provider",
          providerCategory: bookingData.providerCategory || "Service",
          serviceId: bookingData.serviceId || "srv_custom",
          serviceName: bookingData.serviceName,
          requestedDate: bookingData.requestedDate,
          requestedTime: bookingData.requestedTime || "09:00 AM",
          confirmedDate: null,
          confirmedTimeSlot: null,
          location: bookingData.location,
          description: bookingData.description || "",
          status: "PENDING",
          createdAt: new Date().toISOString()
        };

        const updated = [newBooking, ...bookings];
        saveBookings(updated);
        resolve(newBooking);
      }, 300);
    });
  },

  /**
   * Get all bookings for a specific customer
   */
  async getCustomerBookings(customerId = "cust_01") {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookings = getStoredBookings();
        // If customerId is cust_01, return cust_01 bookings or default list
        const filtered = bookings.filter(b => b.customerId === customerId || !b.customerId);
        resolve(filtered);
      }, 200);
    });
  },

  /**
   * Get all bookings for a specific provider
   */
  async getProviderBookings(providerId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookings = getStoredBookings();
        // If providerId is passed, filter for that provider, or if no providerId passed, return all for general view
        const filtered = providerId
          ? bookings.filter(b => b.providerId === providerId)
          : bookings;
        resolve(filtered);
      }, 200);
    });
  },

  /**
   * Provider accepts a booking request (changes status to ACCEPTED)
   */
  async acceptBooking(bookingId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const bookings = getStoredBookings();
        const index = bookings.findIndex(b => b._id === bookingId);
        if (index === -1) {
          reject(new Error("Booking not found."));
          return;
        }

        bookings[index].status = "ACCEPTED";
        saveBookings(bookings);
        resolve(bookings[index]);
      }, 200);
    });
  },

  /**
   * Provider rejects a booking request (changes status to REJECTED)
   */
  async rejectBooking(bookingId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const bookings = getStoredBookings();
        const index = bookings.findIndex(b => b._id === bookingId);
        if (index === -1) {
          reject(new Error("Booking not found."));
          return;
        }

        bookings[index].status = "REJECTED";
        bookings[index].confirmedDate = null;
        bookings[index].confirmedTimeSlot = null;
        saveBookings(bookings);
        resolve(bookings[index]);
      }, 200);
    });
  },

  /**
   * Provider confirms actual service time slot (changes status to CONFIRMED)
   */
  async confirmBookingTimeSlot(bookingId, confirmedDate, timeSlot) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const bookings = getStoredBookings();
        const index = bookings.findIndex(b => b._id === bookingId);
        if (index === -1) {
          reject(new Error("Booking not found."));
          return;
        }

        bookings[index].status = "CONFIRMED";
        bookings[index].confirmedDate = confirmedDate || bookings[index].requestedDate;
        bookings[index].confirmedTimeSlot = timeSlot;
        saveBookings(bookings);
        resolve(bookings[index]);
      }, 200);
    });
  },

  /**
   * Reset mock data to initial state (utility)
   */
  async resetMockData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
    return [...INITIAL_BOOKINGS];
  }
};
