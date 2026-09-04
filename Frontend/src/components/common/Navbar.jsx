import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Home, Menu, X, ShieldCheck, Calendar, Briefcase, User, UserPlus, LogOut, ChevronDown, Repeat } from 'lucide-react';
import { authService } from '../../services/authService.js';
import RegisterModal from './RegisterModal.jsx';
import LoginModal from './LoginModal.jsx';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());

  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = authService.onAuthChange((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    authService.logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const handleSwitchRole = () => {
    const newRole = currentUser?.role === 'PROVIDER' ? 'CUSTOMER' : 'PROVIDER';
    authService.switchRole(newRole);
    setProfileDropdownOpen(false);
  };

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
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }} className="desktop-nav">
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

          {currentUser?.role !== 'PROVIDER' && (
            <Link
              to="/customer/dashboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: '600',
                fontSize: '0.95rem',
                color: isActive('/customer/dashboard') ? '#0284c7' : '#475569',
                borderBottom: isActive('/customer/dashboard') ? '2px solid #0284c7' : '2px solid transparent',
                padding: '0.5rem 0'
              }}
            >
              <Calendar size={18} />
              My Bookings
            </Link>
          )}

          {currentUser?.role === 'PROVIDER' && (
            <Link
              to="/provider/dashboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: '600',
                fontSize: '0.95rem',
                color: isActive('/provider/dashboard') ? '#0284c7' : '#475569',
                borderBottom: isActive('/provider/dashboard') ? '2px solid #0284c7' : '2px solid transparent',
                padding: '0.5rem 0'
              }}
            >
              <Briefcase size={18} />
              Provider Portal
            </Link>
          )}

          {/* TOP RIGHT CORNER: LOGGED IN PROFILE OR REGISTER BUTTON */}
          <div style={{ marginLeft: '0.5rem', position: 'relative' }}>
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    backgroundColor: 'var(--color-surface-subtle)',
                    border: '1px solid var(--color-border-medium)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                  id="user-profile-badge"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                    alt={currentUser.name}
                    style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--color-secondary)' }}>
                      {currentUser.name}
                    </div>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      color: currentUser.role === 'PROVIDER' ? 'var(--color-success-text)' : 'var(--color-primary-dark)',
                      textTransform: 'uppercase'
                    }}>
                      {currentUser.role === 'PROVIDER' ? 'Service Provider' : 'Customer'}
                    </span>
                  </div>
                  <ChevronDown size={14} color="var(--color-text-muted)" />
                </button>

                {/* Direct Logout Button */}
                <button
                  onClick={handleLogout}
                  title="Logout"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--color-error-bg)',
                    color: 'var(--color-error-text)',
                    border: '1px solid var(--color-error-border)',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  <LogOut size={16} />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '115%',
                    right: '40px',
                    width: '240px',
                    backgroundColor: '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--color-border-light)',
                    padding: '0.5rem 0',
                    zIndex: 1000
                  }}>
                    <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid var(--color-border-light)' }}>
                      <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--color-secondary)' }}>
                        {currentUser.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        {currentUser.email}
                      </div>
                      <div style={{ marginTop: '0.3rem' }}>
                        <span className={`badge ${currentUser.role === 'PROVIDER' ? 'badge-success' : 'badge-primary'}`}>
                          {currentUser.role === 'PROVIDER' ? 'Service Provider' : 'Customer'}
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/edit-profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 1rem',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: 'var(--color-secondary)'
                      }}
                    >
                      <User size={16} /> Edit Profile
                    </Link>

                    {currentUser.role === 'PROVIDER' && (
                      <Link
                        to="/provider/settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.6rem 1rem',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          color: 'var(--color-secondary)'
                        }}
                      >
                        <Briefcase size={16} /> Service Profile
                      </Link>
                    )}

                    <Link
                      to={currentUser.role === 'PROVIDER' ? '/provider/dashboard' : '/customer/dashboard'}
                      onClick={() => setProfileDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 1rem',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: 'var(--color-secondary)'
                      }}
                    >
                      <Calendar size={16} /> My Dashboard
                    </Link>

                    <button
                      onClick={handleSwitchRole}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.6rem 1rem',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: 'var(--color-primary)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Repeat size={16} /> Switch to {currentUser.role === 'PROVIDER' ? 'Customer' : 'Provider'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="btn btn-outline"
                  style={{ padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)' }}
                >
                  Log In
                </button>
                <button
                  onClick={() => setRegisterModalOpen(true)}
                  className="btn btn-primary"
                  style={{ padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)' }}
                >
                  <UserPlus size={16} /> Register
                </button>
              </div>
            )}
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
          {currentUser && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              paddingBottom: '0.8rem',
              borderBottom: '1px solid var(--color-border-light)'
            }}>
              <img
                src={currentUser.avatar || 'https://via.placeholder.com/40'}
                alt={currentUser.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <div>
                <div style={{ fontWeight: '700', color: 'var(--color-secondary)' }}>{currentUser.name}</div>
                <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                  {currentUser.role === 'PROVIDER' ? 'Service Provider' : 'Service Receiver'}
                </span>
              </div>
            </div>
          )}

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
          {currentUser?.role !== 'PROVIDER' && (
            <Link
              to="/customer/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontWeight: '600',
                color: isActive('/customer/dashboard') ? '#0284c7' : '#334155',
                padding: '0.5rem 0'
              }}
            >
              <Calendar size={18} />
              My Bookings
            </Link>
          )}
          {currentUser?.role === 'PROVIDER' && (
            <Link
              to="/provider/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontWeight: '600',
                color: isActive('/provider/dashboard') ? '#0284c7' : '#334155',
                padding: '0.5rem 0'
              }}
            >
              <Briefcase size={18} />
              Provider Portal
            </Link>
          )}

          {!currentUser ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setRegisterModalOpen(true);
              }}
              className="btn btn-primary btn-full"
            >
              <UserPlus size={18} /> Register Account
            </button>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="btn btn-secondary btn-full"
              style={{ color: 'var(--color-error-text)' }}
            >
              <LogOut size={18} /> Logout ({currentUser.name})
            </button>
          )}
        </div>
      )}

      {/* Registration Modal */}
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

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
