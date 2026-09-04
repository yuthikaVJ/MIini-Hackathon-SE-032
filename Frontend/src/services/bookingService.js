import { apiFetch } from './api';

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

const mapBooking = (b) => {
  return {
    _id: b._id,
    customerId: b.customer?._id,
    customerName: b.customer?.name || 'Customer',
    customerPhone: b.customer?.phone || '',
    providerId: b.provider?.user?._id || b.provider?._id,
    providerName: b.provider?.user?.name || 'Provider',
    providerCategory: b.provider?.serviceCategory || 'Service',
    serviceName: b.service || 'Service',
    requestedDate: b.requestedDate ? new Date(b.requestedDate).toISOString().split('T')[0] : '',
    confirmedTimeSlot: b.assignedTimeSlot || null,
    location: b.customer?.location || 'Not provided',
    description: b.description || '',
    status: (b.status || 'PENDING').toUpperCase(),
    createdAt: b.createdAt
  };
};

export const bookingService = {
  async createBooking(bookingData) {
    try {
      const data = await apiFetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify({
          providerId: bookingData.providerId,
          service: bookingData.serviceName,
          description: bookingData.description,
          requestedDate: bookingData.requestedDate
        })
      });
      return mapBooking(data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async getCustomerBookings(customerId) {
    try {
      const data = await apiFetch('/api/bookings/my-requests');
      return data.map(mapBooking);
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  async getProviderBookings(providerId) {
    try {
      const data = await apiFetch('/api/bookings/provider-requests');
      return data.map(mapBooking);
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  async acceptBooking(bookingId) {
    try {
      // By default, assigning an arbitrary time slot if none provided in this specific function call
      const data = await apiFetch(`/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'accepted', assignedTimeSlot: '10:00 AM' })
      });
      return mapBooking(data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async rejectBooking(bookingId) {
    try {
      const data = await apiFetch(`/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'rejected' })
      });
      return mapBooking(data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async confirmBookingTimeSlot(bookingId, confirmedDate, timeSlot) {
    try {
      const data = await apiFetch(`/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'accepted', assignedTimeSlot: timeSlot })
      });
      return mapBooking(data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async resetMockData() {
    return [];
  }
};
