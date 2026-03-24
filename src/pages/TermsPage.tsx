import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  IoClose, 
  IoMenu,
  IoLogoInstagram,
  IoLogoTiktok,
  IoDocumentText,
  IoCheckmarkCircle,
  IoWarning,
  IoMusicalNotes,
  IoSparkles,
  IoMail,
  IoBan,
  IoShieldCheckmark
} from 'react-icons/io5';
import XLogo from '../components/XLogo';

const TermsPage: React.FC = () => {
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
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 text-primary-400 mb-6">
              <IoDocumentText size={20} />
              <span className="text-sm font-medium">Legal Agreement</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              These terms govern your use of Songram's AI-powered music creation platform.
            </p>
            <p className="text-gray-500 text-sm mt-4">Last updated: March 20, 2026</p>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Acceptance of Terms */}
            <motion.section
              className="legal-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="legal-heading">
                <IoCheckmarkCircle className="text-primary-400" size={24} />
                Acceptance of Terms
              </h2>
              
              <div className="legal-text space-y-4">
                <p>By accessing or using Songram, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our service.</p>
                <p>These terms apply to all users of Songram, including musicians, creators, and any other individuals or entities accessing our platform.</p>
              </div>
            </motion.section>

            {/* Description of Service */}
            <motion.section
              className="legal-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="legal-heading">
                <IoMusicalNotes className="text-primary-400" size={24} />
                Description of Service
              </h2>
              
              <p className="legal-text mb-4">Songram is an AI-powered music creation platform that enables users to:</p>
              
              <ul className="legal-list mb-4">
                <li><div className="legal-bullet"></div><span>Create, edit, and produce original music using AI assistance</span></li>
                <li><div className="legal-bullet"></div><span>Share and collaborate on musical projects</span></li>
                <li><div className="legal-bullet"></div><span>Access AI-generated musical elements and compositions</span></li>
                <li><div className="legal-bullet"></div><span>Connect with other musicians and creators</span></li>
                <li><div className="legal-bullet"></div><span>Discover and interact with music content</span></li>
              </ul>
              
              <p className="legal-text">Our services are provided "as is" and we reserve the right to modify, suspend, or discontinue any part of our service at any time.</p>
            </motion.section>

            {/* User Accounts */}
            <motion.section
              className="legal-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="legal-heading">User Accounts and Responsibilities</h2>
              
              <div className="space-y-6 legal-text">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Account Creation</h3>
                  <p>You must provide accurate and complete information when creating your account. You are responsible for maintaining the security of your account credentials.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Age Requirements</h3>
                  <p>You must be at least 13 years old to use Songram. Users under 18 require parental or guardian consent.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Account Responsibilities</h3>
                  <ul className="legal-list">
                    <li><div className="legal-bullet"></div><span>Keep your login information secure</span></li>
                    <li><div className="legal-bullet"></div><span>Notify us immediately of any unauthorized use</span></li>
                    <li><div className="legal-bullet"></div><span>Use the service in compliance with all applicable laws</span></li>
                    <li><div className="legal-bullet"></div><span>Respect other users and their content</span></li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Intellectual Property */}
            <motion.section
              className="legal-section relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent pointer-events-none"></div>
              <div className="relative">
                <h2 className="legal-heading">
                  <IoShieldCheckmark className="text-primary-400" size={24} />
                  Intellectual Property and Content Rights
                </h2>
                
                <div className="space-y-6 legal-text">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Your Content</h3>
                    <p>You retain ownership of the original music and content you create. By using Songram, you grant us a limited license to host, display, and process your content to provide our services.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">AI-Generated Content</h3>
                    <p>Content generated using our AI tools may be subject to specific licensing terms. You have rights to use AI-assisted creations, but we retain rights to improve our AI models using anonymized data.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Platform Content</h3>
                    <p>All platform features, software, and underlying technology remain the property of Songram. You may not copy, modify, or reverse engineer our services.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Copyright Protection</h3>
                    <p>We respect intellectual property rights. If you believe your copyright has been infringed, please contact us at{' '}
                      <a href="mailto:team@songram.app" className="text-primary-400 hover:text-primary-300">team@songram.app</a>.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Prohibited Uses */}
            <motion.section
              className="legal-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="legal-heading">
                <IoBan className="text-red-400" size={24} />
                Prohibited Uses
              </h2>
              
              <p className="legal-text mb-4">You agree not to use Songram for any of the following prohibited activities:</p>
              
              <ul className="legal-list mb-4">
                <li><div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div><span>Upload or create content that infringes on others' intellectual property</span></li>
                <li><div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div><span>Generate or share harmful, abusive, or illegal content</span></li>
                <li><div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div><span>Attempt to reverse engineer or hack our AI systems</span></li>
                <li><div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div><span>Use our service to spam or harass other users</span></li>
                <li><div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div><span>Violate any applicable laws or regulations</span></li>
                <li><div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div><span>Impersonate others or provide false information</span></li>
                <li><div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div><span>Interfere with the normal operation of our platform</span></li>
                <li><div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div><span>Use automated systems to access our service without permission</span></li>
              </ul>
              
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 font-medium">⚠️ Violation of these terms may result in account suspension or termination.</p>
              </div>
            </motion.section>

            {/* AI and Music Generation */}
            <motion.section
              className="legal-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="legal-heading">
                <IoSparkles className="text-primary-400" size={24} />
                AI and Music Generation Terms
              </h2>
              
              <div className="space-y-6 legal-text">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI Assistance</h3>
                  <p>Our AI tools are designed to assist and enhance your creativity, not replace it. The quality and accuracy of AI-generated content may vary.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Training Data</h3>
                  <p>Our AI models are trained on diverse musical datasets. We strive to ensure our training data respects copyright and licensing requirements.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Content Responsibility</h3>
                  <p>You are responsible for reviewing AI-generated content before using or sharing it. Ensure all final creations comply with applicable laws and respect others' rights.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Commercial Use</h3>
                  <p>Commercial use of AI-generated content may be subject to additional licensing terms. Please review our licensing guidelines for commercial applications.</p>
                </div>
              </div>
            </motion.section>

            {/* Disclaimers */}
            <motion.section
              className="legal-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="legal-heading">
                <IoWarning className="text-yellow-400" size={24} />
                Disclaimers and Limitations
              </h2>
              
              <div className="space-y-6 legal-text">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Service Availability</h3>
                  <p>We strive to maintain high service availability but cannot guarantee uninterrupted access. We may perform maintenance or updates that temporarily affect service.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Limitation of Liability</h3>
                  <p>Songram is not liable for any indirect, incidental, or consequential damages arising from your use of our service. Our total liability is limited to the amount you paid for our services.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Third-Party Services</h3>
                  <p>Our platform may integrate with third-party services. We are not responsible for the performance, availability, or content of third-party services.</p>
                </div>
              </div>
            </motion.section>

            {/* Termination */}
            <motion.section
              className="legal-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="legal-heading">Termination</h2>
              
              <p className="legal-text mb-4">Either party may terminate these terms at any time:</p>
              
              <ul className="legal-list mb-4">
                <li><div className="legal-bullet"></div><span>You may delete your account and stop using our service</span></li>
                <li><div className="legal-bullet"></div><span>We may suspend or terminate accounts that violate these terms</span></li>
                <li><div className="legal-bullet"></div><span>We may discontinue our service with reasonable notice</span></li>
              </ul>
              
              <p className="legal-text">Upon termination, your access to our service will cease, but these terms will continue to apply to any past use of our service.</p>
            </motion.section>

            {/* Contact */}
            <motion.section
              className="legal-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="legal-heading">
                <IoMail className="text-primary-400" size={24} />
                Contact Information
              </h2>
              
              <div className="legal-text space-y-4">
                <p>If you have questions about these Terms of Service, please contact us:</p>
                
                <div className="bg-white/5 rounded-xl p-4 space-y-2">
                  <p><strong className="text-white">Legal:</strong>{' '}
                    <a href="mailto:team@songram.app" className="text-primary-400 hover:text-primary-300">team@songram.app</a>
                  </p>
                  <p><strong className="text-white">General:</strong>{' '}
                    <a href="mailto:team@songram.app" className="text-primary-400 hover:text-primary-300">team@songram.app</a>
                  </p>
                </div>
                
                <p className="text-gray-500 text-sm mt-6">
                  These terms may be updated periodically. Continued use of our service after changes constitutes acceptance of the updated terms.
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
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-primary-400">Terms of Service</Link></li>
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

export default TermsPage;
