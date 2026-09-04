const AUTH_STORAGE_KEY = 'helaconnect_user_v1';
const AUTH_EVENT = 'helaconnect_auth_change';

const DEFAULT_USER = {
  id: "usr_101",
  name: "Nimal Perera",
  email: "nimal@helaconnect.lk",
  role: "CUSTOMER", // "CUSTOMER" (Service Receiver) or "PROVIDER" (Service Provider)
  phone: "0771234567",
  location: "Colombo",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
};

export const authService = {
  getCurrentUser() {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEFAULT_USER));
        return { ...DEFAULT_USER };
      }
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading user profile:", err);
      return { ...DEFAULT_USER };
    }
  },

  registerUser({ name, email, role, phone = '', location = '' }) {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role: role.toUpperCase(), // 'CUSTOMER' or 'PROVIDER'
      phone: phone.trim() || '0771234567',
      location: location.trim() || 'Colombo',
      avatar: role.toUpperCase() === 'PROVIDER'
        ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    window.dispatchEvent(new Event(AUTH_EVENT));
    return newUser;
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
  },

  switchRole(newRole) {
    const current = this.getCurrentUser();
    if (current) {
      current.role = newRole.toUpperCase();
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(current));
      window.dispatchEvent(new Event(AUTH_EVENT));
    }
  },

  onAuthChange(callback) {
    const handler = () => callback(this.getCurrentUser());
    window.addEventListener(AUTH_EVENT, handler);
    return () => window.removeEventListener(AUTH_EVENT, handler);
  }
};
