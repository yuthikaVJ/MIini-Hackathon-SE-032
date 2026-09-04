import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, FileText, User, Phone, CheckCircle, ArrowLeft, Send, ShieldCheck, AlertCircle } from 'lucide-react';
import { providerService } from '../services/providerService.js';
import { bookingService, AVAILABLE_TIME_SLOTS } from '../services/bookingService.js';

function RequestServicePage() {
  const { providerId: routeProviderId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const providerId = routeProviderId || searchParams.get('providerId') || 'prov_101';
  const initialServiceId = searchParams.get('serviceId');

  const [provider, setProvider] = useState(null);
  const [loadingProvider, setLoadingProvider] = useState(true);
  const [providerError, setProviderError] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    serviceId: '',
    serviceName: '',
    customerName: 'Nimal Perera',
    customerPhone: '0771234567',
    requestedDate: '',
    requestedTime: '09:00 AM',
    location: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  // Fetch provider data on mount
  useEffect(() => {
    async function loadProvider() {
      setLoadingProvider(true);
      setProviderError(null);
      try {
        const data = await providerService.getProviderById(providerId);
        setProvider(data);

        // Pre-select service
        let defaultService = data.services && data.services.length > 0 ? data.services[0] : null;
        if (initialServiceId && data.services) {
          const found = data.services.find(s => s.id === initialServiceId);
          if (found) defaultService = found;
        }

        setFormData(prev => ({
          ...prev,
          serviceId: defaultService ? defaultService.id : 's101',
          serviceName: defaultService ? defaultService.name : data.category,
          location: data.location || 'Colombo'
        }));
      } catch (err) {
        setProviderError("Service provider details could not be loaded.");
      } finally {
        setLoadingProvider(false);
      }
    }
    loadProvider();
  }, [providerId, initialServiceId]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // If changing service select dropdown
    if (name === 'serviceId' && provider && provider.services) {
      const selected = provider.services.find(s => s.id === value);
      if (selected) {
        setFormData(prev => ({ ...prev, serviceId: value, serviceName: selected.name }));
      }
    }

    // Clear error for edited field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required.';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Contact phone number is required.';
    } else if (!/^[0-9+\-\s]{9,15}$/.test(formData.customerPhone.trim())) {
      newErrors.customerPhone = 'Please enter a valid phone number.';
    }

    if (!formData.requestedDate) {
      newErrors.requestedDate = 'Preferred service date is required.';
    } else {
      const selectedDate = new Date(formData.requestedDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.requestedDate = 'Service date cannot be in the past.';
      }
    }

    if (!formData.requestedTime) {
      newErrors.requestedTime = 'Preferred time slot is required.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Service location address is required.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please describe your requirement or problem.';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description should be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const createdBooking = await bookingService.createBooking({
        providerId: provider._id,
        providerName: provider.name,
        providerCategory: provider.category,
        serviceId: formData.serviceId,
        serviceName: formData.serviceName,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        requestedDate: formData.requestedDate,
        requestedTime: formData.requestedTime,
        location: formData.location,
        description: formData.description
      });

      setSubmitSuccess(createdBooking);
    } catch (err) {
      setErrors({ form: err.message || 'Failed to submit booking request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingProvider) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: '500' }}>Loading service booking form...</p>
      </div>
    );
  }

  if (providerError || !provider) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="card" style={{ backgroundColor: 'var(--color-error-bg)', color: 'var(--color-error-text)', padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
          <AlertCircle size={40} style={{ margin: '0 auto 1rem', color: 'var(--color-error)' }} />
          <h2 className="heading-card" style={{ color: 'var(--color-error-text)' }}>Provider Information Unavailable</h2>
          <p style={{ margin: '0.8rem 0 1.5rem', fontSize: 'var(--font-size-sm)' }}>
            We could not retrieve the details for this provider.
          </p>
          <Link to="/search" className="btn btn-primary"><ArrowLeft size={16} /> Back to Search</Link>
        </div>
      </div>
    );
  }

  // Submission Success View
  if (submitSuccess) {
    return (
      <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '650px', margin: '0 auto' }}>
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem 2rem', borderTop: '4px solid var(--color-success)' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <CheckCircle size={36} />
          </div>

          <h2 className="heading-section" style={{ color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>
            Service Request Submitted!
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', marginBottom: '1.5rem' }}>
            Your booking request has been sent to <strong>{submitSuccess.providerName}</strong>. You can check the status on your dashboard.
          </p>

          <div style={{
            backgroundColor: 'var(--color-surface-subtle)',
            padding: '1.2rem',
            borderRadius: 'var(--radius-md)',
            textAlign: 'left',
            marginBottom: '2rem',
            border: '1px solid var(--color-border-light)',
            fontSize: 'var(--font-size-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px dashed #cbd5e1' }}>
              <span className="text-muted">Request ID:</span>
              <strong style={{ color: 'var(--color-secondary)' }}>{submitSuccess._id}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px dashed #cbd5e1' }}>
              <span className="text-muted">Provider:</span>
              <strong>{submitSuccess.providerName} ({submitSuccess.providerCategory})</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px dashed #cbd5e1' }}>
              <span className="text-muted">Requested Service:</span>
              <strong>{submitSuccess.serviceName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px dashed #cbd5e1' }}>
              <span className="text-muted">Date & Time:</span>
              <strong>{submitSuccess.requestedDate} at {submitSuccess.requestedTime}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.4rem' }}>
              <span className="text-muted">Status:</span>
              <span className="badge badge-accent">PENDING</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/customer/dashboard" className="btn btn-primary btn-lg">
              Go to My Bookings Dashboard &rarr;
            </Link>
            <Link to={`/providers/${provider._id}`} className="btn btn-secondary btn-lg">
              Back to Provider Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0 4rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <Link
          to={`/providers/${provider._id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--color-text-muted)',
            fontWeight: '600',
            fontSize: 'var(--font-size-sm)',
            marginBottom: '1.5rem'
          }}
        >
          <ArrowLeft size={16} /> Back to Provider Profile
        </Link>

        {/* Selected Provider Card Banner */}
        <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--color-primary-light)', borderColor: '#bae6fd' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <img
              src={provider.avatar || 'https://via.placeholder.com/80'}
              alt={provider.name}
              style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ flex: 1, minWidth: '220px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <h3 className="heading-card" style={{ fontSize: '1.2rem', color: 'var(--color-secondary)' }}>{provider.name}</h3>
                {provider.verified && <span className="badge badge-verified"><ShieldCheck size={12} /> Verified</span>}
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                {provider.title} • <strong>{provider.location}</strong>
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="text-subtle">Rate</span>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-primary)' }}>
                LKR {provider.hourlyRate ? provider.hourlyRate.toLocaleString() : 'N/A'}/hr
              </div>
            </div>
          </div>
        </div>

        {/* Request Form Card */}
        <div className="card">
          <div style={{ borderBottom: '1px solid var(--color-border-light)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <h1 className="heading-section" style={{ fontSize: '1.5rem' }}>Request Service</h1>
            <p className="text-muted">Fill out the booking details to submit a formal request to this provider.</p>
          </div>

          {errors.form && (
            <div style={{
              backgroundColor: 'var(--color-error-bg)',
              color: 'var(--color-error-text)',
              padding: '0.8rem 1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              fontSize: 'var(--font-size-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={18} />
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Service & Provider */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="providerDisplay">
                  Provider
                </label>
                <input
                  id="providerDisplay"
                  type="text"
                  className="form-control"
                  value={provider.name}
                  disabled
                  readOnly
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="serviceId">
                  Select Service <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <select
                  id="serviceId"
                  name="serviceId"
                  className="form-control"
                  value={formData.serviceId}
                  onChange={handleChange}
                >
                  {provider.services && provider.services.map(srv => (
                    <option key={srv.id} value={srv.id}>
                      {srv.name} (LKR {srv.price ? srv.price.toLocaleString() : 'N/A'})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preferred Date & Preferred Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="requestedDate">
                  Preferred Date <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="requestedDate"
                    type="date"
                    name="requestedDate"
                    className="form-control"
                    value={formData.requestedDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                {errors.requestedDate && <span className="form-error-msg">{errors.requestedDate}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="requestedTime">
                  Preferred Time <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <select
                  id="requestedTime"
                  name="requestedTime"
                  className="form-control"
                  value={formData.requestedTime}
                  onChange={handleChange}
                >
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
                {errors.requestedTime && <span className="form-error-msg">{errors.requestedTime}</span>}
              </div>
            </div>

            {/* Customer Name & Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="customerName">
                  Your Name <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <input
                  id="customerName"
                  type="text"
                  name="customerName"
                  className="form-control"
                  placeholder="e.g. Nimal Perera"
                  value={formData.customerName}
                  onChange={handleChange}
                />
                {errors.customerName && <span className="form-error-msg">{errors.customerName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="customerPhone">
                  Phone Number <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <input
                  id="customerPhone"
                  type="tel"
                  name="customerPhone"
                  className="form-control"
                  placeholder="e.g. 0771234567"
                  value={formData.customerPhone}
                  onChange={handleChange}
                />
                {errors.customerPhone && <span className="form-error-msg">{errors.customerPhone}</span>}
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label" htmlFor="location">
                Service Location / Address <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                id="location"
                type="text"
                name="location"
                className="form-control"
                placeholder="e.g. No. 45, Galle Road, Colombo 03"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && <span className="form-error-msg">{errors.location}</span>}
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Describe your requirement / Problem description <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="form-control"
                style={{ height: 'auto', resize: 'vertical' }}
                placeholder="Describe what work needs to be done, specific problems, or special requests..."
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <span className="form-error-msg">{errors.description}</span>}
            </div>

            {/* Submit Action */}
            <div style={{ marginTop: '1rem' }}>
              <button
                type="submit"
                className="btn btn-primary btn-full btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <Send size={18} /> Submit Booking Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default RequestServicePage;
