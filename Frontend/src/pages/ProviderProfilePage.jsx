import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Calendar, Clock, CheckCircle, ArrowLeft, Send, UserCheck, AlertCircle } from 'lucide-react';
import RatingStars from '../components/common/RatingStars.jsx';
import { providerService } from '../services/providerService.js';

function ProviderProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  useEffect(() => {
    async function loadProvider() {
      setLoading(true);
      setError(null);
      try {
        const data = await providerService.getProviderById(id);
        setProvider(data);
        if (data.services && data.services.length > 0) {
          setSelectedServiceId(data.services[0].id);
        }
      } catch (err) {
        setError(err.message || 'Provider profile not found.');
      } finally {
        setLoading(false);
      }
    }
    loadProvider();
  }, [id]);

  const handleRequestServiceCTA = () => {
    // Integration handoff target for Member 2's booking module:
    const targetUrl = `/booking/new?providerId=${id}${selectedServiceId ? `&serviceId=${selectedServiceId}` : ''}`;
    navigate(targetUrl);
  };

  // Loading State
  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: '500' }}>Loading provider profile...</p>
      </div>
    );
  }

  // Provider Not Found State
  if (error || !provider) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="card" style={{
          backgroundColor: 'var(--color-error-bg)',
          color: 'var(--color-error-text)',
          padding: '2rem',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <AlertCircle size={40} style={{ margin: '0 auto 1rem', color: 'var(--color-error)' }} />
          <h2 className="heading-card" style={{ color: 'var(--color-error-text)', marginBottom: '0.5rem' }}>
            Provider not found
          </h2>
          <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: '1.5rem' }}>
            The requested service provider profile could not be found or has been removed.
          </p>
          <Link to="/search" className="btn btn-primary" style={{ margin: '0 auto' }}>
            <ArrowLeft size={16} /> Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0 5rem' }}>
      <div className="container">
        {/* Back to Results Navigation Link */}
        <Link
          to="/search"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--color-text-muted)',
            fontWeight: '600',
            fontSize: 'var(--font-size-sm)',
            marginBottom: 'var(--space-md)'
          }}
        >
          <ArrowLeft size={16} /> Back to Results
        </Link>

        {/* Profile Header Banner Card */}
        <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <div style={{
            display: 'flex',
            gap: 'var(--space-lg)',
            alignItems: 'flex-start',
            flexWrap: 'wrap'
          }}>
            <img
              src={provider.avatar || 'https://via.placeholder.com/120'}
              alt={provider.name}
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid var(--color-primary-light)'
              }}
            />

            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <h1 className="heading-section" style={{ fontSize: '1.8rem', color: 'var(--color-secondary)' }}>
                  {provider.name}
                </h1>
                {provider.verified && (
                  <span className="badge badge-verified">
                    <ShieldCheck size={14} /> Verified
                  </span>
                )}
                <span className="badge badge-primary">{provider.category}</span>
              </div>

              <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-muted)', fontWeight: '500', marginTop: '0.2rem' }}>
                {provider.title}
              </p>

              <div style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: 'var(--space-sm)'
              }}>
                <RatingStars rating={provider.rating} reviewCount={provider.reviewCount} size={18} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  <MapPin size={16} color="var(--color-primary)" />
                  <span>{provider.location}, Sri Lanka</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  <UserCheck size={16} color="var(--color-success)" />
                  <span>{provider.experienceYears || 5}+ Years Experience</span>
                </div>
              </div>
            </div>

            {/* Price Box & Request CTA */}
            <div style={{
              backgroundColor: 'var(--color-surface-subtle)',
              padding: 'var(--space-md) var(--space-lg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border-light)',
              textAlign: 'right',
              minWidth: '220px'
            }}>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                Hourly Rate
              </span>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-secondary)', margin: '0.2rem 0' }}>
                LKR {provider.hourlyRate.toLocaleString()}
              </div>
              <button
                onClick={() => setShowRequestModal(true)}
                className="btn btn-primary btn-full btn-lg"
                style={{ marginTop: '0.6rem' }}
              >
                <Send size={18} /> Request Service
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-xl)' }} className="profile-grid">
          {/* Left Column: Bio, Offered Services & Reviews */}
          <div>
            {/* Bio / Description */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
              <h3 className="heading-card" style={{ marginBottom: 'var(--space-sm)' }}>About Provider</h3>
              <p className="text-body" style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                {provider.bio}
              </p>
            </div>

            {/* Offered Services List & Prices */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
              <h3 className="heading-card" style={{ marginBottom: 'var(--space-md)' }}>Services Offered</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {provider.services && provider.services.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    style={{
                      border: selectedServiceId === srv.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border-light)',
                      backgroundColor: selectedServiceId === srv.id ? 'var(--color-primary-light)' : 'var(--color-surface)',
                      borderRadius: 'var(--radius-md)',
                      padding: 'var(--space-md)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'var(--transition)'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={18} color={selectedServiceId === srv.id ? 'var(--color-primary)' : 'var(--color-text-subtle)'} />
                        <h4 className="heading-card" style={{ fontSize: 'var(--font-size-base)' }}>{srv.name}</h4>
                      </div>
                      {srv.description && (
                        <p className="text-muted" style={{ marginTop: '0.2rem', paddingLeft: '1.6rem' }}>
                          {srv.description}
                        </p>
                      )}
                    </div>
                    <div style={{ fontWeight: '800', color: 'var(--color-primary)', fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
                      LKR {srv.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                <h3 className="heading-card">Customer Reviews ({provider.reviews ? provider.reviews.length : 0})</h3>
                <RatingStars rating={provider.rating} reviewCount={provider.reviewCount} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {provider.reviews && provider.reviews.map((rev) => (
                  <div key={rev.id} style={{
                    padding: 'var(--space-md)',
                    backgroundColor: 'var(--color-surface-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-light)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: '700', fontSize: 'var(--font-size-sm)', color: 'var(--color-secondary)' }}>{rev.author}</span>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-subtle)' }}>{rev.date}</span>
                    </div>
                    <div style={{ marginBottom: '0.4rem' }}>
                      <RatingStars rating={rev.rating} showScore={false} size={14} />
                    </div>
                    <p className="text-body" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Availability & Booking CTA Panel */}
          <aside>
            <div className="card" style={{ position: 'sticky', top: '90px' }}>
              <h3 className="heading-card" style={{ marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={18} color="var(--color-primary)" />
                Available Slots
              </h3>

              {/* Simple Readable Availability Schedule */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', marginBottom: 'var(--space-lg)' }}>
                {provider.availability && provider.availability.map((slot, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-xs) var(--space-sm)',
                    backgroundColor: 'var(--color-surface-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border-light)',
                    fontSize: 'var(--font-size-xs)'
                  }}>
                    <div style={{ fontWeight: '600', color: 'var(--color-secondary)' }}>{slot.date}</div>
                    <div style={{ color: 'var(--color-primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={13} /> {slot.startTime} - {slot.endTime}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Action */}
              <button
                onClick={() => setShowRequestModal(true)}
                className="btn btn-primary btn-full btn-lg"
              >
                <Send size={18} /> Request Service
              </button>

              <p className="text-subtle" style={{ textAlign: 'center', marginTop: 'var(--space-xs)' }}>
                Booking Handoff Target: <br />
                <code>/booking/new?providerId={provider._id}</code>
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Request Service Handoff Modal */}
      {showRequestModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="card" style={{
            maxWidth: '480px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-xs)'
              }}>
                <Send size={28} />
              </div>

              <h3 className="heading-card" style={{ fontSize: '1.4rem' }}>Request Service</h3>
              <p className="text-muted" style={{ marginTop: '0.3rem' }}>
                Confirm service details for <strong>{provider.name}</strong> ({provider.category}).
              </p>
            </div>

            <div style={{
              backgroundColor: 'var(--color-surface-subtle)',
              padding: 'var(--space-md)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-sm)',
              marginBottom: 'var(--space-lg)',
              border: '1px solid var(--color-border-light)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span className="text-muted">Provider ID:</span>
                <span style={{ fontWeight: '600' }}>{provider._id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span className="text-muted">Selected Service:</span>
                <span style={{ fontWeight: '600' }}>
                  {provider.services.find(s => s.id === selectedServiceId)?.name || 'General Service'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span className="text-muted">Hourly Rate:</span>
                <span style={{ fontWeight: '600' }}>LKR {provider.hourlyRate.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Location:</span>
                <span style={{ fontWeight: '600' }}>{provider.location}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
              <button
                onClick={() => setShowRequestModal(false)}
                className="btn btn-secondary btn-full"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestServiceCTA}
                className="btn btn-primary btn-full"
              >
                Proceed to Booking &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .profile-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ProviderProfilePage;
