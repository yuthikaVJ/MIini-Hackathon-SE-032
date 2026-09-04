import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Save, FileText, ArrowLeft, Settings } from 'lucide-react';
import { authService } from '../services/authService.js';
import { apiFetch } from '../services/api.js';
import { useNavigate, Link } from 'react-router-dom';
import { SERVICE_CATEGORIES } from '../data/mockServices.js';

function ProviderSettingsPage() {
  const [currentUser] = useState(authService.getCurrentUser());
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceCategory: 'Plumbing',
    location: '',
    experience: '1 year',
    minPrice: 1000,
    description: '',
    availableDays: []
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'PROVIDER') {
      navigate('/');
      return;
    }
    
    const fetchProfile = async () => {
      try {
        const data = await apiFetch('/api/providers/profile/me');
        if (data) {
          setFormData({
            serviceCategory: data.serviceCategory || 'Plumbing',
            location: data.location || currentUser.location || '',
            experience: data.experience || '1 year',
            minPrice: data.minPrice || 1000,
            description: data.description || '',
            availableDays: data.availableDays || []
          });
        }
      } catch (err) {
        // 404 means they don't have a profile yet, which is fine, we'll create one on save.
        if (err.message && !err.message.includes('404')) {
          console.error("Failed to load provider profile", err);
        }
        
        // Pre-fill location from user profile as default
        setFormData(prev => ({
          ...prev,
          location: currentUser.location || ''
        }));
      } finally {
        setLoading(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    
    try {
      await apiFetch('/api/providers/profile', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          minPrice: Number(formData.minPrice)
        })
      });
      
      setMessage("Service profile updated successfully! You will now appear in customer search results with these details.");
    } catch (err) {
      setError(err.message || "Failed to update service profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading your settings...</div>;
  }

  return (
    <div style={{ padding: '2rem 0 5rem', backgroundColor: 'var(--color-bg)' }}>
      <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <Link
          to="/provider/dashboard"
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
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        
        <div className="card" style={{ padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '1.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', marginBottom: '1rem' }}>
              <Settings size={24} />
            </div>
            <h1 className="heading-card" style={{ fontSize: '1.75rem', color: 'var(--color-secondary)' }}>
              Service Details
            </h1>
            <p className="text-muted" style={{ marginTop: '0.5rem', maxWidth: '500px', margin: '0.5rem auto 0' }}>
              Define what you offer. These details will be shown to customers when they search for services.
            </p>
          </div>

          {message && (
            <div style={{
              backgroundColor: 'var(--color-success-bg)',
              color: 'var(--color-success-text)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '2rem',
              textAlign: 'center',
              fontWeight: '600',
              border: '1px solid #a7f3d0'
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
              marginBottom: '2rem',
              textAlign: 'center',
              fontWeight: '600',
              border: '1px solid var(--color-error-border)'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase size={16} color="var(--color-primary)" /> Service Category
              </label>
              <select
                name="serviceCategory"
                className="form-control"
                value={formData.serviceCategory}
                onChange={handleChange}
                required
              >
                {SERVICE_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} color="var(--color-primary)" /> Operating Area (City)
                </label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="e.g. Colombo"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} color="var(--color-primary)" /> Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  className="form-control"
                  placeholder="e.g. 5 Years"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DollarSign size={16} color="var(--color-primary)" /> Base Rate (LKR)
              </label>
              <input
                type="number"
                name="minPrice"
                className="form-control"
                placeholder="e.g. 1500"
                min="0"
                step="50"
                value={formData.minPrice}
                onChange={handleChange}
                required
              />
              <span className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>
                This is the starting price shown on your profile.
              </span>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={16} color="var(--color-primary)" /> Public Bio / Description
              </label>
              <textarea
                name="description"
                className="form-control"
                placeholder="Describe your skills, qualifications, and what makes your service great..."
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full btn-lg"
              disabled={saving}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}
            >
              <Save size={18} /> {saving ? 'Saving Profile...' : 'Save Public Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProviderSettingsPage;
