import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, UserCheck, Briefcase, User, Mail, MapPin, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { authService } from '../../services/authService.js';

function RegisterModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [role, setRole] = useState('CUSTOMER'); // 'CUSTOMER' (Service Receiver) or 'PROVIDER' (Service Provider)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '0771234567',
    location: 'Colombo'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Name is required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.password || formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    if (!formData.password) errs.password = 'Password is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await authService.registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role,
        phone: formData.phone,
        location: formData.location
      });

      setIsSubmitting(false);
      onClose();
      navigate('/'); // Navigate to home page
    } catch (err) {
      setErrors({ ...errors, email: err.message || 'Registration failed' });
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="card" style={{
        maxWidth: '520px',
        width: '100%',
        padding: '2rem',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '0.3rem'
          }}
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.8rem',
            fontWeight: 'bold',
            fontSize: '1.4rem'
          }}>
            H
          </div>
          <h2 className="heading-card" style={{ fontSize: '1.5rem', color: 'var(--color-secondary)' }}>
            Join HelaConnect
          </h2>
          <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)', marginTop: '0.2rem' }}>
            Register as a Service Receiver or Service Provider
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {/* Role Selector Cards */}
          <div className="form-group">
            <label className="form-label" style={{ marginBottom: '0.4rem' }}>
              I want to register as: <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
              {/* Service Receiver Option */}
              <div
                onClick={() => setRole('CUSTOMER')}
                style={{
                  border: role === 'CUSTOMER' ? '2px solid var(--color-primary)' : '1px solid var(--color-border-light)',
                  backgroundColor: role === 'CUSTOMER' ? 'var(--color-primary-light)' : 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 0.8rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: role === 'CUSTOMER' ? 'var(--color-primary)' : 'var(--color-surface-subtle)',
                  color: role === 'CUSTOMER' ? '#ffffff' : 'var(--color-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.5rem'
                }}>
                  <User size={20} />
                </div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--color-secondary)' }}>
                  Service Receiver
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                  Customer booking services
                </div>
              </div>

              {/* Service Provider Option */}
              <div
                onClick={() => setRole('PROVIDER')}
                style={{
                  border: role === 'PROVIDER' ? '2px solid var(--color-primary)' : '1px solid var(--color-border-light)',
                  backgroundColor: role === 'PROVIDER' ? 'var(--color-primary-light)' : 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 0.8rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: role === 'PROVIDER' ? 'var(--color-primary)' : 'var(--color-surface-subtle)',
                  color: role === 'PROVIDER' ? '#ffffff' : 'var(--color-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.5rem'
                }}>
                  <Briefcase size={20} />
                </div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--color-secondary)' }}>
                  Service Provider
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                  Offering local services
                </div>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="regName">
              Full Name <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <input
              id="regName"
              type="text"
              name="name"
              className="form-control"
              placeholder="e.g. Kasun Fernando"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="form-error-msg">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="regEmail">
              Email Address <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <input
              id="regEmail"
              type="email"
              name="email"
              className="form-control"
              placeholder="e.g. kasun@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="form-error-msg">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="regPassword">
              Password <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <input
              id="regPassword"
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="form-error-msg">{errors.password}</span>}
          </div>

          {/* City / Location */}
          <div className="form-group">
            <label className="form-label" htmlFor="regLocation">
              City / Location
            </label>
            <input
              id="regLocation"
              type="text"
              name="location"
              className="form-control"
              placeholder="e.g. Colombo, Kandy, Galle"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            style={{ marginTop: '0.5rem' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : `Register as ${role === 'PROVIDER' ? 'Service Provider' : 'Service Receiver'}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
