import React, { useState } from 'react';
import { CONFIG } from '../config';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import ContactUsForm from '../components/forms/ContactUsForm';

export function InfoPage() {
    const [showContactForm, setShowContactForm] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const backgroundStyle =
        CONFIG.backgroundType === 'image'
            ? {
                backgroundImage: `url(${CONFIG.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }
            : {};

    const handleFormSuccess = () => {
        setSubmitSuccess(true);
        setTimeout(() => {
            setShowContactForm(false);
            setSubmitSuccess(false);
        }, 2000);
    };

    const closeModal = () => {
        setShowContactForm(false);
        setSubmitSuccess(false);
    };

    return (
        <>
            <Navbar />
            <div className="App" style={backgroundStyle}>
                <div className="policy">
                    <div className="logo-row">
                        <h1 className="title">Welcome to BIOCOM</h1>
                    </div>

                    <div className="">
                        <section className="meta">
                            <p>
                                BIOCOM Technologies, LLC is developing next-generation human-computer interfaces that merge Brain-Computer Interface (BCI), Extended Reality (XR), and Artificial Intelligence (AI) into one ecosystem. Our mission is to make advanced neurotechnology accessible to students, developers, and researchers through open, affordable, and high-performance hardware.
                            </p>
                        </section>

                        <section id="what-we-do">
                            <h2>What We Do</h2>
                            <p>BIOCOM focuses on three core technology areas:</p>

                            <h3>Brain-Computer Interfaces (BCI)</h3>
                            <p>
                                We design compact and powerful biosignal acquisition systems that allow computers to interpret electrical activity from the human body — including EEG (brain), EMG (muscle), and EOG (eye) signals. These devices are being developed as modular, low-cost systems for education, prosthetics, and next-generation control systems.
                            </p>

                            <h3>Extended Reality (XR)</h3>
                            <p>
                                Our XR research explores how neural data can be integrated into immersive environments, allowing users to interact with virtual and augmented worlds in intuitive, brain-driven ways. By combining BCI hardware with XR visualization, we aim to expand the boundaries of how humans experience digital environments.
                            </p>

                            <h3>Artificial Intelligence (AI)</h3>
                            <p>
                                We use AI to process and interpret biosignals in real time, enabling adaptive and intelligent interfaces that respond to human thought, emotion, and movement. BIOCOM's AI efforts focus on edge computing — running powerful models directly on embedded devices for portability and privacy.
                            </p>
                        </section>

                        <section id="our-goal">
                            <h2>Our Goal</h2>
                            <p>
                                BIOCOM exists to bridge the gap between research labs and real-world applications. From brain-controlled robotics to immersive educational tools, our technology empowers anyone to explore how the brain and machine can work together.
                            </p>
                        </section>

                        <section id="join-revolution">
                            <h2>Join the Revolution</h2>
                            <p>
                                We're building an open ecosystem of tools, hardware, and software that make neurotechnology practical, ethical, and accessible. Whether you're a student, engineer, researcher, or creator — BIOCOM is your entry point into the future of human-computer interaction.
                            </p>

                            <div className="contact-section">
                                <button 
                                    className="contact-button" 
                                    onClick={() => setShowContactForm(true)}
                                >
                                    Contact Us
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <Modal isOpen={showContactForm} onClose={closeModal}>
                {submitSuccess ? (
                    <div className="success-message">
                        <h2>Thank you!</h2>
                        <p>Your message has been sent successfully. We'll get back to you soon.</p>
                    </div>
                ) : (
                    <ContactUsForm onClose={closeModal} onSuccess={handleFormSuccess} />
                )}
            </Modal>

            <Footer />
        </>
    );
}

export default InfoPage;

