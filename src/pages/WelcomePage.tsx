import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  IoMusicalNotes, 
  IoShareSocial, 
  IoPeople, 
  IoSparkles, 
  IoClose, 
  IoMenu, 
  IoPlay, 
  IoHeart, 
  IoChatbubble,
  IoLogoInstagram,
  IoLogoTiktok,
  IoLogoApple,
  IoLogoWindows,
  IoDesktop,
  IoRocket,
  IoFlash
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
  
  // Video carousel state
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Video carousel management (disabled - videos are static previews)
  // useEffect(() => {
  //   const currentVideo = videoRefs.current[currentVideoIndex];
  //   if (currentVideo && !showVideoModal) {
  //     currentVideo.playbackRate = 1.25;
  //     currentVideo.play().catch(console.error);
  //     const handleVideoEnd = () => {
  //       setIsVideoFading(true);
  //       setTimeout(() => {
  //         setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  //         setIsVideoFading(false);
  //       }, 400);
  //     };
  //     currentVideo.addEventListener('ended', handleVideoEnd);
  //     return () => currentVideo.removeEventListener('ended', handleVideoEnd);
  //   }
  // }, [currentVideoIndex, videos.length, showVideoModal]);

  useEffect(() => {
    const modalVideo = modalVideoRef.current;
    if (modalVideo && showVideoModal) {
      modalVideo.playbackRate = 1.0;
      modalVideo.play().catch(console.error);
    }
  }, [showVideoModal, modalVideoIndex]);

  const closeVideoModal = () => {
    setShowVideoModal(false);
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
      icon: <IoMusicalNotes size={28} />,
      title: "AI Beat Generation",
      description: "Transform your ideas into professional beats with simple text prompts. No experience needed."
    },
    {
      icon: <IoShareSocial size={28} />,
      title: "Social Music Platform",
      description: "Share your creations, discover new music, and build your audience in our vibrant community."
    },
    {
      icon: <IoPeople size={28} />,
      title: "Real-time Collaboration",
      description: "Create together with artists worldwide. Collaborate in real-time on your next hit."
    },
    {
      icon: <IoSparkles size={28} />,
      title: "Studio-Quality Tools",
      description: "Professional production tools made simple. Create studio-quality music from anywhere."
    }
  ];

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/team', label: 'Team' },
    { path: '/pricing', label: 'Pricing' },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'navbar-blur shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="flex items-center space-x-2">
                <img src="/icon.png" alt="Songram" className="w-8 h-8 rounded-lg" />
                <span className="text-2xl font-bold text-gradient glow-text font-satoshi">Songram</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
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
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <IoRocket className="text-primary-400" />
              <span className="text-sm text-gray-300">Now in Early Access</span>
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Instagram, 
              <span className="text-gradient block mt-2 pb-2">but for songs</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Create. Collaborate. Share. Discover songs. <br />AI-powered music creation with your soul in it.
            </motion.p>

            
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button onClick={() => setShowSignupModal(true)} className="btn-primary px-8 py-4 text-lg">
                Start Creating
              </button>
              <a href="#features" className="btn-secondary px-8 py-4 text-lg">
                See How It Works
              </a>
            </motion.div>
          </div>

          {/* App Preview */}
          <motion.div 
            className="mt-20 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-3xl overflow-hidden">
              <DawPreview onRequestSignup={() => setShowSignupModal(true)} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title mb-4">
              Everything you need to
              <span className="text-gradient block pb-2">create amazing music</span>
            </h2>
            <p className="section-subtitle">
              From your first beat to viral hit, Songram has the tools to make it happen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Demo Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 md:p-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 text-primary-400 mb-4">
                <IoFlash />
                <span className="text-sm font-medium">AI-Powered</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Words in. Music out.
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Describe what you want to create, and watch AI bring your vision to life.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-black/50 rounded-xl p-5 font-mono text-sm border border-white/10">
                  <div className="text-primary-400 mb-2">→ Your prompt</div>
                  <div className="text-white">"Create an upbeat lo-fi hip hop beat with vinyl crackle and jazzy piano"</div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>
                  <span className="text-primary-400 text-sm">generating...</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>
                </div>

                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <IoPlay size={24} className="text-white ml-1" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Lo-fi Sunset</h4>
                      <p className="text-sm text-gray-400">AI Generated • 2:34</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <IoHeart size={16} className="text-red-400" />
                      <span>2.4K</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoChatbubble size={16} />
                      <span>156</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary-500/20 to-primary-700/10 rounded-2xl p-8 flex items-center justify-center h-64">
                <div className="flex items-end gap-1 h-32">
                  {Array.from({ length: 24 }).map((_, i) => (
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
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 mb-6">
              <IoDesktop />
              <span className="text-sm font-medium">Desktop App</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Take Songram to your desktop
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Get the full studio experience with our desktop app. More powerful tools, 
              better performance, and seamless integration with your workflow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <button 
                disabled
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
              >
                <IoLogoApple size={24} />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Download for</div>
                  <div className="font-semibold">macOS</div>
                </div>
              </button>
              
              <button 
                disabled
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
              >
                <IoLogoWindows size={24} />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Download for</div>
                  <div className="font-semibold">Windows</div>
                </div>
              </button>
            </div>
            
            <p className="text-sm text-gray-500">
              Currently in private alpha. <button onClick={() => setShowSignupModal(true)} className="text-primary-400 hover:text-primary-300 underline">Join the waitlist</button> for early access.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center bg-zinc-900/50 border border-zinc-800 rounded-xl p-12 md:p-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent"></div>
            
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Ready to create your next hit?
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                Join thousands of creators already making music with Songram.
              </p>
              <button
                onClick={() => setShowSignupModal(true)}
                className="btn-primary px-10 py-4 text-lg"
              >
                Get Started for Free
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/icon.png" alt="Songram" className="w-8 h-8 rounded-lg" />
                <span className="text-xl font-bold text-gradient font-satoshi">Songram</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The AI-powered music creation platform where creativity meets technology.
              </p>
              <div className="flex space-x-4">
                <a href="https://instagram.com/songramapp" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-pink-400 hover:bg-white/10 transition-all">
                  <IoLogoInstagram size={20} />
                </a>
                <a href="https://tiktok.com/@songramapp" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <IoLogoTiktok size={20} />
                </a>
                <a href="https://x.com/songramapp" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <XLogo size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/team" className="text-gray-400 hover:text-white transition-colors">Team</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><a href="mailto:team@songram.app" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Songram. All rights reserved.</p>
            <p className="text-gray-500 text-sm mt-4 md:mt-0">Made with passion for music creators</p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setShowSignupModal(false); setShowThankYou(false); setEmailError(null); }}
          >
            <motion.div 
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 w-full max-w-md relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setShowSignupModal(false); setShowThankYou(false); setEmailError(null); }}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <IoClose size={24} />
              </button>

              {showThankYou ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                  <p className="text-gray-400">We'll notify you when Songram launches.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-2">Join the Waitlist</h3>
                  <p className="text-gray-400 mb-6">Be the first to experience AI-powered music creation.</p>
                  
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
                      {emailError && <p className="text-red-400 text-sm mt-2">{emailError}</p>}
                    </div>
                    <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                      <input type="text" name="b_6672acc5c2e3d9aa757c7ab19_83ae707f97" tabIndex={-1} defaultValue="" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full btn-primary disabled:opacity-50">
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Joining...
                        </div>
                      ) : 'Join Waitlist'}
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
