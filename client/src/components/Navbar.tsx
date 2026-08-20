import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, FileText, Image as ImageIcon, Link as LinkIcon, History, Info } from 'lucide-react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  return (
    <header className="navbar-header glass-panel">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          <ShieldCheck className="brand-icon" size={28} />
          <span className="brand-name">TruthGuard <span className="brand-tag">AI</span></span>
        </NavLink>

        <nav className="navbar-links">
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
        </nav>

        <div className="navbar-status">
          <span className="status-dot"></span>
          <span className="status-text">Multi-Agent Active</span>
        </div>
      </div>
    </header>
  );
};
