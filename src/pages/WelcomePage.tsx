import React, { useState, useEffect } from 'react';
import { MusicNotes, ShareNetwork, UsersThree, SlidersHorizontal } from "phosphor-react";
import validator from 'validator';

const WelcomePage: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  interface Feature {
    title: string;
    description: string;
    icon: JSX.Element;
  }

  interface Testimonial {
    name: string;
    role: string;
    content: string;
    avatar: string;
  }

  interface Track {
    title: string;
    artist: string;
    genre: string;
    duration: string;
    likes: string;
    comments: string;
  }

  const features: Feature[] = [
    {
      title: "Create Music",
      description: "Generate/add beats, melodies. Write/Generate Lyrics and polish your tracks with just text prompt",
      icon: <MusicNotes size={40} weight="duotone" className="mx-auto text-primary" />
    },
    {
      title: "Social Sharing",
      description: "Share your creations with a global community",
      icon: <ShareNetwork size={40} weight="duotone" className="mx-auto text-primary" />
    },
    {
      title: "Real-time Collaboration",
      description: "Create music together with artists worldwide",
      icon: <UsersThree size={40} weight="duotone" className="mx-auto text-primary" />
    },
    {
      title: "Accessible Tools",
      description: "Easy to use, no need to be a professional to create music",
      icon: <SlidersHorizontal size={40} weight="duotone" className="mx-auto text-primary" />
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Alex Chen",
      role: "Music Producer",
      content: "Songram revolutionized my creative process. The AI suggestions are incredibly intuitive.",
      avatar: "AC"
    },
    {
      name: "Sarah Williams",
      role: "Independent Artist",
      content: "The collaboration features helped me connect with amazing artists globally.",
      avatar: "SW"
    },
    {
      name: "Marcus Johnson",
      role: "Sound Engineer",
      content: "Professional-grade tools with the simplicity of modern design. Perfect combination.",
      avatar: "MJ"
    }
  ];

  const tracks: Track[] = [
    {
      title: "Urban Vibes",
      artist: "BeatCreator",
      genre: "Hip-Hop",
      duration: "2:55",
      likes: "1.2K",
      comments: "89"
    },
    {
      title: "Cosmic Journey",
      artist: "NightOwl",
      genre: "Synthwave",
      duration: "3:42",
      likes: "856",
      comments: "45"
    }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [emailError, setEmailError] = useState<string | null>(null);

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

  const Icon: React.FC<{ name: string; title?: string }> = ({ name, title }) => {
    const getIconPath = (iconName: string) => {
      switch (iconName) {
        case 'heart':
          return 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z';
        case 'comment':
          return 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z';
        case 'play':
          return 'M8 5v14l11-7z';
        case 'pause':
          return 'M6 4h4v16H6zM14 4h4v16h-4z';
        default:
          return '';
      }
    };

    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label={title}
      >
        <path d={getIconPath(name)} />
      </svg>
    );
  };

  const FeatureCard: React.FC<{ feature: Feature; isActive: boolean }> = ({ feature, isActive }) => (
    <div
      className={`bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl floating-element ${
        isActive ? 'ring-2 ring-primary/50 bg-primary/10' : ''
      }`}
      aria-pressed={isActive}
    >
      {feature.icon}
      <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
      <p className="text-white/70">{feature.description}</p>
    </div>
  );

  const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="glass-panel p-8 floating-element hover:scale-105 transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold mr-4">
          {testimonial.avatar}
        </div>
        <div>
          <h4 className="text-white font-semibold">{testimonial.name}</h4>
          <p className="text-white/60 text-sm">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-white/80 italic">"{testimonial.content}"</p>
    </div>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Updated button styles for experimentation
  const buttonBaseStyles = "relative glass-button bg-gradient-primary border-0 font-semibold tracking-wide overflow-hidden group";
  const buttonHoverEffects = "hover:shadow-lg hover:shadow-primary/30 transform hover:scale-105 transition-all duration-300";

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 mx-6 mt-6">
        <div className="glass-panel px-8 py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary opacity-20 animate-pulse"></div>
          <div className="absolute inset-1 bg-gradient-dark rounded-2xl"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="text-3xl font-bold text-gradient glow-text tracking-wider">SONGRAM</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="relative text-white opacity-90 hover:opacity-100 transition-all duration-300 hover:text-primary group px-4 py-2">
                <span className="relative z-10">Features</span>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
              </a>
              <a href="#testimonials" className="relative text-white opacity-90 hover:opacity-100 transition-all duration-300 hover:text-primary group px-4 py-2">
                <span className="relative z-10">Reviews</span>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
              </a>
              <button 
                onClick={openSignupModal}
                className={`${buttonBaseStyles} ${buttonHoverEffects} px-8 py-4 text-lg`}
              >
                JOIN WAITLIST
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 focus:outline-none group bg-transparent"
                aria-label="Open menu"
              >
                <div className="w-6 h-6 flex flex-col justify-between">
                  <div className="w-full h-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="w-full h-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="w-full h-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex items-end bg-black/50">
            <div className="w-full bg-gradient-dark rounded-t-3xl p-6">
              <button
                onClick={toggleMobileMenu}
                className="text-white text-3xl focus:outline-none hover:text-primary transition-transform transform hover:rotate-90"
                aria-label="Close menu"
              >
                ×
              </button>
              <div className="flex flex-col items-center space-y-6 text-center">
                <a
                  href="#features"
                  className="text-white text-xl font-semibold hover:text-primary transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  className="text-white text-xl font-semibold hover:text-primary transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Reviews
                </a>
                <button
                  onClick={() => {
                    toggleMobileMenu();
                    openSignupModal();
                  }}
                  className={`${buttonBaseStyles} ${buttonHoverEffects} text-lg px-4 py-2`}
                >
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
        Where <span className="text-gradient glow-text">AI</span> meets <span className="text-gradient glow-text">Creativity</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto animate-slide-up">
        Create, collaborate, and share music like never before. Songram empowers you to turn ideas into tracks, connect with artists, and unleash your musical potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <button 
          onClick={openSignupModal}
          className={`${buttonBaseStyles} ${buttonHoverEffects} px-8 py-4 text-lg`}
        >
          JOIN WAITLIST
        </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-24">
        {/* Animated Gradient Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1d1d1d] to-black blur-3xl opacity-70 pointer-events-none" aria-hidden="true"></div>
        <div className="max-w-6xl mx-auto relative">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-300 via-white to-purple-400 bg-clip-text text-transparent">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} isActive={currentFeature === index} />
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="app-preview" aria-labelledby="app-preview-title">
        <div className="laptop-mockup" aria-hidden="true">
          <div className="laptop-screen">
            <div className="app-ui">
              <div className="app-header">
                <div className="app-logo">Songram</div>
                <div className="app-nav">
                  <div className="nav-item active">Home</div>
                  <div className="nav-item">Explore</div>
                  <div className="nav-item">Create</div>
                  <div className="nav-item">Profile</div>
                </div>
              </div>
              
              <div className="feed-content">
                {tracks.map((track, index) => (
                  <div key={index} className="track-card">
                    <div className={`track-card-content ${index === 0 ? 'active' : ''}`}>
                      <div className="track-card-header">
                        <div className="artist-info">
                          <div className="artist-avatar"></div>
                          <div className="artist-name">{track.artist}</div>
                        </div>
                        <div className="track-meta">
                          {track.genre} • {track.duration}
                        </div>
                      </div>
                      
                      <div className="track-title">{track.title}</div>
                      
                      <div className="waveform">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="bar" 
                            style={{ 
                              height: `${20 + Math.sin(i * 0.3) * 15}px`,
                              animationDelay: `${i * 0.05}s`,
                              opacity: index === 0 ? 1 : 0.6
                            }}
                          ></div>
                        ))}
                      </div>
                      
                      <div className="track-footer">
                        <div className="track-stats">
                          <div className="stat">
                            <Icon name="heart" title="Likes" />
                            <span>{track.likes}</span>
                          </div>
                          <div className="stat">
                            <Icon name="comment" title="Comments" />
                            <span>{track.comments}</span>
                          </div>
                        </div>
                        <div 
                          className="track-play" 
                          onClick={togglePlay}
                          aria-label={index === 0 ? (isPlaying ? "Pause" : "Play") : "Play"}
                        >
                          <Icon 
                            name={index === 0 ? (isPlaying ? "pause" : "play") : "play"} 
                            title={index === 0 ? (isPlaying ? "Pause" : "Play") : "Play"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="player-bar">
                <div className="now-playing">
                  <div className="track-thumbnail"></div>
                  <div className="track-info">
                    <div className="current-track-title">Urban Vibes</div>
                    <div className="current-track-artist">BeatCreator</div>
                  </div>
                </div>
                <div className="player-controls">
                  <div className="mini-waveform">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="mini-bar"
                        style={{ 
                          height: `${10 + Math.sin(i * 0.5) * 8}px`
                        }}
                      ></div>
                    ))}
                  </div>
                  <div 
                    className="play-button" 
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    <Icon 
                      name={isPlaying ? "pause" : "play"} 
                      title={isPlaying ? "Pause" : "Play"}
                    />
                  </div>
                </div>
                <div className="time-display">
                  <span>1:34</span>
                  <span aria-hidden="true">/</span>
                  <span>2:55</span>
                </div>
              </div>
            </div>
          </div>
          <div className="laptop-base"></div>
        </div>
        
        <div className="app-description">
          <h2 id="app-preview-title">Create, Share, Connect</h2>
          <p>Make music with AI assistance, share it with your followers, and discover new artists - all in one place.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
            What Creators Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Showcase Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="ai-showcase" aria-labelledby="ai-showcase-title">
          <h2 id="ai-showcase-title" className="text-4xl md:text-5xl font-bold text-center mb-8 text-gradient">
            AI Music Generation Demo
          </h2>
          <div className="ai-generation">
            <div className="prompt" aria-label="Example AI prompt">
              "Create a synthwave beat with dreamy vocals"
            </div>
            <div className="arrow" aria-hidden="true">→</div>
            <div className="result" aria-label="AI generated result">
              <div className="ai-beat-visualizer">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="beat-segment" 
                    style={{
                      animationDelay: `${i * 0.125}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="signup-modal-overlay" onClick={closeSignupModal}>
          <div className="signup-modal-content w-full max-w-md mx-auto bg-gradient-dark p-6 rounded-lg shadow-lg" onClick={e => e.stopPropagation()}>
            <button 
              className="modal-close-btn absolute top-4 right-4 text-white text-2xl"
              onClick={closeSignupModal}
              aria-label="Close signup form"
            >
              ×
            </button>
            
            {!showThankYou ? (
              <div id="mc_embed_signup">
                <h2 className="text-2xl font-bold text-center mb-6 text-gradient">Join the Waitlist</h2>
                <form onSubmit={handleFormSubmit} action="https://app.us18.list-manage.com/subscribe/post?u=6672acc5c2e3d9aa757c7ab19&amp;id=83ae707f97&amp;f_id=004ea5e6f0" method="post">
                  <div className="mb-4">

                    <div className="mb-4 space-y-4">
                      <label htmlFor="mce-EMAIL" className="block text-white mb-2">
                        Email Address <span className="text-primary">*</span>
                        
                      </label>
                      
                      <input 
                        type="email" 
                        name="EMAIL" 
                        id="mce-EMAIL" 
                        required 
                        className="w-full px-4 py-3 bg-black/50 border border-primary/50 rounded-lg text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="Enter your email address"
                      />
                    </div>
                    
                    {/* Error message for email input */}
                    {emailError && (
                      <div className="mt-2 text-red-500 text-sm text-center">
                        {emailError}
                      </div>
                    )}
                    
                    {/* Hidden honeypot field */}
                    <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                      <input type="text" name="b_6672acc5c2e3d9aa757c7ab19_83ae707f97" tabIndex={-1} />
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-40 bg-gradient-primary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Joining...' : 'JOIN'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gradient mb-2">Thank you for joining!</h2>
                  <br>
                  </br>
                  <p className="text-white/80">We'll notify you when Songram launches.</p>
                </div>
                <button 
                  onClick={closeSignupModal}
                  className="glass-button bg-gradient-primary border-0 px-6 py-3 font-semibold"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="text-xl font-bold text-gradient">Songram</span>
          </div>
            <p className="text-white/60">
            © {new Date().getFullYear()} Songram. Revolutionizing music creation with AI.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;