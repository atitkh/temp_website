import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src={'/bc_long.png'} alt="BIOCOM" className="navbar-brand-image" />
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/info" 
              className={`navbar-link ${isActive('/info') ? 'active' : ''}`}
            >
              Info
            </Link>
          </li>
          {/* <li>
            <Link 
              to="/survey" 
              className={`navbar-link ${isActive('/survey') ? 'active' : ''}`}
            >
              Product Survey
            </Link>
          </li> */}
          {/* <li>
            <Link 
              to="/privacy-policy" 
              className={`navbar-link ${isActive('/privacy-policy') ? 'active' : ''}`}
            >
              Privacy Policy
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
