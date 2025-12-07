import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="footer">
            {/* <div className="footer-container">
                <div className="footer-brand">
                    <Link to="/" className="footer-brand-link">
                        BIOCOM
                    </Link>
                    <p className="footer-tagline">More information coming soon</p>
                </div>
            </div> */}

            <div className="footer-bottom">
                <div className="footer-container">
                    <p>&copy; {new Date().getFullYear()} BIOCOM Technologies LLC. All rights reserved.</p>
                </div>

                <div className="footer-container">
                    <ul className="footer-menu">
                        <p><Link to="/privacy-policy">Privacy Policy</Link></p>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;