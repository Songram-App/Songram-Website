import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoClose, IoMenu, IoLogoInstagram, IoLogoTiktok } from 'react-icons/io5';
import XLogo from '../components/XLogo';

const PrivacyPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            >
              <Link to="/" className="flex items-center space-x-2">
                <img src="/icon.png" alt="Songram" className="w-8 h-8 rounded-lg" />
                <span className="text-2xl font-bold text-gradient glow-text font-satoshi">Songram</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="text-gray-300 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
              <Link to="/" className="btn-primary">Get Started</Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 text-gray-300"
            >
              {isMobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
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
                  <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-gray-300 hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-gray-500 text-sm uppercase tracking-widest mb-4">Legal</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              We're committed to protecting your privacy. Here's how we handle your data.
            </p>
            <p className="text-gray-600 text-sm mt-4">Last updated: March 20, 2026</p>
          </motion.div>

          {/* Privacy Sections */}
          <div className="space-y-8">

            <motion.section className="legal-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="legal-heading">Information We Collect</h2>
              <div className="space-y-6 legal-text">
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">Personal Information</h3>
                  <p>When you create an account, we collect your name, email address, and profile information to provide you with our services.</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">Music and Creative Content</h3>
                  <p>We collect and process the music you create, upload, or interact with on our platform, including audio files, lyrics, metadata, and creative preferences.</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">Usage Data</h3>
                  <p>We collect information about how you use Songram, including features accessed, time spent, and interaction patterns to enhance your experience.</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">Device Information</h3>
                  <p>We may collect device information such as IP address, browser type, operating system, and device identifiers for security and optimization.</p>
                </div>
              </div>
            </motion.section>

            <motion.section className="legal-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="legal-heading">How We Use Your Information</h2>
              <ul className="legal-list">
                <li><div className="legal-bullet"></div><span><strong className="text-white">Service Provision:</strong> To provide, maintain, and improve Songram's AI-powered music creation platform</span></li>
                <li><div className="legal-bullet"></div><span><strong className="text-white">AI Training:</strong> To train and improve our AI models for music generation, recommendations, and personalization</span></li>
                <li><div className="legal-bullet"></div><span><strong className="text-white">Communication:</strong> To send you updates, notifications, and support communications</span></li>
                <li><div className="legal-bullet"></div><span><strong className="text-white">Security:</strong> To protect against fraud, abuse, and security threats</span></li>
                <li><div className="legal-bullet"></div><span><strong className="text-white">Analytics:</strong> To understand usage patterns and improve our services</span></li>
                <li><div className="legal-bullet"></div><span><strong className="text-white">Legal Compliance:</strong> To comply with applicable laws and regulations</span></li>
              </ul>
            </motion.section>

            <motion.section className="legal-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="legal-heading">Information Sharing</h2>
              <p className="legal-text mb-4">We do not sell your personal information. We may share your information in these circumstances:</p>
              <ul className="legal-list">
                <li><div className="legal-bullet"></div><span><strong className="text-white">With Your Consent:</strong> When you explicitly agree to share information</span></li>
                <li><div className="legal-bullet"></div><span><strong className="text-white">Service Providers:</strong> With trusted third-party services that help us operate our platform</span></li>
                <li><div className="legal-bullet"></div><span><strong className="text-white">Legal Requirements:</strong> When required by law or to protect rights and safety</span></li>
                <li><div className="legal-bullet"></div><span><strong className="text-white">Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</span></li>
                <li><div className="legal-bullet"></div><span><strong className="text-white">Public Content:</strong> Music and content you choose to make public on the platform</span></li>
              </ul>
            </motion.section>

            <motion.section className="legal-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="legal-heading">Data Security</h2>
              <div className="legal-text space-y-4">
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                <p>Your music files and personal data are encrypted in transit and at rest. We regularly review and update our security practices to ensure the highest level of protection.</p>
              </div>
            </motion.section>

            <motion.section className="legal-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="legal-heading">Your Rights</h2>
              <p className="legal-text mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="legal-list mb-4">
                <li><div className="legal-bullet"></div><span>Access and review your personal information</span></li>
                <li><div className="legal-bullet"></div><span>Correct inaccurate or incomplete information</span></li>
                <li><div className="legal-bullet"></div><span>Delete your personal information</span></li>
                <li><div className="legal-bullet"></div><span>Object to or restrict processing</span></li>
                <li><div className="legal-bullet"></div><span>Data portability</span></li>
                <li><div className="legal-bullet"></div><span>Withdraw consent</span></li>
              </ul>
              <p className="legal-text">
                To exercise these rights, contact us at{' '}
                <a href="mailto:team@songram.app" className="text-primary-400 hover:text-primary-300 transition-colors">
                  team@songram.app
                </a>
              </p>
            </motion.section>

            <motion.section className="legal-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="legal-heading">AI and Music Processing</h2>
              <p className="legal-text mb-4">Songram uses artificial intelligence to enhance your music creation experience:</p>
              <ul className="legal-list">
                <li><div className="legal-bullet"></div><span>Analyzing your music preferences to provide personalized recommendations</span></li>
                <li><div className="legal-bullet"></div><span>Processing audio data to generate AI-assisted compositions</span></li>
                <li><div className="legal-bullet"></div><span>Using anonymized and aggregated data to improve our AI models</span></li>
                <li><div className="legal-bullet"></div><span>Ensuring your original creations remain your intellectual property</span></li>
              </ul>
              <p className="legal-text mt-4">We are committed to responsible AI development and ensuring your creative rights are protected.</p>
            </motion.section>

            <motion.section className="legal-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="legal-heading">Contact Us</h2>
              <div className="legal-text space-y-3">
                <p>If you have any questions about this Privacy Policy, please reach out:</p>
                <p>
                  <span className="text-gray-500">Email — </span>
                  <a href="mailto:team@songram.app" className="text-primary-400 hover:text-primary-300 transition-colors">team@songram.app</a>
                </p>
                <p><span className="text-gray-500">Location — </span>Vancouver, BC, Canada</p>
                <p className="text-gray-600 text-sm pt-4">
                  We will update this Privacy Policy as needed to reflect changes in our practices or applicable laws. Please review this policy periodically.
                </p>
              </div>
            </motion.section>

          </div>
        </div>
      </main>

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
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/team" className="text-gray-400 hover:text-white transition-colors">Team</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/privacy" className="text-primary-400">Privacy Policy</Link></li>
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
    </div>
  );
};

export default PrivacyPage;
