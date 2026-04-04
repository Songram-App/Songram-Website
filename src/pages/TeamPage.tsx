import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  IoClose, 
  IoMenu,
  IoLogoInstagram,
  IoLogoTiktok,
  IoLogoLinkedin,
  IoLogoGithub,
  IoLocation,
  IoMail
} from 'react-icons/io5';
import validator from 'validator';
import XLogo from '../components/XLogo';
import EdirinAvatar from '../assets/images/Edirin_avatar.jpg';
import SebastianAvatar from '../assets/images/sebastian_avatar.jpg';

const TeamPage: React.FC = () => {
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

  const teamMembers = [
    {
      name: "Edirin Okpikpi",
      role: "Co-Founder & CEO",
      location: "British Columbia, Canada",
      bio: "GIS Analyst and Data Specialist leading Songram's strategic vision. 8+ years of experience in spatial data analysis, database management, and automation.",
      social: {
        linkedin: "https://www.linkedin.com/in/edirin-okpikpi-asct-558286140/",
        github: "https://github.com/Eddy3133",
        email: "edirinokpikpi@gmail.com"
      },
      avatar: EdirinAvatar
    },
    {
      name: "Sebastian Akpevwen Gbudje",
      role: "Co-Founder & CTO",
      location: "Alberta, Canada",
      bio: "Senior Software Engineer at Optro with a focus on Developer Experience (DX) and CI infrastructure. Leading Songram's technical architecture and platform development.",
      social: {
        linkedin: "https://www.linkedin.com/in/akpevwen-sebastian-gbudje",
        github: "https://github.com/gbudjeakp",
        email: "gbudjeakp@gmail.com"
      },
      avatar: SebastianAvatar
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
            <motion.div className="flex items-center space-x-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Link to="/" className="flex items-center space-x-2">
                <img src="/icon.png" alt="Songram" className="w-8 h-8 rounded-xl" />
                <span className="text-xl font-bold text-gradient glow-text font-satoshi">Songram</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} 
                  className={`text-sm transition-colors ${link.path === '/team' ? 'text-primary-400' : 'text-gray-300 hover:text-white'}`}>
                  {link.label}
                </Link>
              ))}
              <button onClick={() => setShowSignupModal(true)} className="btn-primary">Get Started</button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-xl bg-white/5 text-gray-300">
                {isMobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10"
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 ${link.path === '/team' ? 'text-primary-400' : 'text-gray-300'}`}>
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
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Meet the <span className="text-gradient">Team</span>
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto">
              The people building Songram's AI-powered music platform.
            </p>
          </motion.div>

          {/* Team Members */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 sm:p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden mx-auto mb-4 border border-white/10">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
                
                <h2 className="text-base sm:text-lg font-semibold text-white mb-1">{member.name}</h2>
                <p className="text-primary-400 text-sm mb-2">{member.role}</p>
                <div className="flex items-center justify-center text-gray-500 text-xs sm:text-sm mb-4">
                  <IoLocation size={14} className="mr-1" />
                  <span>{member.location}</span>
                </div>

                <p className="text-gray-400 text-sm mb-5">{member.bio}</p>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-2">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all">
                      <IoLogoLinkedin size={18} />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                      <IoLogoGithub size={18} />
                    </a>
                  )}
                  <a href={`mailto:${member.social.email}`}
                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-primary-400 hover:bg-white/10 transition-all">
                    <IoMail size={18} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/icon.png" alt="Songram" className="w-8 h-8 rounded-xl" />
                <span className="text-lg font-bold text-gradient font-satoshi">Songram</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md text-sm">
                The AI-powered music creation platform where creativity meets technology.
              </p>
              <div className="flex space-x-3">
                <a href="https://instagram.com/songramapp" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-pink-400 transition-all">
                  <IoLogoInstagram size={18} />
                </a>
                <a href="https://tiktok.com/@songramapp" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-all">
                  <IoLogoTiktok size={18} />
                </a>
                <a href="https://x.com/songramapp" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-all">
                  <XLogo size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About</Link></li>
                <li><Link to="/team" className="text-primary-400 text-sm">Team</Link></li>
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

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Songram. All rights reserved.</p>
            <p className="text-gray-500 text-sm mt-4 md:mt-0">Made with passion for music creators</p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setShowSignupModal(false); setShowThankYou(false); setEmailError(null); }}>
            <motion.div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md relative"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}>
              <button onClick={() => { setShowSignupModal(false); setShowThankYou(false); setEmailError(null); }}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
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
                  
                  <form action="https://app.us18.list-manage.com/subscribe/post?u=6672acc5c2e3d9aa757c7ab19&id=83ae707f97&f_id=004ea5e6f0"
                    method="post" onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <input type="email" name="EMAIL" placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                        required />
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
    </div>
  );
};

export default TeamPage;
