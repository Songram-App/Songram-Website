import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  IoClose, 
  IoMenu, 
  IoPlay, 
  IoHeart, 
  IoChatbubble,
  IoLogoInstagram,
  IoLogoTiktok,
  IoLogoApple,
  IoLogoWindows
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
      title: "Midnight Drive",
      artist: "@luna_beats",
      plays: "12.4K",
      likes: "2.1K",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80",
      prompt: "Late night lo-fi with dreamy synths"
    },
    {
      title: "Golden Hour",
      artist: "@vibecheck",
      plays: "8.7K",
      likes: "1.5K",
      cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&q=80",
      prompt: "Chill acoustic sunset vibes"
    },
    {
      title: "Neon Dreams",
      artist: "@synthwave_kid",
      plays: "23.1K",
      likes: "4.2K",
      cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&q=80",
      prompt: "80s retro synthwave energy"
    },
    {
      title: "Summer Rain",
      artist: "@melodic.soul",
      plays: "15.8K",
      likes: "3.3K",
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80",
      prompt: "Mellow R&B with soft piano"
    }
  ];

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
              <button onClick={() => setShowSignupModal(true)} className="btn-primary">
                Get Started
              </button>
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
                <button
                  onClick={() => { setShowSignupModal(true); setIsMobileMenuOpen(false); }}
                  className="w-full btn-primary mt-4"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Copy */}
            <div className="text-center lg:text-left">
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-[1.1] text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Instagram, 
                <span className="text-gradient block">but for songs</span>
              </motion.h1>
              
              <motion.p 
                className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Create music with AI that feels like you. Share your sound with the world. 
                Connect with creators who get it.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <button onClick={() => setShowSignupModal(true)} className="btn-primary">
                  Start Creating
                </button>
                <a href="#features" className="btn-secondary">
                  Learn More
                </a>
              </motion.div>
            </div>

            {/* Right - Hero Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="human-image relative">
                <img 
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80" 
                  alt="Person creating music with headphones"
                  className="w-full h-auto rounded-2xl object-cover aspect-[4/3]"
                />
                {/* Floating music card - hidden on mobile */}
                <div className="hidden sm:block absolute -bottom-4 -left-4 bg-zinc-900 rounded-2xl p-4 border border-white/10 max-w-[200px] shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                      <IoPlay className="text-white ml-0.5" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white">Sunset Vibes</p>
                      <p className="text-xs text-gray-500">AI Generated</p>
                    </div>
                  </div>
                  <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-primary-500 rounded-full"></div>
                  </div>
                </div>

                {/* Floating likes badge */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur rounded-full px-3 py-1.5 flex items-center gap-1.5">
                  <IoHeart className="text-red-500" size={16} />
                  <span className="text-sm font-medium text-white">2.4k</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* DAW Preview */}
          <motion.div 
            className="mt-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
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
                    src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&q=80" 
                    alt="Person with headphones" 
                    className="rounded-2xl w-full aspect-[3/4] object-cover"
                  />
                </div>
                <div className="human-image">
                  <img 
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80" 
                    alt="Musician playing guitar" 
                    className="rounded-2xl w-full aspect-square object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="human-image">
                  <img 
                    src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&q=80" 
                    alt="Artist in studio" 
                    className="rounded-2xl w-full aspect-square object-cover"
                  />
                </div>
                <div className="human-image">
                  <img 
                    src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80" 
                    alt="Person enjoying music" 
                    className="rounded-2xl w-full aspect-[3/4] object-cover"
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
                  Every song on Songram starts with a human feeling. Our AI doesn't replace your creativity—it amplifies it. 
                  Describe your mood, your memory, your moment, and watch as AI helps bring your vision to life.
                </p>
                <div className="space-y-3">
                  {[
                    "Your creativity, your copyright",
                    "No musical experience required",
                    "Share instantly with your community"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {songCards.map((song, index) => (
              <motion.div
                key={index}
                className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3 hover:bg-zinc-800/70 transition-colors group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-3">
                  <img 
                    src={song.cover} 
                    alt={song.title}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                      <IoPlay className="text-white ml-0.5" size={18} />
                    </div>
                  </div>
                </div>
                <h3 className="font-medium text-white text-sm truncate">{song.title}</h3>
                <p className="text-gray-500 text-xs truncate">{song.artist}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <IoPlay size={10} />
                    {song.plays}
                  </span>
                  <span className="flex items-center gap-1">
                    <IoHeart size={10} />
                    {song.likes}
                  </span>
                </div>
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
                Words in. Music out.
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

      {/* Desktop App Section */}
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
              Take Songram to your desktop
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              More powerful tools, better performance, seamless workflow.
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
            </div>
            
            <p className="text-sm text-gray-500">
              Currently in private alpha. <button onClick={() => setShowSignupModal(true)} className="text-primary-400 hover:text-primary-300 underline underline-offset-2">Join the waitlist</button> for early access.
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
                Join the waitlist and be among the first to create with Songram.
              </p>
              <button
                onClick={() => setShowSignupModal(true)}
                className="btn-primary"
              >
                Join Waitlist
              </button>
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
                <a href="https://instagram.com/songramapp" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-pink-400 hover:bg-white/10 transition-all">
                  <IoLogoInstagram size={18} />
                </a>
                <a href="https://tiktok.com/@songramapp" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <IoLogoTiktok size={18} />
                </a>
                <a href="https://x.com/songramapp" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <XLogo size={18} />
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
                  <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                  <p className="text-gray-400 text-sm">We'll notify you when Songram launches.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-2">Join the Waitlist</h3>
                  <p className="text-gray-400 mb-6 text-sm">Be the first to experience AI-powered music creation.</p>
                  
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
                      {isSubmitting ? 'Joining...' : 'Join Waitlist'}
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
