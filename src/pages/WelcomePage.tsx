import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomePage.scss';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioVisualizerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const features = [
    {
      title: "Create Music",
      description: "Generate/add beats, melodies. Write/Generate Lyrics and polish yourtracks with just text prompts",
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
    
    return () => {
      // Clean up on unmount
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      if (audioVisualizerRef.current) {
        cancelAnimationFrame(audioVisualizerRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
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
      'rgba(255, 0, 128, 0.8)', // Pink
      'rgba(0, 255, 255, 0.8)', // Cyan
      'rgba(128, 0, 255, 0.8)', // Purple
      'rgba(0, 255, 128, 0.8)', // Green
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const Icon: React.FC<{ name: string; title?: string }> = ({ name, title }) => {
    switch (name) {
      case 'sparkles':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img">
            {title && <title>{title}</title>}
            <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
          </svg>
        );
      case 'image':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img">
            {title && <title>{title}</title>}
            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
          </svg>
        );
      case 'share':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img">
            {title && <title>{title}</title>}
            <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
          </svg>
        );
      case 'compass':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img">
            {title && <title>{title}</title>}
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1010.562-.766 4.5 4.5 0 01-1.318 1.357L14.25 7.5l.165.33a.809.809 0 01-1.086 1.085l-.604-.302a1.125 1.125 0 00-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 01-2.288 4.04l-.723.724a1.125 1.125 0 01-1.298.21l-.153-.076a1.125 1.125 0 01-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 01-.21-1.298L9.75 12l-1.64-1.64a6 6 0 01-1.676-3.257l-.172-1.03z" clipRule="evenodd" />
          </svg>
        );
      case 'heart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img">
            {title && <title>{title}</title>}
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        );
      case 'comment':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img">
            {title && <title>{title}</title>}
            <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
          </svg>
        );
      case 'play':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img">
            {title && <title>{title}</title>}
            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
          </svg>
        );
      case 'pause':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img">
            {title && <title>{title}</title>}
            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="welcome-page">
      <canvas ref={canvasRef} className="background-canvas" aria-hidden="true" />
      
      <main className="content">
        <header className="header">
          <div className="logo">
            <div className="logo-glow" aria-hidden="true"></div>
            <h1>Songram</h1>
          </div>
          <p className="tagline">Music content creator social media</p>
        </header>

        <nav className="cta-buttons" aria-label="Sign in options">
          <button 
            className="btn-login" 
            onClick={() => navigate('/login')}
            aria-label="Log in to your account"
          >
            Log In
          </button>
          <button 
            className="btn-signup" 
            onClick={() => navigate('/signup')}
            aria-label="Create a new account"
          >
            Sign Up
          </button>
        </nav>

        <section className="features-showcase" aria-label="Key features">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card ${index === activeFeature ? 'active' : ''}`}
              onMouseEnter={() => handleFeatureHover(index)}
              onKeyDown={(e) => handleFeatureKeyDown(e, index)}
              tabIndex={0}
              role="button"
              aria-pressed={index === activeFeature}
              aria-label={`${feature.title}: ${feature.description}`}
            >
              <div className="feature-icon">
                <Icon name={feature.icon} title={feature.title} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </section>

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

        <section className="ai-showcase" aria-labelledby="ai-showcase-title">
          <h2 id="ai-showcase-title" className="visually-hidden">AI Music Generation Demo</h2>
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
        </section>
      </main>
    </div>
  );
};

export default WelcomePage; 