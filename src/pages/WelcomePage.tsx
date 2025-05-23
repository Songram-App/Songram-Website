import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import '../styles/WelcomePage.scss';

// Add necessary type declarations for MailChimp
declare global {
  interface Window {
    jQuery: any;
    $: any;
    fnames: any[];
    ftypes: any[];
  }
}

const WelcomePage: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioVisualizerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const features = [
    {
      title: "Create Music",
      description: "Generate/add beats, melodies. Write/Generate Lyrics and polish your tracks with just text prompts",
      icon: "sparkles"
    },
    {
      title: "Design Album Covers",
      description: "Transform your ideas into stunning album artwork powered by AI",
      icon: "image"
    },
    {
      title: "Share Your Creations",
      description: "Post your music to your followers and build your audience",
      icon: "share"
    },
    {
      title: "Discover New Sounds",
      description: "Follow creators and discover music tailored to your taste",
      icon: "compass"
    }
  ];

  const tracks = [
    {
      id: 1,
      title: "Urban Vibes",
      artist: "BeatCreator",
      artistHandle: "@beatscreator",
      genre: "Hip Hop",
      duration: "2:55",
      likes: 842,
      comments: 52,
      isPlaying: true
    },
    {
      id: 2,
      title: "Cosmic Journey",
      artist: "NightOwl",
      artistHandle: "@nightowl",
      genre: "Ambient",
      duration: "4:12",
      likes: 1688,
      comments: 84,
      isPlaying: false
    }
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      profession: "Music Producer",
      text: "Songram revolutionized how I create and share music. The AI tools are intuitive and powerful."
    },
    {
      name: "Jamie Williams",
      profession: "Indie Artist",
      text: "I've gained over 5,000 followers since joining Songram. The platform makes music creation accessible to everyone."
    },
    {
      name: "Taylor Lee",
      profession: "Beat Maker",
      text: "The AI-assisted beat generation gives me inspiration when I'm stuck. Game changer for my workflow!"
    }
  ];

  // Handle scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const startAutoTransition = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    
    // Set new interval
    intervalRef.current = window.setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 5000);
  };

  useEffect(() => {
    // Feature carousel effect - start on component mount
    startAutoTransition();

    // Initialize canvas audio visualizer effect
    initAudioVisualizer();
    
    // Add resize listener for responsive canvas
    window.addEventListener('resize', handleResize);
    
    // Testimonial carousel
    const testimonialInterval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => {
      // Clean up on unmount
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      if (audioVisualizerRef.current) {
        cancelAnimationFrame(audioVisualizerRef.current);
      }
      window.removeEventListener('resize', handleResize);
      clearInterval(testimonialInterval);
    };
  }, []);
  
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initAudioVisualizer(); // Re-initialize on resize
    }
  };

  const handleFeatureHover = (index: number) => {
    // Set the hovered card as active
    setActiveFeature(index);
    
    // Reset the auto-transition timer
    startAutoTransition();
  };
  
  const handleFeatureKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveFeature(index);
      startAutoTransition();
    }
  };

  const initAudioVisualizer = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
    }> = [];

    // Create particles
    for (let i = 0; i < 100; i++) {
      const radius = Math.random() * 2 + 1;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        color: getRandomNeonColor(),
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        }
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(18, 18, 37, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      audioVisualizerRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const getRandomNeonColor = () => {
    const colors = [
      'rgba(136, 99, 237, 0.8)', // Purple (main theme)
      'rgba(0, 255, 255, 0.8)', // Cyan
      'rgba(255, 0, 128, 0.8)', // Pink
      'rgba(0, 255, 128, 0.8)', // Green
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Function to open the signup modal
  const openSignupModal = () => {
    setShowSignupModal(true);
  };

  // Function to close the signup modal
  const closeSignupModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowSignupModal(false);
    }
  };

  // Function to handle escape key press to close modal
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setShowSignupModal(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-dark text-light">
      {/* Particle background canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full z-0" 
        aria-hidden="true"
      />
      
      {/* Fixed navbar */}
      <header className="fixed top-0 w-full z-50 backdrop-filter backdrop-blur-md bg-dark/30 border-b border-primary/10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            {/* Replace with your actual logo path */}
            <img 
              src="/logo.png" 
              alt="Songram" 
              className="h-10 w-10 mr-3" 
            />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Songram
            </span>
          </div>
          <nav>
            <button 
              className="px-6 py-2 rounded-full bg-primary/90 hover:bg-primary transition-all duration-300 shadow-neon hover:shadow-neon-lg text-white font-medium"
              onClick={openSignupModal}
              aria-label="Create a new account by joining our mailing list"
            >
              Join Now
            </button>
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center justify-center px-4 py-16">
          <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div 
              className="flex flex-col gap-8 transform transition-all duration-700" 
              style={{ 
                transform: `translateY(${(0.5 - scrollProgress * 2) * 50}px)`,
                opacity: Math.max(0, 1 - scrollProgress * 2)
              }}
            >
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="block">Music Creation</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Reimagined
                </span>
              </h1>
              
              <p className="text-xl text-light/80 max-w-lg">
                Create, share, and discover music with AI-powered tools and a vibrant creator community
              </p>
              
              <div className="flex gap-4 mt-4">
                <button 
                  onClick={openSignupModal}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-neon hover:shadow-neon-lg transform hover:-translate-y-1 transition-all duration-300 text-white font-medium"
                >
                  Get Started
                </button>
                <a 
                  href="#demo" 
                  className="px-8 py-4 rounded-full border border-primary/50 hover:border-primary bg-dark/50 backdrop-filter backdrop-blur-sm hover:bg-dark/70 transform hover:-translate-y-1 transition-all duration-300"
                >
                  See Demo
                </a>
              </div>
            </div>
            
            <div 
              className="relative" 
              style={{ 
                transform: `translateY(${(0.5 - scrollProgress * 2) * -50}px)`,
                opacity: Math.max(0, 1 - scrollProgress * 2)
              }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30 animate-pulse-slow"></div>
              <div className="relative bg-dark/60 backdrop-filter backdrop-blur-md rounded-2xl p-6 border border-white/10">
                {/* Mock audio player UI */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium">Top Trending</h3>
                    <button className="text-primary hover:text-secondary transition-colors">
                      View All
                    </button>
                  </div>
                  
                  {/* Song items */}
                  {tracks.map((track, idx) => (
                    <div 
                      key={track.id} 
                      className={`flex items-center justify-between p-4 rounded-xl ${idx === 0 ? 'bg-primary/10 border border-primary/30' : 'hover:bg-white/5'} transition-all duration-300`}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${idx === 0 ? 'bg-primary' : 'bg-white/10'}`}
                          onClick={() => togglePlay()}
                        >
                          {idx === 0 && isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{track.title}</p>
                          <p className="text-sm text-light/60">{track.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs">{track.likes}</span>
                        </div>
                        <span className="text-xs text-light/60">{track.duration}</span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Waveform visualization */}
                  <div className="h-12 w-full flex items-end justify-between gap-[2px] mt-4 px-2">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-gradient-to-t from-primary to-secondary rounded-t-sm w-full"
                        style={{ 
                          height: `${20 + Math.sin(i * 0.5) * 15 + Math.sin(i * 0.3) * 10}%`,
                          opacity: isPlaying ? 1 : 0.5,
                          animation: isPlaying ? `equalize 1.2s ease-in-out ${i * 0.05}s infinite alternate` : 'none'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4 relative" id="features">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Powerful Features
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`
                    group relative rounded-2xl backdrop-blur-lg 
                    transition-all duration-500 cursor-pointer
                    ${index === activeFeature 
                      ? 'bg-dark-lighter/70 border border-primary/40 shadow-neon scale-105 z-10' 
                      : 'bg-dark-lighter/30 border border-white/5 hover:border-primary/30 hover:shadow-neon'}
                  `}
                  onMouseEnter={() => handleFeatureHover(index)}
                  onKeyDown={(e) => handleFeatureKeyDown(e, index)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={index === activeFeature}
                  aria-label={`${feature.title}: ${feature.description}`}
                >
                  {/* Glow effect */}
                  <div className={`
                    absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary 
                    rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500
                    ${index === activeFeature ? 'opacity-40 animate-pulse-slow' : ''}`} 
                  ></div>
                  
                  <div className="relative p-6 h-full flex flex-col items-center text-center">
                    <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center mb-4
                      ${index === activeFeature 
                        ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                        : 'bg-white/10 text-primary group-hover:bg-primary/20'} 
                      transition-all duration-300
                    `}>
                      {/* Icon SVGs based on feature type */}
                      {feature.icon === 'sparkles' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                        </svg>
                      )}
                      {feature.icon === 'image' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      )}
                      {feature.icon === 'share' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                      )}
                      {feature.icon === 'compass' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <h3 className={`text-xl font-bold mb-2 transition-all duration-300
                      ${index === activeFeature 
                        ? 'bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary' 
                        : 'text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary'}`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-light/70 group-hover:text-light/90 transition-colors">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-5 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-5 w-80 h-80 bg-secondary/20 rounded-full filter blur-3xl"></div>
        </section>
        
        {/* Demo Section */}
        <section className="py-20 px-4 relative bg-dark-lighter/30" id="demo">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
              See it in 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"> Action</span>
            </h2>
            <p className="text-xl text-light/70 text-center max-w-2xl mx-auto mb-16">
              Create, produce, and share music with our intuitive platform
            </p>
            
            {/* Laptop Mockup with app interface */}
            <div className="relative max-w-5xl mx-auto perspective">
              <div className="transform rotate-x-5 rotate-y-n10 transition-all duration-700 hover:rotate-x-3 hover:rotate-y-n5">
                <div className="bg-dark border-2 border-gray-800 rounded-t-2xl overflow-hidden shadow-2xl">
                  <div className="relative h-[400px] md:h-[500px] bg-dark">
                    {/* App UI content */}
                    <div className="h-full flex flex-col">
                      {/* App header */}
                      <div className="flex justify-between items-center p-4 bg-dark-lighter/70 border-b border-primary/10">
                        <div className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Songram</div>
                        <div className="flex gap-6">
                          <span className="opacity-100 relative cursor-pointer">
                            Home
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></span>
                          </span>
                          <span className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Explore</span>
                          <span className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Create</span>
                          <span className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Profile</span>
                        </div>
                      </div>
                      
                      {/* Feed content */}
                      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                        {tracks.map((track, index) => (
                          <div key={index} className={`rounded-xl overflow-hidden transition-all duration-300 
                            ${index === 0 
                              ? 'bg-dark-lighter/80 border border-primary/20 shadow-lg shadow-primary/10' 
                              : 'bg-dark-lighter/40 border border-white/5 hover:border-primary/10 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1'}`}>
                            <div className={`p-4 ${index === 0 ? 'border-l-4 border-primary' : ''}`}>
                              <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                                  <div className="font-medium">{track.artist}</div>
                                </div>
                                <div className="text-xs text-light/60">
                                  {track.genre} • {track.duration}
                                </div>
                              </div>
                              
                              <div className="text-xl font-semibold mb-4 text-light">{track.title}</div>
                              
                              <div className="h-16 flex items-end gap-[1px] mb-4">
                                {Array.from({ length: 30 }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className={`flex-1 rounded-t-sm ${index === 0 ? 'bg-gradient-to-t from-primary to-secondary' : 'bg-white/40'}`}
                                    style={{ 
                                      height: `${20 + Math.sin(i * 0.3) * 15}%`,
                                      animation: index === 0 && isPlaying ? `equalize 1.5s ease-in-out ${i * 0.05}s infinite alternate` : 'none'
                                    }}
                                  ></div>
                                ))}
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex gap-4">
                                  <div className="flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${index === 0 ? 'text-primary' : 'text-light/80'}`} viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm">{track.likes}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-light/80" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm">{track.comments}</span>
                                  </div>
                                </div>
                                
                                <div 
                                  className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
                                    ${index === 0 
                                      ? 'bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30' 
                                      : 'bg-white/20 hover:bg-white/30'} 
                                    transition-all duration-300 hover:scale-105`}
                                  onClick={togglePlay}
                                  aria-label={index === 0 ? (isPlaying ? "Pause" : "Play") : "Play"}
                                >
                                  {index === 0 && isPlaying ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Player bar */}
                      <div className="h-16 bg-dark-lighter/70 border-t border-primary/10 px-6 flex items-center justify-between backdrop-blur-sm">
                        <div className="flex items-center gap-3 w-48">
                          <div className="w-10 h-10 rounded bg-gradient-to-r from-primary to-secondary"></div>
                          <div>
                            <div className="font-medium text-sm whitespace-nowrap overflow-hidden">Urban Vibes</div>
                            <div className="text-xs text-light/70">BeatCreator</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="w-48 h-8 flex items-end gap-[1px]">
                            {Array.from({ length: 20 }).map((_, i) => (
                              <div 
                                key={i} 
                                className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/80 to-secondary/80"
                                style={{ 
                                  height: `${10 + Math.sin(i * 0.5) * 8}%`,
                                  opacity: isPlaying ? 1 : 0.5,
                                  animation: isPlaying ? `equalize 1.2s ease-in-out ${i * 0.05}s infinite alternate` : 'none'
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MailChimp Signup Modal */}
        {showSignupModal && (
          <div 
            className="signup-modal-overlay" 
            onClick={closeSignupModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-labelledby="signup-modal-title"
            aria-modal="true"
          >
            <div className="signup-modal-content" onClick={e => e.stopPropagation()}>
              <button 
                className="modal-close-btn" 
                onClick={() => setShowSignupModal(false)}
                aria-label="Close signup form"
              >
                ×
              </button>
              <div 
                id="mc_embed_signup"
                dangerouslySetInnerHTML={{
                  __html: `
                    <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css">
                    <div id="mc_embed_signup">
                      <form action="https://app.us18.list-manage.com/subscribe/post?u=6672acc5c2e3d9aa757c7ab19&amp;id=83ae707f97&amp;f_id=004ea5e6f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
                        <div id="mc_embed_signup_scroll"><h2 id="signup-modal-title">Join Waitlist</h2>
                          <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
                          <div class="mc-field-group">
                            <label for="mce-EMAIL">Email Address <span class="asterisk">*</span></label>
                            <input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required value="">
                          </div>
                          <div id="mce-responses" class="clear">
                            <div class="response" id="mce-error-response" style="display: none;"></div>
                            <div class="response" id="mce-success-response" style="display: none;"></div>
                          </div>
                          <div aria-hidden="true" style="position: absolute; left: -5000px;">
                            <input type="text" name="b_6672acc5c2e3d9aa757c7ab19_83ae707f97" tabindex="-1" value="">
                          </div>
                          <div class="clear">
                            <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe">
                          </div>
                        </div>
                      </form>
                    </div>
                  `
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WelcomePage; 