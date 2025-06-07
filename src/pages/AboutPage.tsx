import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowLeft } from "@phosphor-icons/react";
import { Link } from 'react-router-dom';
import validator from 'validator';

const AboutPage: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const openSignupModal = () => {
    setShowSignupModal(true);
    setShowThankYou(false);
    setIsSubmitting(false);
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
    setShowThankYou(false);
    setIsSubmitting(false);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get('EMAIL') as string;

    if (!validator.isEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setEmailError(null);
    setIsSubmitting(true);

    try {
      await fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      setTimeout(() => {
        setIsSubmitting(false);
        setShowThankYou(true);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setIsSubmitting(false);
        setShowThankYou(true);
      }, 1000);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className="min-h-screen relative font-sans" style={{ marginTop: '76px' }}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-[9999] backdrop-blur-md transition-all duration-300 ${
        theme === "light"
          ? "bg-[#f9f9f9] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] border-b border-black/10"
          : "bg-[#0a0a0f] shadow-[0_4px_6px_-1px_rgba(136,99,237,0.3)] border-b border-[#8863ed]/30"
      }`}
      style={{ 
        pointerEvents: 'auto',
        zIndex: 9999,
        position: 'fixed'
      }}>
        <div className="max-w-screen-xl mx-auto px-8 py-4 flex justify-between items-center relative z-[10000]" style={{ pointerEvents: 'auto' }}>
          <Link to="/" className="flex items-center space-x-4 no-underline">
            <ArrowLeft size={24} className={theme === "light" ? "text-black" : "text-white"} />
            <span className={`text-2xl font-bold tracking-widest ${
              theme === "light" ? "text-black" : "text-white"
            }`}>
              SONGRAM
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`no-underline text-lg hover:text-yellow-400 transition ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              Home
            </Link>
            <button
              onClick={toggleTheme}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun size={32} weight="duotone" color="#8863ed" />
              ) : (
                <Moon size={32} weight="duotone" color="#222" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-300 via-white to-purple-400 bg-clip-text text-transparent ${
            theme === "light" ? "text-black !bg-none !text-black" : ""
          }`}>
            About Songram
          </h1>
          <div className="w-32 h-2 bg-gradient-primary mx-auto mb-12 rounded-full"></div>
          <p className={`text-xl md:text-2xl max-w-4xl mx-auto ${theme === "light" ? "text-black/70" : "text-white/80"}`}>
            Where music meets connection - Building the future of social music creation
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="about-card">
                <h3 className={`text-2xl font-bold mb-6 text-gradient`}>
                  Our Vision
                </h3>
                <p className={`text-lg leading-relaxed ${theme === "light" ? "text-black/80" : "text-white/90"}`}>
                  Songram is a next-generation social platform designed for music creators and lovers to connect, create, and be heard. Blending the expressive power of music with the connectivity of social media, Songram empowers users to craft original tracks, share them instantly, and build a following—all in one immersive experience.
                </p>
              </div>
              
              <div className="about-card">
                <h3 className={`text-2xl font-bold mb-6 text-gradient`}>
                  For Every Creator
                </h3>
                <p className={`text-lg leading-relaxed ${theme === "light" ? "text-black/80" : "text-white/90"}`}>
                  Whether you're a bedroom producer, lyricist, vocalist, or simply someone who loves discovering fresh sounds, Songram offers the tools and community to turn your passion into presence. Our in-app music creation tools let users generate cover art, compose tracks, and write lyrics—no studio required.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="about-card">
                <h3 className={`text-2xl font-bold mb-6 text-gradient`}>
                  Growth & Connection
                </h3>
                <p className={`text-lg leading-relaxed ${theme === "light" ? "text-black/80" : "text-white/90"}`}>
                  With real-time feedback, direct messaging, and a progression system from Rookie to Superstar, artists grow not just a fanbase, but a career. At Songram, we believe music should be accessible, collaborative, and social.
                </p>
              </div>
              
              <div className="about-card bg-gradient-primary/10 border-primary/30">
                <h3 className={`text-2xl font-bold mb-6 text-gradient`}>
                  Our Mission
                </h3>
                <p className={`text-lg leading-relaxed font-semibold ${theme === "light" ? "text-black" : "text-white"}`}>
                  That's why we're building more than an app—we're creating a global stage for everyday artists to thrive. Join a movement where every beat tells a story, and every voice has a place.
                </p>
                <div className="mt-8 text-center">
                  <span className="text-3xl font-bold text-gradient">Welcome to Songram—where music meets connection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-16 text-gradient`}>
            What Makes Us Different
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="about-card text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">AI</span>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${theme === "light" ? "text-black" : "text-white"}`}>
                AI-Powered Creation
              </h3>
              <p className={`${theme === "light" ? "text-black/70" : "text-white/80"}`}>
                Advanced AI tools help you create professional-quality music, even without prior experience.
              </p>
            </div>
            
            <div className="about-card text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">👥</span>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${theme === "light" ? "text-black" : "text-white"}`}>
                Social Connection
              </h3>
              <p className={`${theme === "light" ? "text-black/70" : "text-white/80"}`}>
                Connect with fellow creators, collaborate in real-time, and build meaningful relationships through music.
              </p>
            </div>
            
            <div className="about-card text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">🚀</span>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${theme === "light" ? "text-black" : "text-white"}`}>
                Career Growth
              </h3>
              <p className={`${theme === "light" ? "text-black/70" : "text-white/80"}`}>
                From Rookie to Superstar, our progression system helps you build not just fans, but a sustainable career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="about-card bg-gradient-primary/10 border-primary/30">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-8 text-gradient`}>
              Ready to Start Your Musical Journey?
            </h2>
            <p className={`text-xl mb-8 ${theme === "light" ? "text-black/80" : "text-white/90"}`}>
              Join thousands of creators who are already shaping the future of music on Songram.
            </p>
            <button
              onClick={openSignupModal}
              className="glass-button text-lg px-8 py-4 bg-gradient-primary border-0 hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-105 rounded-full"
            >
              JOIN WAITLIST
            </button>
          </div>
        </div>
      </section>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="signup-modal-overlay" onClick={closeSignupModal}>
          <div
            className={`signup-modal-content${
              theme === "light" ? " bg-white" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`modal-close-btn${
                theme === "light" ? " text-black" : ""
              }`}
              onClick={closeSignupModal}
              aria-label="Close signup form"
            >
              ×
            </button>
            {!showThankYou ? (
              <div id="mc_embed_signup">
                <h2
                  className={`text-2xl font-bold text-center mb-6 text-gradient${
                    theme === "light" ? " text-black !bg-none !text-black" : ""
                  }`}
                >
                  Join the Waitlist
                </h2>
                <form
                  onSubmit={handleFormSubmit}
                  action="https://app.us18.list-manage.com/subscribe/post?u=6672acc5c2e3d9aa757c7ab19&amp;id=83ae707f97&amp;f_id=004ea5e6f0"
                  method="post"
                >
                  <div className="mb-4">
                    <div className="mb-4 space-y-4">
                      <label
                        htmlFor="mce-EMAIL"
                        className={`block mb-2${
                          theme === "light" ? " text-black" : " text-white"
                        }`}
                      >
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        name="EMAIL"
                        id="mce-EMAIL"
                        required
                        className={`w-full px-4 py-3 border border-primary/50 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30${
                          theme === "light"
                            ? " bg-white text-black"
                            : " bg-black/50 text-white"
                        }`}
                        placeholder="Enter your email address"
                      />
                      {emailError && (
                        <p className="text-red-500 text-sm mt-2">
                          {emailError}
                        </p>
                      )}
                    </div>

                    {/* Hidden honeypot field */}
                    <div
                      style={{ position: "absolute", left: "-5000px" }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="b_6672acc5c2e3d9aa757c7ab19_83ae707f97"
                        tabIndex={-1}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-40 font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed${
                        theme === "light"
                          ? " bg-primary text-white hover:shadow-lg hover:shadow-primary/30"
                          : " bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary/30"
                      }`}
                    >
                      {isSubmitting ? "Joining..." : "JOIN"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mb-6">
                  <h2
                    className={`text-2xl font-bold text-gradient mb-2${
                      theme === "light"
                        ? " text-black !bg-none !text-black"
                        : ""
                    }`}
                  >
                    Thank you for joining!
                  </h2>
                  <br />
                  <p
                    className={
                      theme === "light" ? "text-black/80" : "text-white/80"
                    }
                  >
                    We'll notify you when Songram launches.
                  </p>
                </div>
                <button
                  onClick={closeSignupModal}
                  className={`glass-button border-0 px-6 py-3 font-semibold${
                    theme === "light"
                      ? " bg-primary text-white"
                      : " bg-gradient-primary text-white"
                  }`}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`relative z-10 px-6 py-12 border-t ${theme === "light" ? "border-black/10" : "border-white/10"}`}>
        <div className="max-w-6xl mx-auto text-center">
          <Link to="/" className="no-underline">
            <span className="text-xl font-bold text-gradient">Songram</span>
          </Link>
          <p className={`mt-4 ${theme === "light" ? "text-black/60" : "text-white/60"}`}>
            © {new Date().getFullYear()} Songram. Revolutionizing music creation with AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage; 