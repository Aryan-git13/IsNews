import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ShieldCheck, FileText, Image as ImageIcon, Link as LinkIcon, History, Info, Menu, X } from 'lucide-react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <header className="navbar-header glass-panel">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand" aria-label="TruthGuard AI Home">
          <ShieldCheck className="brand-icon" size={28} />
          <span className="brand-name">TruthGuard <span className="brand-tag">AI</span></span>
        </NavLink>

        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/verify/text" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FileText size={16} /> Text Check
          </NavLink>
          <NavLink to="/verify/url" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <LinkIcon size={16} /> URL Check
          </NavLink>
          <NavLink to="/verify/image" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <ImageIcon size={16} /> Image Check
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <History size={16} /> Ledger
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Info size={16} /> Architecture
          </NavLink>

          <div className="mobile-status-container">
            <div className="navbar-status">
              <span className="status-dot"></span>
              <span className="status-text">Multi-Agent Active</span>
            </div>
          </div>
        </nav>

        <div className="navbar-status desktop-status">
          <span className="status-dot"></span>
          <span className="status-text">Multi-Agent Active</span>
        </div>
      </div>
    </header>
  );
};
