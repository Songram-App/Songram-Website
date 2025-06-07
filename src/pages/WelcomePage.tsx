import React, { useState, useEffect } from 'react';
import { MusicNotes, ShareNetwork, UsersThree, SlidersHorizontal, X, List, Sun, Moon, InstagramLogo, TiktokLogo } from "@phosphor-icons/react";
import { Link } from 'react-router-dom';
import validator from 'validator';
import { motion, useInView } from 'framer-motion';

const WelcomePage: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );
  const [isScrolled, setIsScrolled] = useState(false);

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

  const features: Feature[] = [];

  // Feature data for animated grid
  const featureData = [
    {
      id: 'home-feed',
      title: 'Home Feed',
      description: 'Discover new music from artists around the world in your personalized feed.',
      image: '/src/pictures/Home Feed Section.png',
      alt: 'Songram Home Feed Interface'
    },
    {
      id: 'create-section',
      title: 'Music Creation Studio', 
      description: 'Create professional-quality tracks with our intuitive music production tools.',
      image: '/src/pictures/Create Section.png',
      alt: 'Songram Music Creation Studio'
    },
    {
      id: 'music-assistant',
      title: 'AI Music Assistant',
      description: 'Get intelligent suggestions and creative assistance powered by advanced AI.',
      image: '/src/pictures/Create Section - Music Assistant.png',
      alt: 'Songram AI Music Assistant'
    },
    {
      id: 'vocals',
      title: 'Vocal Recording',
      description: 'Record pristine vocals with studio-grade effects and real-time processing.',
      image: '/src/pictures/Create Section - Vocals.png',
      alt: 'Songram Vocal Recording Studio'
    },
    {
      id: 'album-cover',
      title: 'Album Cover Generator',
      description: 'Generate stunning album artwork with AI-powered design tools.',
      image: '/src/pictures/Create Section - Album Cover Generator.png',
      alt: 'Songram Album Cover Generator'
    },
    {
      id: 'search',
      title: 'Search & Discovery',
      description: 'Find artists, tracks, and collaborators with powerful search capabilities.',
      image: '/src/pictures/Search Section.png',
      alt: 'Songram Search and Discovery'
    },
    {
      id: 'profile',
      title: 'Artist Profile',
      description: 'Showcase your music and connect with fans through customizable profiles.',
      image: '/src/pictures/Profile Section.png',
      alt: 'Songram Artist Profile'
    },
    {
      id: 'direct-messages',
      title: 'Direct Messages',
      description: 'Collaborate and communicate with other artists through secure messaging.',
      image: '/src/pictures/Home Feed Section - DM.png',
      alt: 'Songram Direct Messages'
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

  const TestimonialCard: React.FC<{ testimonial: Testimonial, theme?: 'light' | 'dark' }> = ({ testimonial, theme }) => (
    <div className="glass-panel p-8 hover:scale-105 transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold mr-4">
          {testimonial.avatar}
        </div>
        <div>
          <h4 className={`text-lg sm:text-xl font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>{testimonial.name}</h4>
          <p className={`text-sm sm:text-base ${theme === 'light' ? 'text-black/60' : 'text-white/60'}`}>{testimonial.role}</p>
        </div>
      </div>
      <p className={`text-sm sm:text-base italic ${theme === 'light' ? 'text-black/80' : 'text-white/80'}`}>
        "{testimonial.content}"
      </p>
    </div>
  );

  // Animated Feature Component
  const AnimatedFeature: React.FC<{ 
    feature: typeof featureData[0];
    index: number;
    theme: 'light' | 'dark';
  }> = ({ feature, index, theme }) => {
    const ref = React.useRef(null);
    // Remove 'once: true' to allow animation both in and out
    const isInView = useInView(ref, { 
      amount: 0.3,
      margin: "0px 0px -100px 0px" // Start animation slightly before element comes into view
    });

    const isLeftColumn = index % 2 === 0;

    // Panel animation variants
    const panelVariants = {
      hidden: { 
        opacity: 0,
        scale: 0.95,
        y: 20
      },
      visible: { 
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut"
        }
      }
    };

    // Text slide out animation variants
    const textVariants = {
      hidden: { 
        opacity: 0,
        x: 0, // Start at center (inside image boundaries)
        y: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 0
      },
              visible: { 
          opacity: 1,
          // Slide OUT: left column goes LEFT (-), right column goes RIGHT (+)
          x: typeof window !== 'undefined' && window.innerWidth < 768 
            ? 0  // No horizontal movement on mobile
            : isLeftColumn ? -450 : 450, // Slide out 80% further beyond image boundaries
          y: typeof window !== 'undefined' && window.innerWidth < 768 ? -100 : 0, // Slide up on mobile
        transition: {
          duration: 0.8,
          delay: 0.2,
          ease: "easeInOut"
        }
      }
    };

    return (
      <motion.div
        ref={ref}
        variants={panelVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="feature-glass-panel p-3 md:p-8 relative group"
        style={{ overflow: 'visible' }} // Allow text to slide outside boundaries
      >
        {/* Image Container */}
        <div className="feature-image-container h-full relative overflow-hidden">
          <img 
            src={feature.image}
            alt={feature.alt}
            className="feature-image w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Animated Text - OUTSIDE image container so it can slide freely */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`
            absolute inset-0 flex flex-col justify-center pointer-events-none
            ${isLeftColumn ? 'items-start' : 'items-end'}
            md:justify-center
          `}
          style={{ 
            zIndex: 5, // Lower z-index to avoid interfering with hover
            // Position text to start from center and slide out
            left: isLeftColumn ? '50%' : 'auto',
            right: isLeftColumn ? 'auto' : '50%',
            transform: isLeftColumn ? 'translateX(-50%)' : 'translateX(50%)'
          }}
        >
          <div className={`
            bg-black/90 backdrop-blur-md rounded-lg p-4 md:p-6
            border border-white/20 shadow-2xl
            max-w-xs md:max-w-sm
            ${isLeftColumn ? 'text-left' : 'text-right'}
            pointer-events-none
          `}>
            <h3 className={`
              text-lg md:text-xl font-bold mb-2
              text-gradient
            `}>
              {feature.title}
            </h3>
            <p className={`
              text-sm md:text-base leading-relaxed
              text-white/90
            `}>
              {feature.description}
            </p>
            
            {/* Arrow indicator */}
            <div className={`
              mt-3 flex ${isLeftColumn ? 'justify-start' : 'justify-end'}
            `}>
              <div className={`
                text-primary text-xl font-bold
                ${isLeftColumn ? 'transform rotate-180' : ''}
              `}>
                →
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close mobile menu on click outside or scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = event.target as Element;
        const mobileMenuButton = document.querySelector('[aria-label*="menu"]');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const mobileMenuNav = mobileMenuOverlay?.querySelector('nav');
        
        // Don't close if clicking on the menu button
        if (mobileMenuButton && mobileMenuButton.contains(target)) {
          return;
        }
        
        // Close if clicking outside the menu navigation content
        if (mobileMenuOverlay && !mobileMenuNav?.contains(target)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isMobileMenuOpen && event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll when menu is closed
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen relative px-10 py-10 font-sans" style={{ marginTop: '76px' }}>
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-[9999] backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? theme === "light"
              ? "bg-[#f9f9f9] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] border-b border-black/10" // Light mode scroll effect
              : "bg-[#0a0a0f] shadow-[0_4px_6px_-1px_rgba(136,99,237,0.3)] border-b border-[#8863ed]/30" // Dark mode scroll effect
            : "bg-transparent"
        }`}
        style={{ 
          pointerEvents: 'auto',
          zIndex: 9999,
          position: 'fixed'
        }}
      >
        <div className="max-w-screen-xl mx-auto px-8 py-4 flex justify-between items-center relative z-[10000]" style={{ pointerEvents: 'auto' }}>
          <div className="relative">
          <span className="text-3xl font-bold text-gradient glow-text tracking-wider"  
          >
            SONGRAM
          </span>
          <div className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent${
              theme === "light" ? "text-black" : "text-white"
            }`}></div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/about"
              className="text-black dark:text-white no-underline text-lg hover:text-yellow-400 transition inline-flex items-center"
            >
              About
            </Link>
            <a
              href="#features"
              className="text-black dark:text-white no-underline text-lg hover:text-yellow-400 transition inline-flex items-center"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-black dark:text-white text-lg no-underline hover:text-yellow-400 transition inline-flex items-center"
            >
              Reviews
            </a>
            <button
              onClick={openSignupModal}
              className="glass-button text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-gradient-primary border-0 hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-105 rounded-full"
            >
              Join Waitlist
            </button>
            <button
              onClick={toggleTheme}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                marginLeft: 16,
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
          <button
            onClick={() => {
              console.log('Mobile menu button clicked!'); // Debug log
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="md:hidden bg-transparent border-none p-2 relative z-[10000] cursor-pointer"
            style={{ 
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 10000
            }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X size={32} color={theme === "dark" ? "#fff" : "#000"} /> // Dynamic color for X icon
            ) : (
              <List size={32} color={theme === "dark" ? "#fff" : "#000"} /> // Dynamic color for List icon
            )}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div
            id="mobile-menu-overlay"
            className={`fixed inset-0 z-[9998] flex flex-col items-center justify-center px-6 py-10 transition-colors duration-300 ${
              theme === "light"
                ? "bg-white text-black"
                : "bg-[#1a1a2e] text-white"
            }`}
            onClick={(e) => {
              // Close menu if clicking on the overlay background (not on the nav content)
              if (e.target === e.currentTarget) {
                setIsMobileMenuOpen(false);
              }
            }}
          >
            <nav className="flex flex-col items-center space-y-6 mt-16 w-full">
              <Link
                to="/about"
                className="text-2xl font-bold hover:text-primary transition duration-300 no-underline py-3 w-full text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <a
                href="#features"
                className="text-2xl font-bold hover:text-primary transition duration-300 no-underline py-3 w-full text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-2xl font-bold hover:text-primary transition duration-300 no-underline py-3 w-full text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reviews
              </a>
              <button
                onClick={() => {
                  openSignupModal();
                  setIsMobileMenuOpen(false);
                }}
                className="glass-button text-xl px-10 py-4 bg-gradient-primary border-0 hover:shadow-lg hover:shadow-primary/30 transform hover:scale-105 rounded-full transition duration-300 w-full mt-2 dark:text-white"
              >
                Join Waitlist
              </button>
              <button
                onClick={toggleTheme}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  marginTop: 28,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? (
                  <Sun size={36} weight="duotone" color="#8863ed" />
                ) : (
                  <Moon size={36} weight="duotone" color="#222" />
                )}
                <span
                  className={`ml-3 text-xl font-semibold ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </span>
              </button>
            </nav>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-8 text-center">
        <div className="max-w-6xl mx-auto hero-padding">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
          The <span className="text-gradient glow-text">ultimate</span> social platform for music{" "}
            <span className="text-gradient glow-text">creation</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto animate-slide-up">
            Create, collaborate, and share music like never before. Songram
            empowers you to turn ideas into tracks, connect with artists, and
            unleash your musical potential.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <button
              onClick={openSignupModal}
              className="glass-button text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-gradient-primary border-0 hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-105 rounded-full"
            >
              JOIN WAITLIST
            </button>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-300 via-white to-purple-400 bg-clip-text text-transparent ${
              theme === "light" ? "text-black !bg-none !text-black" : ""
            }`}
          >
            Features
          </h2>
          
        </div>

        


      {/* App Features Showcase */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-32">
            
            <p className={`text-xl max-w-3xl mx-auto ${theme === "light" ? "text-black/70" : "text-white/80"}`}>
              Discover the powerful features that make Songram the ultimate platform for music creation and social connection
            </p>
            <div className="w-32 h-1 bg-gradient-primary mx-auto mt-8 rounded-full"></div>
          </div>
          <br>
</br>
<br>
</br>

          {/* Animated Features Grid - Side by Side Layout */}
          <div className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
              {featureData.map((feature, index) => (
                <AnimatedFeature
                  key={feature.id}
                  feature={feature}
                  index={index}
                  theme={theme}
                />
              ))}
            </div>
          </div>


        </div>
      </section>


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
                    <div
                      className={`track-card-content ${
                        index === 0 ? "active" : ""
                      }`}
                    >
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
                              opacity: index === 0 ? 1 : 0.6,
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
                          aria-label={
                            index === 0
                              ? isPlaying
                                ? "Pause"
                                : "Play"
                              : "Play"
                          }
                        >
                          <Icon
                            name={
                              index === 0
                                ? isPlaying
                                  ? "pause"
                                  : "play"
                                : "play"
                            }
                            title={
                              index === 0
                                ? isPlaying
                                  ? "Pause"
                                  : "Play"
                                : "Play"
                            }
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
                          height: `${10 + Math.sin(i * 0.5) * 8}px`,
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
          <p>
            Make music with AI assistance, share it with your followers, and
            discover new artists - all in one place.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 text-gradient ${
              theme === "light" ? "text-black !bg-none !text-black" : ""
            }`}
          >
            What Creators Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                theme={theme}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI Showcase Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="ai-showcase" aria-labelledby="ai-showcase-title">
          <h2
            id="ai-showcase-title"
            className="text-4xl md:text-5xl font-bold text-center mb-8 text-gradient"
          >
            AI Music Generation Demo
          </h2>
          <div className="ai-generation">
            <div className="prompt" aria-label="Example AI prompt">
              "Create a synthwave beat with dreamy vocals"
            </div>
            <div className="arrow" aria-hidden="true">
              →
            </div>
            <div className="result" aria-label="AI generated result">
              <div className="ai-beat-visualizer">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="beat-segment"
                    style={{
                      animationDelay: `${i * 0.125}s`,
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
      <footer className="relative z-10 px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="text-xl font-bold text-gradient">Songram</span>
          </div>
          
          {/* Social Media Links */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <a
              href="https://instagram.com/songram.app" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-media-btn group"
              aria-label="Follow us on Instagram"
            >
              <InstagramLogo 
                size={28} 
                weight="duotone" 
                className="transition-all duration-300 group-hover:scale-110"
                style={{ color: 'rgba(136, 99, 237, 0.3)' }}
              />
            </a>
            
            <a
              href="https://tiktok.com/@songram.app"
              target="_blank"
              rel="noopener noreferrer"
              className="social-media-btn group"
              aria-label="Follow us on TikTok"
            >
              <TiktokLogo 
                size={28} 
                weight="duotone" 
                className="transition-all duration-300 group-hover:scale-110"
                style={{ color: 'rgba(136, 99, 237, 0.3)' }}
              />
            </a>
            
            <a 
	href="https://x.com/songram_app"
  target="_blank"
	className="social-media-btn group"
  >
	<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 72 72"
fill="none">
<path
  d="M40.7568 32.1716L59.3704 11H54.9596L38.7974 29.383L25.8887 11H11L30.5205 38.7983L11 61H15.4111L32.4788 41.5869L46.1113 61H61L40.7557 32.1716H40.7568ZM34.7152 39.0433L32.7374 36.2752L17.0005 14.2492H23.7756L36.4755 32.0249L38.4533 34.7929L54.9617 57.8986H48.1865L34.7152 39.0443V39.0433Z"
  fill="rgba(136, 99, 237, 0.3)" />
</svg></a>
          </div>
          
          <p className="text-white/60">
            © {new Date().getFullYear()} Songram. Revolutionizing music creation
            with AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;