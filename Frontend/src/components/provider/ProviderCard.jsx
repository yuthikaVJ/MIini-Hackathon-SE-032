import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import RatingStars from '../common/RatingStars.jsx';

function ProviderCard({ provider }) {
  if (!provider) return null;

  const {
    _id,
    name,
    title,
    category,
    location,
    rating,
    reviewCount,
    hourlyRate,
    verified,
    avatar,
    bio,
    availability = []
  } = provider;

  const hasNextAvailable = availability.length > 0;
  const nextDate = hasNextAvailable ? availability[0].date : null;

  return (
    <div className="card card-hover" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%'
    }}>
      <div>
        {/* Top Header Row */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <img
            src={avatar || 'https://via.placeholder.com/60'}
            alt={name}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--color-primary-light)'
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--color-secondary)', fontWeight: '700' }}>
                {name}
              </h3>
              {verified && (
                <span className="badge badge-verified" title="Identity & Skill Verified">
                  <ShieldCheck size={13} /> Verified
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.1rem', fontWeight: '500' }}>
              {title}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
              <span className="badge badge-primary">{category}</span>
              <span style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <MapPin size={13} color="var(--color-primary)" /> {location}
              </span>
            </div>
          </div>
        </div>

        {/* Rating and Price Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 0',
          borderTop: '1px solid var(--color-border-light)',
          borderBottom: '1px solid var(--color-border-light)',
          marginBottom: '0.9rem'
        }}>
          <RatingStars rating={rating} reviewCount={reviewCount} size={15} />
          
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-secondary)' }}>
              LKR {hourlyRate.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>/ hr</span>
          </div>
        </div>

        {/* Bio Snippet */}
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-main)',
          lineHeight: '1.5',
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {bio}
        </p>

        {/* Availability Badge (Text + Icon + Color Indicator) */}
        <div
          className={`availability-badge ${hasNextAvailable ? 'available' : 'unavailable'}`}
          style={{ marginBottom: '1.2rem', width: '100%' }}
        >
          {hasNextAvailable ? (
            <>
              <CheckCircle2 size={14} color="var(--color-success)" />
              <span>Available next: <strong>{nextDate}</strong></span>
            </>
          ) : (
            <>
              <Calendar size={14} />
              <span>Check schedule for availability</span>
            </>
          )}
        </div>
      </div>

      {/* Action CTA */}
      <Link
        to={`/providers/${_id}`}
        className="btn btn-outline btn-full"
        style={{ justifyContent: 'center' }}
      >
        View Profile & Services
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export default ProviderCard;
