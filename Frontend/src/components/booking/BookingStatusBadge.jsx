import React from 'react';
import { Clock, CheckCircle2, XCircle, CalendarCheck } from 'lucide-react';

const STATUS_CONFIG = {
  PENDING: {
    label: 'PENDING',
    description: 'Waiting for provider response',
    bg: 'var(--color-warning-bg)',
    color: 'var(--color-warning-text)',
    border: '#fde68a',
    icon: Clock
  },
  ACCEPTED: {
    label: 'ACCEPTED',
    description: 'Provider accepted. Waiting for time confirmation.',
    bg: 'var(--color-primary-light)',
    color: 'var(--color-primary-dark)',
    border: '#bae6fd',
    icon: CheckCircle2
  },
  REJECTED: {
    label: 'REJECTED',
    description: 'Provider rejected this request.',
    bg: 'var(--color-error-bg)',
    color: 'var(--color-error-text)',
    border: '#fca5a5',
    icon: XCircle
  },
  CONFIRMED: {
    label: 'CONFIRMED',
    description: 'Appointment confirmed',
    bg: 'var(--color-success-bg)',
    color: 'var(--color-success-text)',
    border: '#a7f3d0',
    icon: CalendarCheck
  }
};

function BookingStatusBadge({ status = 'PENDING', showDescription = false }) {
  const config = STATUS_CONFIG[status.toUpperCase()] || STATUS_CONFIG.PENDING;
  const IconComponent = config.icon;

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '0.2rem' }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.35rem 0.8rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: config.bg,
          color: config.color,
          border: `1px solid ${config.border}`,
          fontWeight: '700',
          fontSize: 'var(--font-size-xs)',
          letterSpacing: '0.4px',
          width: 'fit-content'
        }}
      >
        <IconComponent size={14} />
        {config.label}
      </span>
      {showDescription && (
        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: '500' }}>
          {config.description}
        </span>
      )}
    </div>
  );
}

export default BookingStatusBadge;
