import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Home, Menu, X, ShieldCheck } from 'lucide-react';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          textDecoration: 'none'
        }}>
          <div style={{
            backgroundColor: '#0284c7',
            color: '#ffffff',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            boxShadow: '0 2px 5px rgba(2, 132, 199, 0.3)'
          }}>
            H
          </div>
          <div>
            <span style={{
              fontSize: '1.4rem',
              fontWeight: '800',
              color: '#0f172a',
              letterSpacing: '-0.5px'
            }}>
              Hela<span style={{ color: '#0284c7' }}>Connect</span>
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.65rem',
              color: '#64748b',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Local Service Discovery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: '600',
              fontSize: '0.95rem',
              color: isActive('/') ? '#0284c7' : '#475569',
              borderBottom: isActive('/') ? '2px solid #0284c7' : '2px solid transparent',
              padding: '0.5rem 0'
            }}
          >
            <Home size={18} />
            Home
          </Link>

          <Link
            to="/search"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: '600',
              fontSize: '0.95rem',
              color: isActive('/search') ? '#0284c7' : '#475569',
              borderBottom: isActive('/search') ? '2px solid #0284c7' : '2px solid transparent',
              padding: '0.5rem 0'
            }}
          >
            <Search size={18} />
            Find Services
          </Link>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            padding: '0.3rem 0.8rem',
            backgroundColor: '#e0f2fe',
            color: '#0369a1',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '600'
          }}>
            <ShieldCheck size={16} />
            Verified Pros
          </div>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#0f172a',
            display: 'none',
            padding: '0.5rem'
          }}
          className="mobile-toggle"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontWeight: '600',
              color: isActive('/') ? '#0284c7' : '#334155',
              padding: '0.5rem 0'
            }}
          >
            <Home size={18} />
            Home
          </Link>
          <Link
            to="/search"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontWeight: '600',
              color: isActive('/search') ? '#0284c7' : '#334155',
              padding: '0.5rem 0'
            }}
          >
            <Search size={18} />
            Find Services & Providers
          </Link>
        </div>
      )}

      {/* Responsive Inline CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}

export default Navbar;
