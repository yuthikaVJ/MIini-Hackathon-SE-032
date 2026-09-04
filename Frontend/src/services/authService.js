import { apiFetch } from './api';

const AUTH_STORAGE_KEY = 'helaconnect_user_v1';
const AUTH_EVENT = 'helaconnect_auth_change';

const DEFAULT_USER = null; // No more default user, must login!

export const authService = {
  getCurrentUser() {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading user profile:", err);
      return null;
    }
  },

  async registerUser({ name, email, role, phone = '', password = 'password123' }) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role: role.toLowerCase(), phone, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      // Save to localStorage (simulate frontend user object)
      const userObj = {
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role.toUpperCase(),
        phone: data.phone || phone,
        avatar: data.role === 'provider'
          ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userObj));
      localStorage.setItem('helaconnect_token', data.token); // Store token for api.js
      window.dispatchEvent(new Event(AUTH_EVENT));
      return userObj;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async loginUser({ email, password = 'password123' }) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      const userObj = {
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role.toUpperCase(),
        avatar: data.role === 'provider'
          ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userObj));
      localStorage.setItem('helaconnect_token', data.token);
      window.dispatchEvent(new Event(AUTH_EVENT));
      return userObj;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem('helaconnect_token');
    window.dispatchEvent(new Event(AUTH_EVENT));
  },

  switchRole(newRole) {
    // Cannot easily switch roles in real backend without admin access
    // Leaving as is for mock compatibility if needed, but not recommended
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
