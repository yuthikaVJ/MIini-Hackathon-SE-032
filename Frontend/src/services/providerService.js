import { apiFetch } from './api';
import { SERVICE_CATEGORIES } from '../data/mockServices.js';

// Map backend provider schema to frontend expected schema
const mapProvider = (backendProv) => {
  return {
    _id: backendProv.user?._id || backendProv._id, // use User ID for booking references
    profileId: backendProv._id,
    name: backendProv.user?.name || 'Service Provider',
    title: backendProv.user?.name || 'Service Provider',
    category: backendProv.serviceCategory || 'General',
    location: backendProv.location || 'Unknown',
    rating: backendProv.rating || 0,
    reviewCount: backendProv.reviewCount || 0,
    hourlyRate: backendProv.minPrice || 1000, // Ensure it's a number for toLocaleString()
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80',
    bio: backendProv.description || 'No description provided.',
    experienceYears: backendProv.experience ? parseInt(backendProv.experience) || 5 : 5,
    services: [
      { 
        id: 's1', 
        name: `${backendProv.serviceCategory || 'General'} Service`, 
        price: backendProv.minPrice || 1000, 
        description: 'Standard service booking'
      }
    ],
    availability: (backendProv.availableDays || []).map((day, idx) => ({
      date: day, 
      day: day,
      startTime: '09:00 AM',
      endTime: '05:00 PM'
    })),
    reviews: [],
    contact: {
      phone: backendProv.user?.phone || '',
      email: backendProv.user?.email || ''
    }
  };
};

export const providerService = {
  async getAllProviders() {
    try {
      const data = await apiFetch('/api/providers');
      return data.map(mapProvider);
    } catch (err) {
      console.error('Error fetching providers:', err);
      return [];
    }
  },

  async getProviderById(id) {
    try {
      // In our backend, the API /api/providers/:id expects the user ID (since bookings use user ID)
      // Actually, wait, let's fetch all and find the one. The backend GET /api/providers/:id expects profile ID or user ID?
      // Our backend GET /api/providers fetches all. Let's just fetch all and filter by user._id for the frontend mock compatibility.
      const data = await apiFetch('/api/providers');
      const provider = data.find(p => p.user?._id === id || p._id === id);
      if (!provider) throw new Error('Provider not found');
      return mapProvider(provider);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async searchProviders({ service = '', location = '', date = '', time = '' }) {
    try {
      const providers = await this.getAllProviders();
      
      const queryService = service.trim().toLowerCase();
      const queryLocation = location.trim().toLowerCase();

      return providers.filter((provider) => {
        const matchesService =
          !queryService ||
          provider.category.toLowerCase().includes(queryService) ||
          provider.title.toLowerCase().includes(queryService);

        const matchesLocation =
          !queryLocation ||
          provider.location.toLowerCase().includes(queryLocation);

        const matchesDate =
          !date ||
          provider.availability.some((slot) => slot.date === date);

        return matchesService && matchesLocation && matchesDate;
      });
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  async getServiceCategories() {
    return Promise.resolve([...SERVICE_CATEGORIES]);
  }
};
