import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  IoClose, 
  IoMenu,
  IoLogoInstagram,
  IoLogoTiktok,
  IoHeart,
  IoMusicalNotes,
  IoPeople,
  IoSparkles
} from 'react-icons/io5';
import validator from 'validator';
import XLogo from '../components/XLogo';

const AboutPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <motion.div className="flex items-center space-x-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Link to="/" className="flex items-center space-x-2">
                <img src="/icon.png" alt="Songram" className="w-8 h-8 rounded-lg" />
                <span className="text-2xl font-bold text-gradient glow-text">Songram</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} 
                  className={`transition-colors ${link.path === '/about' ? 'text-primary-400' : 'text-gray-300 hover:text-white'}`}>
                  {link.label}
                </Link>
              ))}
              <button onClick={() => setShowSignupModal(true)} className="btn-primary">Get Started</button>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-xl bg-white/5 text-gray-300">
              {isMobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10"
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 ${link.path === '/about' ? 'text-primary-400' : 'text-gray-300'}`}>
                    {link.label}
                  </Link>
                ))}
                <button onClick={() => { setShowSignupModal(true); setIsMobileMenuOpen(false); }} className="w-full btn-primary mt-4">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 text-primary-400 mb-6">
              <IoHeart size={20} />
              <span className="text-sm font-medium">Our Story</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              The Future of Music Is
              <span className="text-gradient block mt-2">Personal, Social, and Limitless</span>
            </h1>
          </motion.div>

          {/* Story Content */}
          <motion.div className="space-y-12" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                Over the past decade, social media has been dominated by photo first platforms. And while a picture may be worth a thousand words, 
                <span className="text-primary-400 font-medium"> music is a universal language that speaks directly to the soul</span>, 
                a language that can express emotions that words and images never could.
              </p>

              <p className="text-xl text-gray-300 leading-relaxed">
                <span className="text-primary-400 font-medium">Songram is the platform where musical expression finally meets social connection.</span> 
                {' '}It bridges the gap between the thoughts in your mind and the song that perfectly captures them — even if you've never made music before.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div className="feature-card p-6 text-center" whileHover={{ y: -4 }}>
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center text-primary-400 mx-auto mb-4">
                  <IoMusicalNotes size={24} />
                </div>
                <h3 className="text-white font-semibold mb-2">Create</h3>
                <p className="text-gray-400 text-sm">No experience needed. Just your passion for music.</p>
              </motion.div>

              <motion.div className="feature-card p-6 text-center" whileHover={{ y: -4 }}>
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center text-primary-400 mx-auto mb-4">
                  <IoPeople size={24} />
                </div>
                <h3 className="text-white font-semibold mb-2">Connect</h3>
                <p className="text-gray-400 text-sm">Share with a global community that thrives on sound.</p>
              </motion.div>

              <motion.div className="feature-card p-6 text-center" whileHover={{ y: -4 }}>
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center text-primary-400 mx-auto mb-4">
                  <IoSparkles size={24} />
                </div>
                <h3 className="text-white font-semibold mb-2">Discover</h3>
                <p className="text-gray-400 text-sm">Find music that speaks to who you are.</p>
              </motion.div>
            </div>

            <div>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                Born from the hearts of music lovers, not trained producers. Songram was built for those who feel music deeply but never had the tools to create it. 
                For those stuck in the loop of the same playlists, convinced they've already found the best songs life has to offer — this is your invitation to discover more.
              </p>

              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                <span className="text-primary-400 font-medium">Here, you don't need to be a musician. You just need to be someone who loves music.</span> 
                {' '}Collaborate, explore, and share with a global community that thrives on sound. Every beat, every lyric, every playlist is a reflection of you and a bridge to someone else.
              </p>

              <p className="text-xl text-gray-300 leading-relaxed">
                <span className="text-primary-400 font-medium">Songram isn't just a platform. It's a movement.</span> 
                {' '}A living, breathing space where creativity, connection, and music collide.
              </p>
            </div>

            <motion.div className="text-center py-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <p className="text-2xl md:text-3xl font-bold text-white mb-8">
                This is the future of social music.<br />
                <span className="text-gradient">And it's built for everyone.</span>
              </p>
              <Link to="/team" className="btn-primary px-8 py-4 text-lg">
                Meet the Team
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/icon.png" alt="Songram" className="w-8 h-8 rounded-lg" />
                <span className="text-xl font-bold text-gradient">Songram</span>
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
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/about" className="text-primary-400">About</Link></li>
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
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setShowSignupModal(false); setShowThankYou(false); setEmailError(null); }}>
            <motion.div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 w-full max-w-md relative"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}>
              <button onClick={() => { setShowSignupModal(false); setShowThankYou(false); setEmailError(null); }}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
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
                  
                  <form action="https://app.us18.list-manage.com/subscribe/post?u=6672acc5c2e3d9aa757c7ab19&id=83ae707f97&f_id=004ea5e6f0"
                    method="post" onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <input type="email" name="EMAIL" placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                        required />
                      {emailError && <p className="text-red-400 text-sm mt-2">{emailError}</p>}
                    </div>
                    <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                      <input type="text" name="b_6672acc5c2e3d9aa757c7ab19_83ae707f97" tabIndex={-1} defaultValue="" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full btn-primary disabled:opacity-50">
                      {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutPage;
