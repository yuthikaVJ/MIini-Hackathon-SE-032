import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/common/Navbar.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="page-wrapper">
        <Navbar />
        <main className="main-content">
          <AppRoutes />
        </main>
        <footer style={{
          backgroundColor: '#0f172a',
          color: '#94a3b8',
          padding: '2.5rem 0',
          marginTop: 'auto',
          borderTop: '1px solid #1e293b'
        }}>
          <div className="container" style={{
            display: 'flex',
            justifyConstraint: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '0.3rem' }}>HelaConnect</h3>
              <p style={{ fontSize: '0.875rem' }}>Connecting Sri Lankans with Verified Local Service Experts.</p>
            </div>
            <div style={{ fontSize: '0.85rem' }}>
              &copy; {new Date().getFullYear()} HelaConnect. All rights reserved. (Frontend Part 1 MVP)
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
