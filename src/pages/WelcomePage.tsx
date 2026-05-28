import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  IoClose, 
  IoMenu, 
  IoPlay,
  IoPause,
  IoHeart, 
  IoChatbubble,
  IoLogoInstagram,
  IoLogoTiktok,
  IoLogoLinkedin,
  IoLogoApple,
  IoLogoAndroid,
  IoLogoWindows,
  IoPhonePortrait,
  IoBulbOutline,
  IoLayersOutline,
  IoColorWandOutline,
} from 'react-icons/io5';
import validator from 'validator';
import XLogo from '../components/XLogo';
import DawPreview from '../components/DawPreview';

// Import videos from assets
import CreateSectionVideo from '../assets/videos/Create Section Video_compressed.mp4';
import HomeFeedVideo from '../assets/videos/Home Feed Section Video.mp4';
import SearchSectionVideo from '../assets/videos/Search Section Video.mp4';
import ProfileSectionVideo from '../assets/videos/Profile Section Video.mp4';

const WelcomePage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [modalVideoIndex] = useState(0);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const featureAudioRef = useRef<HTMLAudioElement | null>(null);
  const [playingSongIndex, setPlayingSongIndex] = useState<number | null>(null);
  const [featureAudioPlaying, setFeatureAudioPlaying] = useState(false);
  
  const videos = [
    { src: CreateSectionVideo, name: 'Create' },
    { src: HomeFeedVideo, name: 'Discover' },
    { src: SearchSectionVideo, name: 'Search' },
    { src: ProfileSectionVideo, name: 'Profile' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const modalVideo = modalVideoRef.current;
    if (modalVideo && showVideoModal) {
      modalVideo.playbackRate = 1.0;
      modalVideo.play().catch(console.error);
    }
  }, [showVideoModal, modalVideoIndex]);

  const closeVideoModal = () => setShowVideoModal(false);

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
      await fetch(form.action, { method: 'POST', body: formData, mode: 'no-cors' });
      setTimeout(() => { setIsSubmitting(false); setShowThankYou(true); }, 1000);
    } catch {
      setTimeout(() => { setIsSubmitting(false); setShowThankYou(true); }, 1000);
    }
  };

  const songCards = [
    {
      title: "Cloud Nine Cruise",
      artist: "Luna Waves",
      artistAvatar: "https://i.pravatar.cc/100?img=1",
      likes: "3.1K",
      plays: "47K",
      cover:
        "https://storage.googleapis.com/songram-website-media/Cloud%20Nine%20Cruise%20-%20album%20cover.jpg",
      audio:
        "https://storage.googleapis.com/songram-website-media/Cloud%20Nine%20Cruise%20-%20audio.wav",
    },
    {
      title: "Groove Ijo",
      artist: "Afro Beats",
      artistAvatar: "https://i.pravatar.cc/100?img=2",
      likes: "1.8K",
      plays: "23K",
      cover:
        "https://storage.googleapis.com/songram-website-media/Groove%20Ijo%20-%20album%20cover.jpg",
      audio: "https://storage.googleapis.com/songram-website-media/Groove%20Ijo-%20audio.wav",
    },
    {
      title: "Pink Sounds in Space",
      artist: "Cosmic Drift",
      artistAvatar: "https://i.pravatar.cc/100?img=3",
      likes: "4.2K",
      plays: "89K",
      cover:
        "https://storage.googleapis.com/songram-website-media/Pink%20Sounds%20in%20Space%20-%20audio.jpg",
      audio:
        "https://storage.googleapis.com/songram-website-media/Pink%20Sounds%20in%20Space%20-%20audio.wav",
    },
    {
      title: "Pulse Sight",
      artist: "Neon Echo",
      artistAvatar: "https://i.pravatar.cc/100?img=4",
      likes: "2.6K",
      plays: "35K",
      cover:
        "https://storage.googleapis.com/songram-website-media/Pulse%20Sight%20%20-%20album%20cover.jpg",
      audio: "https://storage.googleapis.com/songram-website-media/Pulse%20Sight%20-%20audio.wav",
    },
  ];

  const handleFeatureSongPlay = (index: number) => {
    const audio = featureAudioRef.current;
    if (!audio) return;
    const song = songCards[index];

    if (playingSongIndex === index) {
      if (audio.paused) {
        void audio.play();
      } else {
        audio.pause();
      }
      return;
    }

    audio.src = song.audio;
    void audio
      .play()
      .then(() => setPlayingSongIndex(index))
      .catch(() => setPlayingSongIndex(null));
  };

  useEffect(() => {
    return () => {
      featureAudioRef.current?.pause();
    };
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/team', label: 'Team' },
    { path: '/pricing', label: 'Pricing' },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'navbar-blur' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="flex items-center space-x-2">
                <img src="/icon.png" alt="Songram" className="w-8 h-8 rounded-xl" />
                <span className="text-xl font-bold text-gradient glow-text font-satoshi">Songram</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <a href="https://songram.app/login" className="btn-primary">
                Get Started
              </a>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
              >
                {isMobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://songram.app/login"
                  className="w-full btn-primary mt-4 block text-center"
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
        {/* Animated floating album covers background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient overlay to fade out images - lighter to show more */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D12]/50 via-[#0D0D12]/30 to-[#0D0D12]/80 z-10"></div>
          
          {/* Floating album covers - more prominent */}
          <div className="absolute inset-0 opacity-70">
            {/* Row 1 - floating left */}
            <div className="absolute top-[5%] left-[-2%] animate-float-slow">
              <img 
                src="https://storage.googleapis.com/songram-website-media/Cloud%20Nine%20Cruise%20-%20album%20cover.jpg" 
                alt="" 
                className="w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover shadow-2xl blur-[2px]"
              />
            </div>
            <div className="absolute top-[8%] right-[8%] animate-float-slower">
              <img 
                src="https://storage.googleapis.com/songram-website-media/Groove%20Ijo%20-%20album%20cover.jpg" 
                alt="" 
                className="w-44 h-44 md:w-56 md:h-56 rounded-2xl object-cover shadow-2xl blur-[2px]"
              />
            </div>
            <div className="absolute top-[18%] left-[22%] animate-float-medium">
              <img 
                src="https://storage.googleapis.com/songram-website-media/Pink%20Sounds%20in%20Space%20-%20audio.jpg" 
                alt="" 
                className="w-40 h-40 md:w-52 md:h-52 rounded-2xl object-cover shadow-2xl blur-[2px]"
              />
            </div>
            
            {/* Row 2 */}
            <div className="absolute top-[38%] right-[-2%] animate-float-slow">
              <img 
                src="https://storage.googleapis.com/songram-website-media/Pulse%20Sight%20%20-%20album%20cover.jpg" 
                alt="" 
                className="w-52 h-52 md:w-72 md:h-72 rounded-2xl object-cover shadow-2xl blur-[2px]"
              />
            </div>
            <div className="absolute top-[42%] left-[-5%] animate-float-medium">
              <img 
                src="https://storage.googleapis.com/songram-website-media/Front_Image.png" 
                alt="" 
                className="w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover shadow-2xl blur-[2px]"
              />
            </div>
            
            {/* Row 3 */}
            <div className="absolute bottom-[20%] right-[12%] animate-float-slower">
              <img 
                src="https://storage.googleapis.com/songram-website-media/Mic_Image_1.png" 
                alt="" 
                className="w-44 h-44 md:w-56 md:h-56 rounded-2xl object-cover shadow-2xl blur-[2px]"
              />
            </div>
            <div className="absolute bottom-[12%] left-[5%] animate-float-slow">
              <img 
                src="https://storage.googleapis.com/songram-website-media/Tape_Untwinded.png" 
                alt="" 
                className="w-40 h-40 md:w-52 md:h-52 rounded-2xl object-cover shadow-2xl blur-[2px]"
              />
            </div>
            <div className="absolute bottom-[28%] left-[30%] animate-float-medium">
              <img 
                src="https://storage.googleapis.com/songram-website-media/Artist_Performing.png" 
                alt="" 
                className="w-36 h-36 md:w-48 md:h-48 rounded-2xl object-cover shadow-2xl blur-[2px]"
              />
            </div>
          </div>
          
          {/* Gradient blobs for color */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-[100px] z-0"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500/15 rounded-full blur-[100px] z-0"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] z-0"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-20 text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-[1.15] text-white font-display tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Instagram, 
            <span className="text-gradient block leading-[1.15] pb-[0.12em]">but for songs</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-satoshi"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Create music with the support of agentic AI and <span className="text-gradient font-medium">keep your creativity.</span>
        
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a href="https://songram.app/login" className="btn-primary px-6 py-3">
              Start Creating
            </a>
            <a href="#features" className="btn-secondary px-6 py-3">
              Learn More
            </a>
          </motion.div>
        </div>
      </section>

      {/* DAW Preview Section */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Try our studio</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-2xl overflow-hidden">
              <DawPreview onRequestSignup={() => setShowSignupModal(true)} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Human Element Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-4">
                <div className="human-image">
                  <img 
                    src="https://storage.googleapis.com/songram-website-media/Mic_Image_1.png" 
                    alt="Person with headphones" 
                    className="rounded-2xl w-full aspect-[2/3] object-cover"
                  />
                </div>
                <div className="human-image">
                  <img 
                    src="https://storage.googleapis.com/songram-website-media/Mic_Image_2.png" 
                    alt="Musician playing guitar" 
                    className="rounded-2xl w-full aspect-square object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="human-image">
                  <img 
                    src="https://storage.googleapis.com/songram-website-media/Tape_Untwinded.png" 
                    alt="Artist in studio" 
                    className="rounded-2xl w-full aspect-square object-cover"
                  />
                </div>
                <div className="human-image">
                  <img 
                    src="https://storage.googleapis.com/songram-website-media/Artist_Performing.png" 
                    alt="Person enjoying music" 
                    className="rounded-2xl w-full aspect-[2/3] object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Music is human.
                  <span className="text-gradient block">AI just helps you express it.</span>
                </h2>
                <p className="text-lg text-gray-400 mb-8">
                  Every song on Songram starts with a human feeling. Our AI doesn't replace your creativity, it amplifies it. 
                  Describe your mood, your memory, your moment, and watch as AI helps bring your vision to life.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to
              <span className="text-gradient block">make your next hit</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              From first idea to viral moment, Songram is your creative home.
            </p>
          </motion.div>

          <audio
            ref={featureAudioRef}
            className="hidden"
            preload="metadata"
            onPlay={() => setFeatureAudioPlaying(true)}
            onPause={() => setFeatureAudioPlaying(false)}
            onEnded={() => {
              setPlayingSongIndex(null);
              setFeatureAudioPlaying(false);
            }}
          />

          {/* Photo-style tall cards - all info overlaid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {songCards.map((song, index) => (
              <motion.div
                key={song.title}
                role="button"
                tabIndex={0}
                aria-label={
                  playingSongIndex === index && featureAudioPlaying
                    ? `Pause ${song.title}`
                    : `Play ${song.title}`
                }
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handleFeatureSongPlay(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleFeatureSongPlay(index);
                  }
                }}
              >
                {/* Tall Photo Card */}
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-zinc-800">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Playing waveform indicator */}
                  {playingSongIndex === index && featureAudioPlaying && (
                    <div className="absolute top-3 left-3 flex gap-[2px] items-end h-4">
                      {[3, 5, 4, 6, 3].map((h, b) => (
                        <div
                          key={b}
                          className="w-[3px] bg-primary-400 rounded-full animate-pulse"
                          style={{ height: `${h * 3}px`, animationDelay: `${b * 0.1}s` }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Centered play button */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                      playingSongIndex === index && featureAudioPlaying
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                      playingSongIndex === index && featureAudioPlaying
                        ? 'bg-primary-500 scale-100'
                        : 'bg-black/50 group-hover:bg-primary-500 group-hover:scale-110'
                    }`}>
                      {playingSongIndex === index && featureAudioPlaying ? (
                        <IoPause className="text-white" size={24} />
                      ) : (
                        <IoPlay className="text-white ml-1" size={24} />
                      )}
                    </div>
                  </div>

                  {/* All info overlaid at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* Stats */}
                    <div className="flex items-center gap-3 text-white/70 text-xs mb-2">
                      <div className="flex items-center gap-1">
                        <IoPlay size={11} />
                        <span>{song.plays}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IoHeart size={11} className="text-primary-400" />
                        <span>{song.likes}</span>
                      </div>
                    </div>
                    
                    {/* Song Title */}
                    <h3 className="font-semibold text-white text-sm leading-tight mb-2 drop-shadow-lg">
                      {song.title}
                    </h3>
                    
                    {/* Artist */}
                    <div className="flex items-center gap-2">
                      <img 
                        src={song.artistAvatar} 
                        alt={song.artist}
                        className="w-5 h-5 rounded-full object-cover ring-1 ring-white/20"
                      />
                      <span className="text-xs text-white/70">{song.artist}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agentic AI Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your AI co-producer
              <span className="text-gradient block">that actually thinks</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Songram's agentic AI doesn't just generate sounds. It plans, decides, and iterates
              like a seasoned producer working side-by-side with you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <IoBulbOutline size={22} />,
                title: "Plans Your Production",
                description: "Multi-step reasoning breaks your idea into beats, melody, arrangement, and mix decisions.",
              },
              {
                icon: <IoColorWandOutline size={22} />,
                title: "Decides Like a Producer",
                description: "Understands genre, mood, and context to autonomously pick the right sounds, tempo, key, and structure.",
              },
              {
                icon: <IoLayersOutline size={22} />,
                title: "Refines With You",
                description: "Iterates on your feedback, adjusting and polishing layers until your track sounds exactly right.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-primary-500/30 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-11 h-11 bg-primary-500/15 border border-primary-500/20 rounded-xl flex items-center justify-center text-primary-400 mb-5">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>


        </div>
      </section>

      {/* AI Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ideas in. Music out.
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto">
                Describe what you want to hear, and watch AI bring your vision to life.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <div className="bg-black/50 rounded-xl p-5 font-mono text-sm border border-white/10">
                  <div className="text-primary-400 mb-2 text-xs font-sans uppercase tracking-wider">Your prompt</div>
                  <div className="text-white">"Upbeat lo-fi hip hop with vinyl crackle and jazzy piano"</div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>
                  <span className="text-primary-400 text-xs uppercase tracking-wider">generating</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>
                </div>

                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                      <IoPlay size={20} className="text-white ml-0.5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Lo-fi Sunset</h4>
                      <p className="text-sm text-gray-400">AI Generated • 2:34</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 text-sm text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <IoHeart size={16} className="text-red-500" />
                      <span>2.4K</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <IoChatbubble size={16} />
                      <span>156</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary-500/20 to-primary-700/10 rounded-2xl p-8 flex items-center justify-center h-56">
                <div className="flex items-end gap-1 h-28">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 bg-primary-500 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 80 + 20}%`,
                        animationDelay: `${i * 0.05}s`,
                        animationDuration: '1s'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Desktop + Mobile App Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Take Songram beyond the browser
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Desktop and mobile apps are coming soon with more powerful tools and a seamless workflow.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center mb-6">
              <button 
                disabled
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
              >
                <IoLogoApple size={20} />
                <div className="text-left">
                  <div className="text-[10px] text-gray-500">Download for</div>
                  <div className="font-medium text-sm">macOS</div>
                </div>
              </button>
              
              <button 
                disabled
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
              >
                <IoLogoWindows size={20} />
                <div className="text-left">
                  <div className="text-[10px] text-gray-500">Download for</div>
                  <div className="font-medium text-sm">Windows</div>
                </div>
              </button>

              <button 
                disabled
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
              >
                <IoPhonePortrait size={20} />
                <div className="text-left">
                  <div className="text-[10px] text-gray-500">Coming soon on</div>
                  <div className="font-medium text-sm">iOS</div>
                </div>
              </button>

              <button 
                disabled
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
              >
                <IoLogoAndroid size={20} />
                <div className="text-left">
                  <div className="text-[10px] text-gray-500">Coming soon on</div>
                  <div className="font-medium text-sm">Android</div>
                </div>
              </button>
            </div>
            
            <p className="text-sm text-gray-500">
              Songram is live in public beta on web. <a href="https://songram.app/login" className="text-primary-400 hover:text-primary-300 underline underline-offset-2">Start creating now</a>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center bg-zinc-900/50 border border-zinc-800 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-14 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent pointer-events-none"></div>
            
            <div className="relative">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to make your next hit?
              </h2>
              <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm sm:text-base">
                Songram is live in public beta. Start creating with agentic AI now.
              </p>
              <a href="https://songram.app/login" className="btn-primary inline-block">
                Start Creating
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/icon.png" alt="Songram" className="w-8 h-8 rounded-xl" />
                <span className="text-lg font-bold text-gradient font-satoshi">Songram</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md text-sm">
                The AI-powered music creation platform where creativity meets technology.
              </p>
              <div className="flex space-x-3">
                <a href="https://www.instagram.com/songram.app/" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-pink-400 hover:bg-white/10 transition-all">
                  <IoLogoInstagram size={18} />
                </a>
                <a href="https://www.tiktok.com/@songram.app" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <IoLogoTiktok size={18} />
                </a>
                <a href="https://x.com/Songram_App" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <XLogo size={18} />
                </a>
                <a href="https://www.linkedin.com/company/songram/?viewAsMember=true" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all">
                  <IoLogoLinkedin size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About</Link></li>
                <li><Link to="/team" className="text-gray-400 hover:text-white transition-colors text-sm">Team</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
                <li><a href="mailto:team@songram.app" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Songram. All rights reserved.</p>
            <p className="text-gray-500 text-sm mt-2 sm:mt-0">Made with passion for music creators</p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setShowSignupModal(false); setShowThankYou(false); setEmailError(null); }}
          >
            <motion.div 
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setShowSignupModal(false); setShowThankYou(false); setEmailError(null); }}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <IoClose size={20} />
              </button>

              {showThankYou ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">You are all set.</h3>
                  <p className="text-gray-400 text-sm">Songram is live. We will keep you posted on major updates.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-2">Get Songram Updates</h3>
                  <p className="text-gray-400 mb-6 text-sm">Songram is live in public beta. Enter your email for feature drops and release notes.</p>
                  
                  <form 
                    action="https://app.us18.list-manage.com/subscribe/post?u=6672acc5c2e3d9aa757c7ab19&id=83ae707f97&f_id=004ea5e6f0"
                    method="post"
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <input
                        type="email"
                        name="EMAIL"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                        required
                      />
                      {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
                    </div>
                    <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                      <input type="text" name="b_6672acc5c2e3d9aa757c7ab19_83ae707f97" tabIndex={-1} defaultValue="" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full btn-primary-lg disabled:opacity-50">
                      {isSubmitting ? 'Submitting...' : 'Get Updates'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideoModal}
          >
            <motion.div
              className="relative max-w-lg w-full bg-black rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <IoClose size={24} />
              </button>
              <video
                ref={modalVideoRef}
                src={videos[modalVideoIndex]?.src}
                className="w-full"
                controls
                autoPlay
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WelcomePage;
