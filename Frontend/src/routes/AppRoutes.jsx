import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import ProviderSearchResultsPage from '../pages/ProviderSearchResultsPage.jsx';
import ProviderProfilePage from '../pages/ProviderProfilePage.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<ProviderSearchResultsPage />} />
      <Route path="/providers/:id" element={<ProviderProfilePage />} />
      
      {/* Safe handoff route placeholder for Booking owner */}
      <Route path="/booking/new" element={
        <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#0f172a' }}>
            Request Service & Booking Handoff
          </h2>
          <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto 2rem' }}>
            This route (<code style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>/booking/new</code>) is the handoff target for the booking module owned by Frontend Member 2.
          </p>
          <Link to="/" className="btn btn-primary">Return to Home</Link>
        </div>
      } />

      {/* 404 Fallback */}
      <Route path="*" element={
        <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
          <h2>404 - Page Not Found</h2>
          <p style={{ color: '#64748b', margin: '1rem 0 2rem' }}>The page you are looking for does not exist.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      } />
    </Routes>
  );
}

export default AppRoutes;
