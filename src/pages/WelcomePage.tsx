import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  IoMusicalNotes, 
  IoShareSocial, 
  IoPeople, 
  IoOptions, 
  IoClose, 
  IoMenu, 
  IoSunny, 
  IoMoon, 
  IoPlay, 
  IoHeart, 
  IoChatbubble,
  IoLogoInstagram,
  IoLogoTiktok
} from 'react-icons/io5';
import validator from 'validator';
import XLogo from '../components/XLogo';

const WelcomePage: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  
  // Video carousel state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoFading, setIsVideoFading] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [modalVideoIndex, setModalVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  
  const videos = [
    { src: '/videos/Create Section Video_compressed.mp4', name: 'Create Section' },
    { src: '/videos/Home Feed Section Video.mp4', name: 'Home Feed Section' },
    { src: '/videos/Search Section Video.mp4', name: 'Search Section' },
    { src: '/videos/Profile Section Video.mp4', name: 'Profile Section' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Video carousel management
  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo && !showVideoModal) {
      currentVideo.playbackRate = 1.25; // Set playback speed to 1.25x
      currentVideo.play().catch(console.error);
      
      const handleVideoEnd = () => {
        setIsVideoFading(true);
        
        setTimeout(() => {
          setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
          setIsVideoFading(false);
        }, 400); // 0.4 second fade transition
      };
      
      currentVideo.addEventListener('ended', handleVideoEnd);
      
      return () => {
        currentVideo.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [currentVideoIndex, videos.length, showVideoModal]);

  // Modal video management
  useEffect(() => {
    const modalVideo = modalVideoRef.current;
    if (modalVideo && showVideoModal) {
      modalVideo.playbackRate = 1.0; // Normal speed in modal
      modalVideo.play().catch(console.error);
    }
  }, [showVideoModal, modalVideoIndex]);

  const handleVideoClick = () => {
    setModalVideoIndex(currentVideoIndex);
    setShowVideoModal(true);
    // Pause the carousel video
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.pause();
    }
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    // Resume the carousel video
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.play().catch(console.error);
    }
  };

  const handleDotClick = (dotIndex: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the video modal
    if (dotIndex !== currentVideoIndex && !showVideoModal) {
      setIsVideoFading(true);
      
      setTimeout(() => {
        setCurrentVideoIndex(dotIndex);
        setIsVideoFading(false);
      }, 400); // 0.4 second fade transition
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
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

  const features = [
    {
      icon: <IoMusicalNotes size={32} className="text-primary-500" />,
      title: "AI Beats Generation",
      description: "Create beats, melodies, and enhance beats with simple text prompts."
    },
    {
      icon: <IoShareSocial size={32} className="text-primary-500" />,
      title: "Social Music Platform",
      description: "Share your creations and discover new music in our vibrant community."
    },
    {
      icon: <IoPeople size={32} className="text-primary-500" />,
      title: "Real-time Collaboration",
      description: "Work together with artists worldwide on your next musical masterpiece."
    },
    {
      icon: <IoOptions size={32} className="text-primary-500" />,
      title: "Tools for song creation",
      description: "Step into the easiest music production tools ever — and create studio-quality music"
    }
  ];

  return (
    <div className="min-h-screen bg-light-bg dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-light-bg/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {            /* Logo */}
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="/icon.png" 
                alt="Songram Logo" 
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-2xl font-bold text-gradient">Songram</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Features
              </a>
              <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                About
              </Link>
              <Link to="/community" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Community
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <IoSunny size={20} /> : <IoMoon size={20} />}
              </button>
              <button
                onClick={() => setShowSignupModal(true)}
                className="btn-primary"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <IoSunny size={20} /> : <IoMoon size={20} />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-light-bg dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Features
              </a>
              <Link to="/about" className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                About
              </Link>
              <Link to="/community" className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Community
              </Link>
              <button
                onClick={() => { setShowSignupModal(true); setIsMobileMenuOpen(false); }}
                className="w-full btn-primary"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        style={{ 
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, #0a0a0f, #1a1a2e, #16213e)' 
            : 'linear-gradient(135deg, #f8fafc, #e2e8f0, #cbd5e1)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              The ultimate social platform
              <span className="text-gradient block mt-3 pb-2 relative -top-[5px]">for song creation</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Create, collaborate, and share music like never before. Songram empowers you to turn ideas into tracks, connect with artists, and unleash your musical potential..
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={() => setShowSignupModal(true)}
                className="btn-primary text-base px-4 py-2"
              >
                Start Creating Now
              </button>
              
            </motion.div>
          </div>
          
          {/* Hero Visual */}
          <motion.div 
            className="mt-16 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-card p-8 rounded-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Live Demo</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    A new way to share, create, and vibe with music.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-sm">Create music no matter your skill — just bring your passion</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-sm">Collaborate and share your songs with the world to hear</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-sm">Create playlists that surprise even your own taste</span>
                    </div>
                  </div>
                </div>
                <div className="laptop-mockup" style={{ marginLeft: '-20px' }}>
                  <div className="laptop-screen">
                    {/* Video Carousel inside laptop screen */}
                    <div className="relative w-full h-full cursor-pointer" style={{ top: '-1px' }} onClick={handleVideoClick}>
                      {videos.map((video, videoIndex) => (
                        <video
                          key={videoIndex}
                          ref={(el) => (videoRefs.current[videoIndex] = el)}
                          src={video.src}
                          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-400 ${
                            videoIndex === currentVideoIndex && !isVideoFading
                              ? 'opacity-100'
                              : 'opacity-0'
                          }`}
                          muted
                          playsInline
                          preload="metadata"
                        />
                      ))}
                      
                      {/* Video indicator dots */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-2 z-10" style={{ bottom: '8px' }}>
                        {videos.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            onClick={(e) => handleDotClick(dotIndex, e)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer ${
                              dotIndex === currentVideoIndex
                                ? 'bg-white shadow-lg'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to video ${dotIndex + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="laptop-base"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tools to create songs and <span className="text-gradient">connect through sound</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From idea to finished track, our platform provides all easy to use tools for creating songs.
            </p>
          </motion.div>

          <div className="space-y-24">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="mb-6 flex justify-center lg:justify-start">
                    <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0">
                    {feature.description}
                  </p>
                </div>

                {/* Image/Visual Content */}
                <div className="flex-1 max-w-lg">
                  <div className="relative">
                    <div className="card p-8 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-800 h-64 lg:h-80 flex items-center justify-center rounded-2xl overflow-hidden">
                      {/* Feature-specific visual content */}
                      {index === 0 && (
                        <div className="text-center space-y-4">
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            {Array.from({ length: 12 }).map((_, i) => (
                              <div
                                key={i}
                                className="h-8 bg-primary-500/20 dark:bg-primary-400/30 rounded animate-pulse"
                                style={{ animationDelay: `${i * 0.1}s` }}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            "Create a lo-fi hip hop beat" → ♪ ♫ ♪
                          </div>
                        </div>
                      )}
                      
                      {index === 1 && (
                        <div className="w-full space-y-3">
                          <div className="flex items-center space-x-3 bg-white/80 dark:bg-gray-700/80 rounded-lg p-3">
                            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                              <IoMusicalNotes size={20} className="text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">My Track</div>
                              <div className="text-xs text-gray-500">2.4K plays</div>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <IoHeart size={14} />
                              <span>89</span>
                            </div>
                          </div>
                          <div className="flex justify-center space-x-2">
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      )}
                      
                      {index === 2 && (
                        <div className="text-center space-y-4">
                          <div className="flex justify-center space-x-2 mb-4">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>
                                {i}
                              </div>
                            ))}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            3 artists collaborating
                          </div>
                          <div className="flex justify-center space-x-1">
                            <div className="w-16 h-2 bg-primary-200 dark:bg-primary-800 rounded-full">
                              <div className="w-8 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {index === 3 && (
                        <div className="w-full space-y-3">
                          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                            <span>EQ</span>
                            <span>Reverb</span>
                            <span>Compressor</span>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="space-y-2">
                                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                                  <div 
                                    className="absolute bottom-0 left-0 right-0 bg-primary-500 rounded"
                                    style={{ height: `${30 + i * 20}%` }}
                                  ></div>
                                </div>
                                <div className="w-6 h-6 bg-primary-500 rounded-full mx-auto"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500/20 rounded-full animate-float"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-300/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Generation Demo */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">See AI in Action</h2>
              <p className="text-gray-600 dark:text-gray-300">
              Words in. Beats out. It's that effortless.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2">$ songram generate</div>
                  <div className="text-gray-300">"Create an upbeat electronic track with tropical house vibes"</div>
                  <div className="text-yellow-400 mt-2">✨ Generating your track...</div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">→</div>
                  <div className="flex-1">
                    <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                          <IoPlay size={20} className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">Tropical Sunset</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">AI Generated • 3:24</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <IoHeart size={16} />
                          <span>1.2K</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <IoChatbubble size={16} />
                          <span>89</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary-500/10 to-primary-700/10 rounded-xl p-8 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="grid grid-cols-8 gap-1 h-24 items-end mb-4">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-primary-500 rounded-sm animate-pulse"
                        style={{
                          height: `${Math.random() * 80 + 20}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Audio Visualization</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-500 to-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to create your next hit?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of artists already using Songram to bring their musical ideas to life.
            </p>
            <button
              onClick={() => setShowSignupModal(true)}
              className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              Get Started for Free
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <img 
                src="/icon.png" 
                alt="Songram Logo" 
                className="w-8 h-8 rounded-lg"
              />
              </div>
              <span className="text-xl font-bold text-gradient">Songram</span>
            </div>
            
            {/* Social Media Links */}
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <a
                href="https://instagram.com/songram.app" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group"
                aria-label="Follow us on Instagram"
              >
                <IoLogoInstagram size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              
              <a
                href="https://tiktok.com/@songram.app"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group"
                aria-label="Follow us on TikTok"
              >
                <IoLogoTiktok size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              
              <a 
                href="https://x.com/songram_app"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group"
                aria-label="Follow us on X (Twitter)"
              >
                <XLogo size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-primary-500 transition-colors duration-200">Privacy</a>
              <a href="#" className="hover:text-primary-500 transition-colors duration-200">Terms</a>
              <a href="#" className="hover:text-primary-500 transition-colors duration-200">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 Songram Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            className="bg-light-bg dark:bg-gray-900 rounded-2xl shadow-xl max-w-md w-full p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Join Songram</h3>
              <button
                onClick={() => setShowSignupModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <IoClose size={20} />
              </button>
            </div>

            {showThankYou ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-2">You're all set!</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  We'll notify you when Songram launches.
                </p>
              </div>
            ) : (
              <form
                action="https://app.us18.list-manage.com/subscribe/post?u=6672acc5c2e3d9aa757c7ab19&id=83ae707f97&f_id=004ea5e6f0"
                method="post"
                onSubmit={handleFormSubmit}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="EMAIL"
                    id="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your email"
                  />
                  {emailError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{emailError}</p>
                  )}
                </div>

                {/* Honeypot field for spam prevention */}
                <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                  <input type="text" name="b_6672acc5c2e3d9aa757c7ab19_83ae707f97" tabIndex={-1} defaultValue="" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Joining...' : 'Get Early Access'}
                </button>

                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                  By signing up, you agree to our Terms and Privacy Policy.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeVideoModal}
        >
          <motion.div
            className="relative max-w-4xl w-full max-h-[80vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Close button */}
            

            {/* Modal Video */}
            <video
              ref={modalVideoRef}
              src={videos[modalVideoIndex]?.src}
              className="w-full h-full object-contain"
              controls
              controlsList="nodownload"
              autoPlay
              playsInline
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
