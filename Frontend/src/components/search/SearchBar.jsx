import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';
import { SERVICE_CATEGORIES, SRI_LANKA_LOCATIONS } from '../../data/mockServices.js';

function SearchBar({ initialValues = {}, compact = false }) {
  const navigate = useNavigate();

  const [service, setService] = useState(initialValues.service || '');
  const [location, setLocation] = useState(initialValues.location || '');
  const [date, setDate] = useState(initialValues.date || '');
  const [time, setTime] = useState(initialValues.time || '');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setService(initialValues.service || '');
    setLocation(initialValues.location || '');
    setDate(initialValues.date || '');
    setTime(initialValues.time || '');
  }, [initialValues.service, initialValues.location, initialValues.date, initialValues.time]);

  const validate = () => {
    const newErrors = {};

    // Require at least one search filter field if all fields are empty
    if (!service.trim() && !location.trim() && !date && !time) {
      newErrors.service = 'Please select or enter at least one search criterion (service, location, date, or time)';
    }

    // Optional date validation (if provided, must not be in the past)
    if (date) {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const queryParams = new URLSearchParams();
    if (service) queryParams.set('service', service);
    if (location) queryParams.set('location', location);
    if (date) queryParams.set('date', date);
    if (time) queryParams.set('time', time);

    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{
        padding: compact ? 'var(--space-md)' : 'var(--space-lg)',
        width: '100%'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: compact ? 'repeat(auto-fit, minmax(200px, 1fr))' : 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'var(--space-md)',
        alignItems: 'start'
      }}>
        {/* Service Category Input */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Search size={16} color="var(--color-primary)" />
            Service Category
          </label>
          <input
            type="text"
            list="services-list"
            className="form-control"
            placeholder="e.g. Electrical, Plumbing..."
            value={service}
            onChange={(e) => {
              setService(e.target.value);
              if (errors.service) setErrors({ ...errors, service: null });
            }}
          />
          <datalist id="services-list">
            {SERVICE_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.name} />
            ))}
          </datalist>
          {errors.service && (
            <div className="form-error-msg" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <AlertCircle size={13} /> {errors.service}
            </div>
          )}
        </div>

        {/* Location Input */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={16} color="var(--color-primary)" />
            Location / City
          </label>
          <select
            className="form-control"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              if (errors.location) setErrors({ ...errors, location: null });
            }}
          >
            <option value="">Select location...</option>
            {SRI_LANKA_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          {errors.location && (
            <div className="form-error-msg" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <AlertCircle size={13} /> {errors.location}
            </div>
          )}
        </div>

        {/* Date Input */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={16} color="var(--color-primary)" />
            Required Date
          </label>
          <input
            type="date"
            className="form-control"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => {
              setDate(e.target.value);
              if (errors.date) setErrors({ ...errors, date: null });
            }}
          />
          {errors.date && (
            <div className="form-error-msg" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <AlertCircle size={13} /> {errors.date}
            </div>
          )}
        </div>

        {/* Time Input */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={16} color="var(--color-primary)" />
            Preferred Time
          </label>
          <select
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">Any Time</option>
            <option value="09:00">Morning (9:00 AM)</option>
            <option value="12:00">Noon (12:00 PM)</option>
            <option value="14:00">Afternoon (2:00 PM)</option>
            <option value="17:00">Evening (5:00 PM)</option>
          </select>
        </div>
      </div>

      {/* Submit Button Row */}
      <div style={{ marginTop: 'var(--space-md)', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          style={{ width: compact ? '100%' : 'auto', minWidth: '180px' }}
        >
          <Search size={18} />
          Search Providers
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
