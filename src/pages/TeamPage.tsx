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
  IoBriefcase,
  IoSchool,
  IoMail,
  IoPeople
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
      role: "Founder & CEO",
      location: "British Columbia, Canada",
      bio: "GIS Analyst and Data Specialist leading Songram's strategic vision. With 8+ years of experience in spatial data analysis, database management, and automation, Edirin brings deep expertise in data-driven decision making.",
      experience: [
        "Leading Songram's strategic direction and product vision",
        "Engineering Technician II (GIS Analyst) at Metro Vancouver",
        "Expert in spatial data analysis, ETL workflows, and database management",
        "Proficient in ArcGIS Pro, Python, SQL, and enterprise geodatabase management"
      ],
      education: "BSc Applied Computer Science & Geography, University of Winnipeg",
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
      bio: "Systems software engineer and CTO of Songram, leading platform architecture and engineering. Currently at CrowdStrike, architecting enterprise CI/CD infrastructure for global cybersecurity operations.",
      experience: [
        "Leading Songram's technical architecture and platform development",
        "Full-Stack Development — building Songram's AI-powered platform",
        "Systems Software Engineer at CrowdStrike",
        "Platform Engineering Lead with expertise in Jenkins, Kubernetes, and 99.9% uptime systems"
      ],
      education: "BA Psychology, University of Winnipeg — unique perspective on user behavior",
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
                  className={`transition-colors ${link.path === '/team' ? 'text-primary-400' : 'text-gray-300 hover:text-white'}`}>
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
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 text-primary-400 mb-6">
              <IoPeople size={20} />
              <span className="text-sm font-medium">The Founders</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Meet the <span className="text-gradient">Team</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The visionaries and technical experts behind Songram's AI-powered music creation platform.
            </p>
          </motion.div>

          {/* Team Members */}
          <div className="space-y-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="pb-16 border-b border-white/10 last:border-b-0 last:pb-0"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8`}>
                  {/* Avatar */}
                  <div className="flex-shrink-0 mx-auto lg:mx-0">
                    <div className="relative">
                      <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-primary-500/30">
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary-500/50 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{member.name}</h2>
                    <p className="text-lg text-primary-400 font-semibold mb-2">{member.role}</p>
                    <div className="flex items-center justify-center lg:justify-start text-gray-400 mb-4">
                      <IoLocation size={16} className="mr-2" />
                      <span>{member.location}</span>
                    </div>

                    <p className="text-gray-300 mb-6">{member.bio}</p>

                    {/* Experience */}
                    <div className="mb-6">
                      <h3 className="text-white font-semibold mb-3 flex items-center justify-center lg:justify-start gap-2">
                        <IoBriefcase size={18} className="text-primary-400" />
                        Key Experience
                      </h3>
                      <ul className="space-y-2">
                        {member.experience.map((exp, i) => (
                          <li key={i} className="flex items-start justify-center lg:justify-start gap-3 text-gray-400 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Education */}
                    <div className="mb-6">
                      <h3 className="text-white font-semibold mb-2 flex items-center justify-center lg:justify-start gap-2">
                        <IoSchool size={18} className="text-primary-400" />
                        Education
                      </h3>
                      <p className="text-gray-400 text-sm">{member.education}</p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
                          className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all">
                          <IoLogoLinkedin size={20} />
                        </a>
                      )}
                      {member.social.github && (
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer"
                          className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                          <IoLogoGithub size={20} />
                        </a>
                      )}
                      <a href={`mailto:${member.social.email}`}
                        className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-primary-400 hover:bg-white/10 transition-all">
                        <IoMail size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div className="mt-20 text-center py-12"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Join the Music Revolution?</h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Connect with our team and be part of the future of music creation.
            </p>
            <button onClick={() => setShowSignupModal(true)} className="btn-primary px-8 py-4 text-lg">
              Get Early Access
            </button>
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
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/team" className="text-primary-400">Team</Link></li>
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

export default TeamPage;
