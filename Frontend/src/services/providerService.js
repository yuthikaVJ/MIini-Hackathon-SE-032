import { MOCK_PROVIDERS } from '../data/mockProviders.js';
import { SERVICE_CATEGORIES } from '../data/mockServices.js';

/**
 * Service layer abstraction for HelaConnect Provider API.
 * Currently backed by mock data for Hackathon MVP, structured to be 
 * easily swapped with REST API endpoints (e.g. fetch('/api/providers?...')).
 */
export const providerService = {
  /**
   * Fetch all providers with simulated network latency
   */
  async getAllProviders() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...MOCK_PROVIDERS]);
      }, 200);
    });
  },

  /**
   * Fetch single provider by ID
   */
  async getProviderById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const provider = MOCK_PROVIDERS.find((p) => p._id === id);
        if (provider) {
          resolve({ ...provider });
        } else {
          reject(new Error(`Provider with ID '${id}' not found.`));
        }
      }, 150);
    });
  },

  /**
   * Search and filter providers based on service category/keyword, location, date, and preferred time
   */
  async searchProviders({ service = '', location = '', date = '', time = '' }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const queryService = service.trim().toLowerCase();
        const queryLocation = location.trim().toLowerCase();

        const results = MOCK_PROVIDERS.filter((provider) => {
          // Service category or title or service item match
          const matchesService =
            !queryService ||
            provider.category.toLowerCase().includes(queryService) ||
            provider.title.toLowerCase().includes(queryService) ||
            provider.services.some((s) => s.name.toLowerCase().includes(queryService));

          // Location match
          const matchesLocation =
            !queryLocation ||
            provider.location.toLowerCase().includes(queryLocation);

          // Date match (if specified, check if provider has availability on that date)
          const matchesDate =
            !date ||
            provider.availability.some((slot) => slot.date === date);

          // Time match (if specified, verify slot time range)
          const matchesTime =
            !time ||
            provider.availability.some((slot) => {
              // If date is also specified, must match slot date
              if (date && slot.date !== date) return false;
              // Check if time is within slot's startTime and endTime
              return time >= slot.startTime && time <= slot.endTime;
            });

          return matchesService && matchesLocation && matchesDate && matchesTime;
        });

        resolve(results);
      }, 300);
    });
  },

  /**
   * Get list of service categories
   */
  async getServiceCategories() {
    return Promise.resolve([...SERVICE_CATEGORIES]);
  }
};
