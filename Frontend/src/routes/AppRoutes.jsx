import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import ProviderSearchResultsPage from '../pages/ProviderSearchResultsPage.jsx';
import ProviderProfilePage from '../pages/ProviderProfilePage.jsx';
import RequestServicePage from '../pages/RequestServicePage.jsx';
import CustomerDashboardPage from '../pages/CustomerDashboardPage.jsx';
import ProviderDashboardPage from '../pages/ProviderDashboardPage.jsx';
import ProviderSettingsPage from '../pages/ProviderSettingsPage.jsx';
import EditProfilePage from '../pages/EditProfilePage.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<ProviderSearchResultsPage />} />
      <Route path="/providers/:id" element={<ProviderProfilePage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />
      
      {/* Booking Form Routes */}
      <Route path="/request-service/:providerId" element={<RequestServicePage />} />
      <Route path="/request-service" element={<RequestServicePage />} />
      <Route path="/booking/new" element={<RequestServicePage />} />

      {/* Booking Dashboards */}
      <Route path="/customer/dashboard" element={<CustomerDashboardPage />} />
      <Route path="/provider/dashboard" element={<ProviderDashboardPage />} />
      <Route path="/provider/settings" element={<ProviderSettingsPage />} />

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

