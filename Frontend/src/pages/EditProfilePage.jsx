import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Save, ArrowLeft } from 'lucide-react';
import { authService } from '../services/authService.js';
import { apiFetch } from '../services/api.js';
import { useNavigate, Link } from 'react-router-dom';

function EditProfilePage() {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }
    
    // Fetch latest profile from backend
    const fetchProfile = async () => {
      try {
        const data = await apiFetch('/api/users/me');
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || ''
        });
      } catch (err) {
        console.error("Failed to load profile", err);
        // Fallback to what we have in localStorage
        setFormData({
          name: currentUser.name || '',
          email: currentUser.email || '',
          phone: currentUser.phone || '',
          location: currentUser.location || ''
        });
      }
    };
    
    fetchProfile();
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    if (!formData.name.trim()) return "Name is required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Please enter a valid email address.";

    if (formData.phone) {
      const phoneRegex = /^(?:\+94|0)\d{9}$/;
      if (!phoneRegex.test(formData.phone)) return "Phone must be 10 digits (e.g., 0771234567 or +94771234567).";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
    
    try {
      const data = await apiFetch('/api/users/me', {
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      
      // Update local storage so Navbar reflects changes immediately
      const updatedUser = {
        ...currentUser,
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.location
      };
      localStorage.setItem('helaconnect_user_v1', JSON.stringify(updatedUser));
      window.dispatchEvent(new Event('helaconnect_auth_change'));
      
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div style={{ padding: '2rem 0 5rem', backgroundColor: 'var(--color-bg)' }}>
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--color-text-muted)',
            fontWeight: '600',
            fontSize: 'var(--font-size-sm)',
            marginBottom: 'var(--space-md)',
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 className="heading-card" style={{ fontSize: '1.75rem', color: 'var(--color-secondary)' }}>
              Edit Profile
            </h1>
            <p className="text-muted" style={{ marginTop: '0.5rem' }}>
              Update your personal information
            </p>
          </div>

          {message && (
            <div style={{
              backgroundColor: 'var(--color-success-bg)',
              color: 'var(--color-success-text)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              {message}
            </div>
          )}

          {error && (
            <div style={{
              backgroundColor: 'var(--color-error-bg)',
              color: 'var(--color-error-text)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '1.2rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={16} color="var(--color-primary)" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.2rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="var(--color-primary)" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.2rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="var(--color-primary)" /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--color-primary)" /> Location / City
              </label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full btn-lg"
              disabled={loading}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            >
              <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
