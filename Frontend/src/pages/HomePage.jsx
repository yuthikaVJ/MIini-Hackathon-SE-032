import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Search, Award, Clock, MapPin, Send, ArrowRight, Wrench, Zap, Wind, Sparkles, Scissors, Car, Paintbrush, Hammer, CheckCircle2 } from 'lucide-react';
import SearchBar from '../components/search/SearchBar.jsx';
import ProviderCard from '../components/provider/ProviderCard.jsx';
import { providerService } from '../services/providerService.js';
import { SERVICE_CATEGORIES } from '../data/mockServices.js';

// Map icon names to Lucide components
const iconMap = {
  Zap: Zap,
  Wrench: Wrench,
  Wind: Wind,
  Sparkles: Sparkles,
  Scissors: Scissors,
  Car: Car,
  Paintbrush: Paintbrush,
  Hammer: Hammer
};

function HomePage() {
  const navigate = useNavigate();
  const [featuredProviders, setFeaturedProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await providerService.getAllProviders();
        // Top 3 rated providers for featured showcase
        const sorted = data.sort((a, b) => b.rating - a.rating).slice(0, 3);
        setFeaturedProviders(sorted);
      } catch (err) {
        console.error('Failed to load featured providers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/search?service=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div>
      {/* 2. Hero Section & 3. Quick Search Area */}
      <section style={{
        background: 'linear-gradient(135deg, var(--color-secondary) 0%, #1e293b 100%)',
        color: '#ffffff',
        padding: '4rem 0 5rem',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-xs)',
              backgroundColor: 'rgba(2, 132, 199, 0.2)',
              color: '#38bdf8',
              padding: 'var(--space-xs) var(--space-md)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '600',
              marginBottom: 'var(--space-md)',
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}>
              <ShieldCheck size={16} /> Trusted Sri Lankan Service Discovery Platform
            </div>

            <h1 className="heading-hero" style={{ color: '#ffffff', marginBottom: 'var(--space-md)' }}>
              Find Trusted Local Services, When You Need Them.
            </h1>

            <p style={{
              fontSize: 'var(--font-size-lg)',
              color: 'var(--color-text-subtle)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-lg)'
            }}>
              Discover reliable service providers around you based on your service, location, date and preferred time.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/search')}
                className="btn btn-primary btn-lg"
              >
                <Search size={18} /> Find a Service
              </button>
            </div>
          </div>

          {/* Quick Search Widget */}
          <div style={{ maxWidth: '980px', margin: '0 auto' }}>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* 4. Trust / Value Section */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-xl)',
            textAlign: 'center'
          }}>
            <div className="card" style={{ padding: 'var(--space-lg)' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-verified-bg)',
                color: 'var(--color-verified-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-md)'
              }}>
                <ShieldCheck size={26} />
              </div>
              <h3 className="heading-card" style={{ marginBottom: 'var(--space-2xs)' }}>Verified Providers</h3>
              <p className="text-muted">
                Identity and skill credentials checked for ultimate safety and reliability.
              </p>
            </div>

            <div className="card" style={{ padding: 'var(--space-lg)' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-warning-bg)',
                color: 'var(--color-warning-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-md)'
              }}>
                <Clock size={26} />
              </div>
              <h3 className="heading-card" style={{ marginBottom: 'var(--space-2xs)' }}>Availability-Based Search</h3>
              <p className="text-muted">
                Match with professionals who are available on your exact required date & time.
              </p>
            </div>

            <div className="card" style={{ padding: 'var(--space-lg)' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-md)'
              }}>
                <MapPin size={26} />
              </div>
              <h3 className="heading-card" style={{ marginBottom: 'var(--space-2xs)' }}>Local Service Discovery</h3>
              <p className="text-muted">
                Direct access to top experts across Sri Lankan cities with upfront pricing.
              </p>
            </div>

            <div className="card" style={{ padding: 'var(--space-lg)' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-md)'
              }}>
                <Send size={26} />
              </div>
              <h3 className="heading-card" style={{ marginBottom: 'var(--space-2xs)' }}>Simple Service Requests</h3>
              <p className="text-muted">
                Seamless request handoff to book services with transparent hourly rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Service Categories */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-main)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <div>
              <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Explore Categories
              </span>
              <h2 className="heading-section" style={{ marginTop: 'var(--space-3xs)' }}>
                Popular Service Categories
              </h2>
            </div>
            <button
              onClick={() => navigate('/search')}
              className="btn btn-outline"
            >
              View All Categories <ArrowRight size={15} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 'var(--space-md)'
          }}>
            {SERVICE_CATEGORIES.map((cat) => {
              const IconComponent = iconMap[cat.iconName] || Wrench;

              return (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="card card-hover"
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-xs)'
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={22} />
                  </div>
                  <div>
                    <h3 className="heading-card" style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--space-3xs)' }}>
                      {cat.name}
                    </h3>
                    <p className="text-muted" style={{ fontSize: 'var(--font-size-xs)' }}>
                      {cat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. How HelaConnect Works */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border-light)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Simple Process
            </span>
            <h2 className="heading-section" style={{ marginTop: 'var(--space-3xs)' }}>
              How HelaConnect Works
            </h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: 'var(--space-xs) auto 0' }}>
              Four easy steps to discover and connect with local service experts
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: 'var(--space-lg)'
          }}>
            <div className="card" style={{ padding: 'var(--space-lg)', position: 'relative' }}>
              <span style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: 'var(--color-primary-light)',
                display: 'block',
                marginBottom: 'var(--space-xs)'
              }}>01</span>
              <h3 className="heading-card" style={{ marginBottom: 'var(--space-xs)' }}>Choose a Service</h3>
              <p className="text-muted">Select the required service category (e.g. Electrical, Plumbing, Cleaning).</p>
            </div>

            <div className="card" style={{ padding: 'var(--space-lg)', position: 'relative' }}>
              <span style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: 'var(--color-primary-light)',
                display: 'block',
                marginBottom: 'var(--space-xs)'
              }}>02</span>
              <h3 className="heading-card" style={{ marginBottom: 'var(--space-xs)' }}>Set Location & Time</h3>
              <p className="text-muted">Provide your city, date, and preferred time slot for service delivery.</p>
            </div>

            <div className="card" style={{ padding: 'var(--space-lg)', position: 'relative' }}>
              <span style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: 'var(--color-primary-light)',
                display: 'block',
                marginBottom: 'var(--space-xs)'
              }}>03</span>
              <h3 className="heading-card" style={{ marginBottom: 'var(--space-xs)' }}>Discover Matching Pros</h3>
              <p className="text-muted">Compare top-rated verified professionals, rates, and customer reviews.</p>
            </div>

            <div className="card" style={{ padding: 'var(--space-lg)', position: 'relative' }}>
              <span style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: 'var(--color-primary-light)',
                display: 'block',
                marginBottom: 'var(--space-xs)'
              }}>04</span>
              <h3 className="heading-card" style={{ marginBottom: 'var(--space-xs)' }}>Request the Service</h3>
              <p className="text-muted">Click Request Service to seamlessly hand off to booking details.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Featured / Top-Rated Providers */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-main)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Verified Professionals
            </span>
            <h2 className="heading-section" style={{ marginTop: 'var(--space-3xs)' }}>
              Top Rated Local Service Experts
            </h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: 'var(--space-xs) auto 0' }}>
              Handpicked verified service providers with top customer ratings
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}>
              Loading top service providers...
            </div>
          ) : (
            <div className="grid-cards">
              {featuredProviders.map((provider) => (
                <ProviderCard key={provider._id} provider={provider} />
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
            <button
              onClick={() => navigate('/search')}
              className="btn btn-primary btn-lg"
            >
              <Search size={18} /> Search All Providers
            </button>
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section style={{
        backgroundColor: 'var(--color-secondary)',
        color: '#ffffff',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <h2 className="heading-section" style={{ color: '#ffffff', marginBottom: 'var(--space-xs)' }}>
            Ready to find the right service provider?
          </h2>
          <p style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-xl)' }}>
            Search verified local professionals for plumbing, electrical work, cleaning, AC repairs, and more.
          </p>
          <button
            onClick={() => navigate('/search')}
            className="btn btn-primary btn-lg"
          >
            <Search size={18} /> Find a Service
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
