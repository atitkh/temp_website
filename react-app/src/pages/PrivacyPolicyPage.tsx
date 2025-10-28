import React from 'react';
import './privacyPolicy.css';
import { CONFIG } from '../config';

export function PrivacyPolicyPage() {
    const backgroundStyle =
        CONFIG.backgroundType === 'image'
            ? {
                backgroundImage: `url(${CONFIG.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }
            : {};

    return (
        <div className="App" style={backgroundStyle}>
            <div className="policy">
                <div className="logo-row">
                    <img
                        src={CONFIG.logoSrc}
                        alt={`${CONFIG.companyName} Logo`}
                        className={`logo`}
                        style={{
                            width: '35px',
                            paddingTop: '2px',
                        }}
                    />
                    <h1 className="title">Privacy Policy</h1>
                </div>

                <div className="">
                    <header className="meta">
                        <p><strong>Effective Date:</strong> November 1, 2025</p>
                        <p><strong>Last Updated:</strong> October 26, 2025</p>
                        <p>
                            BIOCOM Technologies (“BIOCOM,” “we,” “our,” or “us”) respects your privacy and is committed to protecting your personal information.
                            This Privacy Policy explains how we collect, use, and share data when you visit our website
                            <a href="https://biocom.technology" rel="noopener noreferrer"> biocom.technology</a> or interact with our products, services, and online content (collectively, the “Services”).
                        </p>
                    </header>

                    <section id="information-we-collect">
                        <h2>1. Information We Collect</h2>
                        <p>We may collect the following types of information when you interact with our Services:</p>

                        <h3>a. Information You Provide</h3>
                        <ul>
                            <li><strong>Contact Information:</strong> such as your name, email address, organization, or phone number.</li>
                            <li><strong>Account Information:</strong> if you create an account or subscribe to updates.</li>
                            <li><strong>Communications:</strong> when you contact us, fill out forms, or request support.</li>
                        </ul>

                        <h3>b. Automatically Collected Information</h3>
                        <p>When you visit our site, we may automatically collect:</p>
                        <ul>
                            <li><strong>Usage Data:</strong> including IP address, browser type, operating system, referring URLs, and pages viewed.</li>
                            <li><strong>Cookies and Tracking Technologies:</strong> to improve site functionality and user experience.</li>
                        </ul>

                        <h3>c. Information from Third Parties</h3>
                        <p>
                            We may receive information about you from analytics providers, advertising partners, or social media platforms,
                            where permitted by law.
                        </p>
                    </section>

                    <section id="how-we-use-information">
                        <h2>2. How We Use Your Information</h2>
                        We use your data to:
                        <ul>
                            <li>Operate, maintain, and improve our Services</li>
                            <li>Respond to inquiries and provide customer support</li>
                            <li>Send updates, newsletters, or promotional materials (you can opt out anytime)</li>
                            <li>Analyze trends and user behavior to enhance user experience</li>
                            <li>Ensure security and compliance with legal obligations</li>
                        </ul>
                    </section>

                    <section id="how-we-share-information">
                        <h2>3. How We Share Information</h2>
                        <p>We do not sell your personal data. We may share limited information with:</p>
                        <ul>
                            <li><strong>Service Providers:</strong> who perform functions on our behalf (hosting, analytics, etc.).</li>
                            <li><strong>Business Partners:</strong> with your consent or as needed for collaborations.</li>
                            <li><strong>Legal Authorities:</strong> when required to comply with applicable laws or protect rights and safety.</li>
                        </ul>
                    </section>

                    <section id="data-retention">
                        <h2>4. Data Retention</h2>
                        <p>
                            We retain personal information only as long as necessary to fulfill the purposes outlined in this policy,
                            unless a longer retention period is required by law.
                        </p>
                    </section>

                    <section id="your-rights">
                        <h2>5. Your Rights</h2>
                        <p>Depending on your location, you may have rights to:</p>
                        <ul>
                            <li>Access, correct, or delete your personal data</li>
                            <li>Withdraw consent or object to certain processing activities</li>
                            <li>Request data portability</li>
                        </ul>
                        <p>To exercise these rights, please contact us at <a href="mailto:info@biocom.technology">info@biocom.technology</a>.</p>
                    </section>

                    <section id="cookies">
                        <h2>6. Cookies</h2>
                        <p>
                            BIOCOM uses cookies to personalize your experience and analyze site traffic. You can manage or disable cookies through
                            your browser settings, but some features may not function properly without them.
                        </p>
                    </section>

                    <section id="data-security">
                        <h2>7. Data Security</h2>
                        <p>
                            We use reasonable administrative, technical, and physical safeguards to protect your data from unauthorized access,
                            disclosure, or misuse. However, no online platform is entirely risk-free.
                        </p>
                    </section>

                    <section id="links">
                        <h2>8. Links to Other Websites</h2>
                        <p>
                            Our website may contain links to external sites not operated by us. We are not responsible for the privacy practices of these
                            third-party websites.
                        </p>
                    </section>

                    <section id="childrens-privacy">
                        <h2>9. Children’s Privacy</h2>
                        <p>
                            Our Services are not directed to children under 13, and we do not knowingly collect personal information from them.
                        </p>
                    </section>

                    <section id="changes">
                        <h2>10. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. The latest version will always be posted on this page with the updated
                            effective date.
                        </p>
                    </section>

                    <section id="contact">
                        <h2>11. Contact Us</h2>
                        If you have questions or concerns about this Privacy Policy, please contact us at:
                        <address>
                            <p><strong>BIOCOM Technologies</strong><br />
                                Little Rock, Arkansas, USA<br />
                                Email: <a href="mailto:info@biocom.technology">info@biocom.technology</a><br />
                                Website: <a href="https://biocom.technology" rel="noopener noreferrer">https://biocom.technology</a></p>
                        </address>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicyPage;
