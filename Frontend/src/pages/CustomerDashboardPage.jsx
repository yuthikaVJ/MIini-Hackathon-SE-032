import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, PlusCircle, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import BookingStatusBadge from '../components/booking/BookingStatusBadge.jsx';
import { bookingService } from '../services/bookingService.js';

function CustomerDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await bookingService.getCustomerBookings('cust_01');
      setBookings(data);
    } catch (err) {
      console.error("Error loading customer bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleResetData = async () => {
    await bookingService.resetMockData();
    await loadBookings();
  };

  // Filter Bookings
  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'PENDING') return b.status === 'PENDING';
    if (activeTab === 'CONFIRMED') return b.status === 'CONFIRMED' || b.status === 'ACCEPTED';
    if (activeTab === 'REJECTED') return b.status === 'REJECTED';
    return true;
  });

  return (
    <div style={{ padding: '2rem 0 5rem' }}>
      <div className="container">
        {/* Header Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--color-border-light)',
          paddingBottom: '1.2rem'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Customer Portal
            </span>
            <h1 className="heading-section" style={{ fontSize: '1.8rem', color: 'var(--color-secondary)' }}>
              My Bookings
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleResetData}
              className="btn btn-secondary"
              title="Reset mock data to initial demo state"
            >
              <RefreshCw size={16} /> Reset Demo Data
            </button>
            <Link to="/search" className="btn btn-primary">
              <PlusCircle size={18} /> Book New Service
            </Link>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--color-border-light)',
          paddingBottom: '0.5rem',
          overflowX: 'auto'
        }}>
          {[
            { id: 'ALL', label: `All Requests (${bookings.length})` },
            { id: 'PENDING', label: `Pending (${bookings.filter(b => b.status === 'PENDING').length})` },
            { id: 'CONFIRMED', label: `Confirmed & Accepted (${bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'ACCEPTED').length})` },
            { id: 'REJECTED', label: `Rejected (${bookings.filter(b => b.status === 'REJECTED').length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : 'var(--color-text-muted)',
                fontWeight: '600',
                fontSize: 'var(--font-size-sm)',
                transition: 'var(--transition)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}>
            <p style={{ fontSize: 'var(--font-size-lg)' }}>Loading your booking history...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredBookings.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
            <AlertCircle size={44} color="var(--color-text-subtle)" style={{ margin: '0 auto 1rem' }} />
            <h3 className="heading-card" style={{ marginBottom: '0.5rem' }}>No Bookings Found</h3>
            <p className="text-muted" style={{ maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              {activeTab === 'ALL'
                ? "You haven't requested any services yet. Discover top local service experts now!"
                : `No bookings found with status '${activeTab}'.`}
            </p>
            <Link to="/search" className="btn btn-primary">Find Services</Link>
          </div>
        )}

        {/* Bookings Cards List */}
        {!loading && filteredBookings.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredBookings.map(booking => (
              <div
                key={booking._id}
                className="card"
                style={{
                  borderLeft: booking.status === 'CONFIRMED'
                    ? '4px solid var(--color-success)'
                    : booking.status === 'ACCEPTED'
                    ? '4px solid var(--color-primary)'
                    : booking.status === 'REJECTED'
                    ? '4px solid var(--color-error)'
                    : '4px solid var(--color-warning)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                      {booking.providerCategory || 'Service'}
                    </span>
                    <h3 className="heading-card" style={{ fontSize: '1.3rem', color: 'var(--color-secondary)' }}>
                      {booking.serviceName}
                    </h3>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                      <User size={15} color="var(--color-primary)" />
                      Provider: <strong>{booking.providerName}</strong>
                    </p>
                  </div>

                  <div>
                    <BookingStatusBadge status={booking.status} showDescription={true} />
                  </div>
                </div>

                {/* Confirmed Appointment Highlight Banner (When CONFIRMED) */}
                {booking.status === 'CONFIRMED' && booking.confirmedTimeSlot && (
                  <div style={{
                    backgroundColor: 'var(--color-success-bg)',
                    border: '1.5px solid #a7f3d0',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem 1.25rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    color: 'var(--color-success-text)'
                  }}>
                    <div style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                      padding: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-success)'
                    }}>
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Confirmed Appointment
                      </span>
                      <div style={{ fontSize: '1.15rem', fontWeight: '800', marginTop: '0.1rem' }}>
                        {booking.confirmedDate || booking.requestedDate} &bull; {booking.confirmedTimeSlot}
                      </div>
                      <p style={{ fontSize: '0.8rem', margin: '0.1rem 0 0', opacity: 0.9 }}>
                        The provider has locked in this exact service slot.
                      </p>
                    </div>
                  </div>
                )}

                {/* Booking Details Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  backgroundColor: 'var(--color-surface-subtle)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-light)',
                  fontSize: 'var(--font-size-sm)'
                }}>
                  <div>
                    <span className="text-subtle" style={{ display: 'block', fontWeight: '600', marginBottom: '0.2rem' }}>
                      Requested Date & Time
                    </span>
                    <div style={{ fontWeight: '600', color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Calendar size={14} color="var(--color-primary)" />
                      {booking.requestedDate}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                      <Clock size={14} />
                      Preferred: {booking.requestedTime}
                    </div>
                  </div>

                  <div>
                    <span className="text-subtle" style={{ display: 'block', fontWeight: '600', marginBottom: '0.2rem' }}>
                      Location
                    </span>
                    <div style={{ fontWeight: '600', color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <MapPin size={14} color="var(--color-primary)" />
                      {booking.location}
                    </div>
                  </div>

                  <div>
                    <span className="text-subtle" style={{ display: 'block', fontWeight: '600', marginBottom: '0.2rem' }}>
                      Request Date
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                </div>

                {/* Requirement Description */}
                {booking.description && (
                  <div style={{ marginTop: '1rem' }}>
                    <span className="text-subtle" style={{ fontWeight: '700', textTransform: 'uppercase' }}>Requirement Description:</span>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                      "{booking.description}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerDashboardPage;
