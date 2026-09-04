import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, SlidersHorizontal, RefreshCw, AlertCircle, X } from 'lucide-react';
import SearchBar from '../components/search/SearchBar.jsx';
import ProviderCard from '../components/provider/ProviderCard.jsx';
import { providerService } from '../services/providerService.js';

function ProviderSearchResultsPage() {
  const [searchParams] = useSearchParams();

  const service = searchParams.get('service') || '';
  const location = searchParams.get('location') || '';
  const date = searchParams.get('date') || '';
  const time = searchParams.get('time') || '';

  const hasSearchParams = Boolean(service || location || date || time);

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModifySearch, setShowModifySearch] = useState(!hasSearchParams);
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended', 'price_asc', 'price_desc'

  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await providerService.searchProviders({
        service,
        location,
        date,
        time
      });
      setProviders(results);
    } catch (err) {
      setError('Something went wrong while finding providers.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    setShowModifySearch(!hasSearchParams);
  }, [service, location, date, time]);

  // Client-side simple sorting
  const sortedProviders = [...providers].sort((a, b) => {
    if (sortBy === 'recommended') return b.rating - a.rating;
    if (sortBy === 'price_asc') return a.hourlyRate - b.hourlyRate;
    if (sortBy === 'price_desc') return b.hourlyRate - a.hourlyRate;
    return 0;
  });

  return (
    <div style={{ padding: '2rem 0 4rem' }}>
      <div className="container">
        {/* Top Header Card */}
        <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 'var(--space-md)'
          }}>
            <div>
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: '700', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Service Discovery
              </span>
              <h1 className="heading-section" style={{ margin: 'var(--space-3xs) 0' }}>
                {hasSearchParams ? 'Find the right service provider' : 'Find a service provider near you'}
              </h1>
              
              <p className="text-muted" style={{ marginBottom: 'var(--space-sm)' }}>
                {hasSearchParams 
                  ? 'Showing matching verified professionals available for your requested criteria.' 
                  : 'Choose your service, location and preferred time to discover available providers.'}
              </p>

              {/* Active Search Criteria Badges */}
              {hasSearchParams && (
                <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap', marginTop: 'var(--space-xs)' }}>
                  {service && (
                    <span className="badge badge-primary">
                      <Search size={12} /> Service: {service}
                    </span>
                  )}
                  {location && (
                    <span className="badge badge-primary">
                      <MapPin size={12} /> Location: {location}
                    </span>
                  )}
                  {date && (
                    <span className="badge badge-primary">
                      <Calendar size={12} /> Date: {date}
                    </span>
                  )}
                  {time && (
                    <span className="badge badge-primary">
                      <Clock size={12} /> Time: {time}
                    </span>
                  )}
                </div>
              )}
            </div>

            {hasSearchParams && (
              <button
                onClick={() => setShowModifySearch(!showModifySearch)}
                className="btn btn-secondary"
              >
                {showModifySearch ? <X size={16} /> : <SlidersHorizontal size={16} />}
                {showModifySearch ? 'Close Search Controls' : 'Modify Search'}
              </button>
            )}
          </div>

          {/* Search Controls (Shown automatically if no params, or toggled via Modify Search) */}
          {showModifySearch && (
            <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--color-border-light)' }}>
              <SearchBar initialValues={{ service, location, date, time }} compact />
            </div>
          )}
        </div>

        {/* Results Toolbar & Provider Grid */}
        <main>
          {/* Results Count & Sort Dropdown */}
          {!loading && !error && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-md)',
              flexWrap: 'wrap',
              gap: 'var(--space-sm)'
            }}>
              <h2 style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-secondary)' }}>
                {sortedProviders.length} provider{sortedProviders.length !== 1 ? 's' : ''} found
              </h2>

              {sortedProviders.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                  <label htmlFor="sort-select" className="form-label" style={{ margin: 0, whiteSpace: 'nowrap' }}>
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    className="form-control"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{ minHeight: '38px', padding: '0.4rem 0.8rem', width: 'auto' }}
                  >
                    <option value="recommended">Recommended (Highest Rated)</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
              <RefreshCw className="animate-spin" size={32} style={{ margin: '0 auto 1rem', color: 'var(--color-primary)' }} />
              <p style={{ fontSize: 'var(--font-size-base)', fontWeight: '500' }}>Finding matching service providers...</p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="card" style={{
              backgroundColor: 'var(--color-error-bg)',
              color: 'var(--color-error-text)',
              padding: 'var(--space-lg)',
              textAlign: 'center',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <AlertCircle size={32} style={{ margin: '0 auto var(--space-xs)' }} />
              <h3 style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-error-text)', marginBottom: 'var(--space-2xs)' }}>
                Something went wrong while finding providers.
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
                {error}
              </p>
              <button onClick={fetchResults} className="btn btn-primary" style={{ margin: '0 auto' }}>
                <RefreshCw size={16} /> Retry
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && sortedProviders.length === 0 && (
            <div className="card" style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              maxWidth: '560px',
              margin: '0 auto'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-md)'
              }}>
                <Search size={32} />
              </div>

              <h3 className="heading-card" style={{ marginBottom: 'var(--space-2xs)' }}>
                No providers available
              </h3>

              <p className="text-muted" style={{ marginBottom: 'var(--space-lg)' }}>
                Try changing your service, location, date or preferred time.
              </p>

              <button
                onClick={() => setShowModifySearch(true)}
                className="btn btn-primary"
              >
                Modify Search
              </button>
            </div>
          )}

          {/* Matching Provider Cards Grid */}
          {!loading && !error && sortedProviders.length > 0 && (
            <div className="grid-cards">
              {sortedProviders.map((provider) => (
                <ProviderCard key={provider._id} provider={provider} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProviderSearchResultsPage;
