import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, Phone, Check, X, CheckCircle2, AlertCircle, Filter, Sparkles, RefreshCw, Settings } from 'lucide-react';
import BookingStatusBadge from '../components/booking/BookingStatusBadge.jsx';
import { bookingService, AVAILABLE_TIME_SLOTS } from '../services/bookingService.js';
import { MOCK_PROVIDERS } from '../data/mockProviders.js';

function ProviderDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter state for dates
  const [selectedDateFilter, setSelectedDateFilter] = useState('ALL');

  // Active time-slot confirmation modal/inline form state
  const [confirmingBookingId, setConfirmingBookingId] = useState(null);
  const [confirmDate, setConfirmDate] = useState('');
  const [confirmTimeSlot, setConfirmTimeSlot] = useState(AVAILABLE_TIME_SLOTS[4]); // default 02:00 PM - 03:00 PM

  // Action status message feedback
  const [feedback, setFeedback] = useState(null);

  const loadProviderBookings = async () => {
    setLoading(true);
    try {
      // Fetch bookings for the logged-in provider
      const data = await bookingService.getProviderBookings();
      setBookings(data);
    } catch (err) {
      console.error("Error loading provider bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProviderBookings();
  }, []);

  // Handle Accept Action
  const handleAccept = async (bookingId) => {
    try {
      const updated = await bookingService.acceptBooking(bookingId);
      setFeedback({ type: 'success', message: `Request from ${updated.customerName} marked as ACCEPTED. Please confirm the service time slot below.` });

      // Automatically open slot selection form for this booking
      setConfirmingBookingId(bookingId);
      setConfirmDate(updated.requestedDate || '');

      await loadProviderBookings();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Error accepting booking.' });
    }
  };

  // Handle Reject Action
  const handleReject = async (bookingId) => {
    try {
      const updated = await bookingService.rejectBooking(bookingId);
      setFeedback({ type: 'warning', message: `Request from ${updated.customerName} has been REJECTED.` });
      if (confirmingBookingId === bookingId) {
        setConfirmingBookingId(null);
      }
      await loadProviderBookings();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Error rejecting booking.' });
    }
  };

  // Handle Confirm Time Slot
  const handleConfirmSlot = async (e, bookingId) => {
    e.preventDefault();
    if (!confirmTimeSlot) {
      setFeedback({ type: 'error', message: 'Please select a time slot.' });
      return;
    }

    try {
      const updated = await bookingService.confirmBookingTimeSlot(bookingId, confirmDate, confirmTimeSlot);
      setFeedback({ type: 'success', message: `Appointment CONFIRMED for ${updated.customerName} on ${updated.confirmedDate} (${updated.confirmedTimeSlot}).` });
      setConfirmingBookingId(null);
      await loadProviderBookings();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Error confirming time slot.' });
    }
  };

  const handleResetData = async () => {
    await bookingService.resetMockData();
    setFeedback({ type: 'info', message: 'Demo data reset successfully.' });
    await loadProviderBookings();
  };

  // Extract unique requested dates for filtering
  const uniqueDates = Array.from(new Set(bookings.map(b => b.requestedDate))).sort();

  // Filter bookings by date
  const filteredBookings = bookings.filter(b => {
    if (selectedDateFilter === 'ALL') return true;
    return b.requestedDate === selectedDateFilter;
  });

  // Group bookings by date
  const groupedBookings = filteredBookings.reduce((acc, booking) => {
    const dateKey = booking.requestedDate || 'Unspecified Date';
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(booking);
    return acc;
  }, {});

  const selectedProviderName = 'My';

  return (
    <div style={{ padding: '2rem 0 5rem' }}>
      <div className="container">
        {/* Provider Portal Banner */}
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
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-success)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Service Provider Portal
            </span>
            <h1 className="heading-section" style={{ fontSize: '1.8rem', color: 'var(--color-secondary)' }}>
              Booking Requests Dashboard
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/provider/settings" className="btn btn-outline" style={{ minHeight: '38px', padding: '0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <Settings size={15} /> Edit Service Profile
            </Link>
            <button onClick={loadProviderBookings} className="btn btn-secondary" style={{ minHeight: '38px' }}>
              <RefreshCw size={15} /> Refresh Data
            </button>
          </div>
        </div>

        {/* Feedback Alert Bar */}
        {feedback && (
          <div style={{
            backgroundColor: feedback.type === 'success' ? 'var(--color-success-bg)' : feedback.type === 'warning' ? 'var(--color-warning-bg)' : 'var(--color-error-bg)',
            color: feedback.type === 'success' ? 'var(--color-success-text)' : feedback.type === 'warning' ? 'var(--color-warning-text)' : 'var(--color-error-text)',
            padding: '0.8rem 1.2rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            fontSize: 'var(--font-size-sm)',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} />
              {feedback.message}
            </div>
            <button onClick={() => setFeedback(null)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontWeight: 'bold' }}>
              ✕
            </button>
          </div>
        )}

        {/* Date Filter Selector Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          backgroundColor: 'var(--color-surface)',
          padding: '0.8rem 1.2rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-light)',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-secondary)', fontWeight: '700', fontSize: 'var(--font-size-sm)' }}>
            <Filter size={16} color="var(--color-primary)" />
            Filter by Date:
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedDateFilter('ALL')}
              className={`badge ${selectedDateFilter === 'ALL' ? 'badge-primary' : 'badge-secondary'}`}
              style={{
                cursor: 'pointer',
                padding: '0.4rem 0.8rem',
                fontSize: 'var(--font-size-xs)',
                backgroundColor: selectedDateFilter === 'ALL' ? 'var(--color-primary)' : 'var(--color-surface-subtle)',
                color: selectedDateFilter === 'ALL' ? '#ffffff' : 'var(--color-text-main)'
              }}
            >
              All Dates ({bookings.length})
            </button>

            {uniqueDates.map(date => {
              const count = bookings.filter(b => b.requestedDate === date).length;
              return (
                <button
                  key={date}
                  onClick={() => setSelectedDateFilter(date)}
                  style={{
                    cursor: 'pointer',
                    padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: '600',
                    backgroundColor: selectedDateFilter === date ? 'var(--color-primary)' : 'var(--color-surface-subtle)',
                    color: selectedDateFilter === date ? '#ffffff' : 'var(--color-text-main)',
                    border: '1px solid var(--color-border-light)'
                  }}
                >
                  {date} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}>
            <p style={{ fontSize: 'var(--font-size-lg)' }}>Loading service requests...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredBookings.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
            <AlertCircle size={44} color="var(--color-text-subtle)" style={{ margin: '0 auto 1rem' }} />
            <h3 className="heading-card" style={{ marginBottom: '0.5rem' }}>No Requests for {selectedProviderName}</h3>
            <p className="text-muted" style={{ maxWidth: '400px', margin: '0 auto' }}>
              There are no service requests matching your active filter. Select another date or switch provider above.
            </p>
          </div>
        )}

        {/* Date Grouped Booking Requests */}
        {!loading && Object.keys(groupedBookings).map(dateKey => (
          <div key={dateKey} style={{ marginBottom: '2.5rem' }}>
            {/* Date Section Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1rem',
              borderBottom: '2px solid var(--color-primary-light)',
              paddingBottom: '0.4rem'
            }}>
              <Calendar size={20} color="var(--color-primary)" />
              <h2 className="heading-card" style={{ fontSize: '1.25rem', color: 'var(--color-secondary)' }}>
                {dateKey}
              </h2>
              <span className="badge badge-primary" style={{ marginLeft: 'auto' }}>
                {groupedBookings[dateKey].length} Request(s)
              </span>
            </div>

            {/* Cards for this date */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {groupedBookings[dateKey].map(request => (
                <div
                  key={request._id}
                  className="card"
                  style={{
                    borderLeft: request.status === 'CONFIRMED'
                      ? '4px solid var(--color-success)'
                      : request.status === 'ACCEPTED'
                      ? '4px solid var(--color-primary)'
                      : request.status === 'REJECTED'
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
                        Service Requested: {request.serviceName}
                      </span>
                      <h3 className="heading-card" style={{ fontSize: '1.3rem', color: 'var(--color-secondary)', marginTop: '0.2rem' }}>
                        Customer: {request.customerName}
                      </h3>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Phone size={14} color="var(--color-primary)" /> {request.customerPhone || 'Contact details provided'}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <MapPin size={14} color="var(--color-primary)" /> {request.location}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Clock size={14} color="var(--color-primary)" /> Preferred: <strong>{request.requestedTime}</strong>
                        </span>
                      </div>
                    </div>

                    <div>
                      <BookingStatusBadge status={request.status} showDescription={true} />
                    </div>
                  </div>

                  {/* Customer requirement description */}
                  {request.description && (
                    <div style={{
                      backgroundColor: 'var(--color-surface-subtle)',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '1rem',
                      fontSize: 'var(--font-size-sm)',
                      border: '1px solid var(--color-border-light)'
                    }}>
                      <strong style={{ color: 'var(--color-secondary)' }}>Problem Description:</strong>
                      <p style={{ color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                        "{request.description}"
                      </p>
                    </div>
                  )}

                  {/* Confirmed Slot Banner display */}
                  {request.status === 'CONFIRMED' && request.confirmedTimeSlot && (
                    <div style={{
                      backgroundColor: 'var(--color-success-bg)',
                      border: '1px solid #a7f3d0',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.8rem 1rem',
                      color: 'var(--color-success-text)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      <CheckCircle2 size={18} />
                      Confirmed Appointment Time Slot: {request.confirmedDate || request.requestedDate} ({request.confirmedTimeSlot})
                    </div>
                  )}

                  {/* ACTION CONTROLS SECTION */}

                  {/* 1. PENDING State Actions: [ Accept ] [ Reject ] */}
                  {request.status === 'PENDING' && (
                    <div style={{ display: 'flex', gap: '0.8rem', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border-light)' }}>
                      <button
                        onClick={() => handleAccept(request._id)}
                        className="btn btn-primary"
                        style={{ backgroundColor: 'var(--color-success)', borderColor: 'var(--color-success)', flex: 1, maxWidth: '200px' }}
                      >
                        <Check size={16} /> Accept Request
                      </button>
                      <button
                        onClick={() => handleReject(request._id)}
                        className="btn btn-secondary"
                        style={{ color: 'var(--color-error-text)', borderColor: '#fca5a5', backgroundColor: 'var(--color-error-bg)', flex: 1, maxWidth: '200px' }}
                      >
                        <X size={16} /> Reject Request
                      </button>
                    </div>
                  )}

                  {/* 2. ACCEPTED State Time Slot Confirmation Form */}
                  {(request.status === 'ACCEPTED' || confirmingBookingId === request._id) && request.status !== 'CONFIRMED' && request.status !== 'REJECTED' && (
                    <div style={{
                      backgroundColor: 'var(--color-primary-light)',
                      border: '1.5px solid #7dd3fc',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      marginTop: '0.8rem'
                    }}>
                      <div style={{ marginBottom: '0.8rem' }}>
                        <h4 className="heading-card" style={{ fontSize: '1rem', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Sparkles size={16} />
                          Select & Confirm Actual Service Time Slot
                        </h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-primary-dark)', opacity: 0.9 }}>
                          Customer requested: <strong>{request.requestedDate}</strong> at <strong>{request.requestedTime}</strong>. Choose your available slot to finalize appointment.
                        </p>
                      </div>

                      <form onSubmit={(e) => handleConfirmSlot(e, request._id)} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                        <div className="form-group" style={{ flex: '1 1 180px' }}>
                          <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--color-primary-dark)' }}>
                            Confirmed Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            value={confirmingBookingId === request._id ? confirmDate : (request.requestedDate || '')}
                            onChange={(e) => {
                              setConfirmingBookingId(request._id);
                              setConfirmDate(e.target.value);
                            }}
                          />
                        </div>

                        <div className="form-group" style={{ flex: '2 1 240px' }}>
                          <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--color-primary-dark)' }}>
                            Select Time Slot
                          </label>
                          <select
                            className="form-control"
                            value={confirmingBookingId === request._id ? confirmTimeSlot : AVAILABLE_TIME_SLOTS[4]}
                            onChange={(e) => {
                              setConfirmingBookingId(request._id);
                              setConfirmTimeSlot(e.target.value);
                            }}
                          >
                            {AVAILABLE_TIME_SLOTS.map((slot, i) => (
                              <option key={i} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', width: '100%', marginTop: '0.5rem' }}>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ flex: 1 }}
                          >
                            <CheckCircle2 size={16} /> Confirm Time Slot
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReject(request._id)}
                            className="btn btn-secondary"
                            style={{ color: 'var(--color-error-text)' }}
                          >
                            Reject Request Instead
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* 3. REJECTED State Message */}
                  {request.status === 'REJECTED' && (
                    <div style={{
                      fontSize: '0.85rem',
                      color: 'var(--color-error-text)',
                      backgroundColor: 'var(--color-error-bg)',
                      padding: '0.5rem 0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      display: 'inline-block',
                      marginTop: '0.5rem'
                    }}>
                      This booking request was rejected. Active actions disabled.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProviderDashboardPage;
