import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  IoClose, 
  IoMenu, 
  IoSunny, 
  IoMoon,
  IoLogoInstagram,
  IoLogoTiktok,
  IoDocumentTextOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
  IoMusicalNotesOutline
} from 'react-icons/io5';
import XLogo from '../components/XLogo';

const TermsPage: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-light-bg/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img 
                src="/icon.png" 
                alt="Songram Logo" 
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-xl font-bold text-gradient">Songram</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Home
              </Link>
              <a href="/#features" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Features
              </a>
              <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                About
              </Link>
              <Link to="/team" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Team
              </Link>
              <Link to="/community" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Community
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <IoSunny size={20} /> : <IoMoon size={20} />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <IoSunny size={20} /> : <IoMoon size={20} />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-light-bg dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="px-4 py-6 space-y-4">
              <Link to="/" className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Home
              </Link>
              <a href="/#features" className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Features
              </a>
              <Link to="/about" className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                About
              </Link>
              <Link to="/team" className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Team
              </Link>
              <Link to="/community" className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Community
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-6">
              <IoDocumentTextOutline size={48} className="text-primary-500 mr-4" />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These terms govern your use of Songram's AI-powered music creation platform.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Last updated: June 13, 2025
            </p>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-12">
            {/* Acceptance of Terms */}
            <motion.section
              className="card p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <IoCheckmarkCircleOutline size={24} className="text-primary-500 mr-3" />
                <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
              </div>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>By accessing or using Songram, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our service.</p>
                <p>These terms apply to all users of Songram, including musicians, creators, and any other individuals or entities accessing our platform.</p>
              </div>
            </motion.section>

            {/* Description of Service */}
            <motion.section
              className="card p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <IoMusicalNotesOutline size={24} className="text-primary-500 mr-3" />
                <h2 className="text-2xl font-bold">Description of Service</h2>
              </div>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>Songram is an AI-powered music creation platform that enables users to:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Create, edit, and produce original music using AI assistance</li>
                  <li>• Share and collaborate on musical projects</li>
                  <li>• Access AI-generated musical elements and compositions</li>
                  <li>• Connect with other musicians and creators</li>
                  <li>• Discover and interact with music content</li>
                </ul>
                <p>Our services are provided "as is" and we reserve the right to modify, suspend, or discontinue any part of our service at any time.</p>
              </div>
            </motion.section>

            {/* User Accounts */}
            <motion.section
              className="card p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">User Accounts and Responsibilities</h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Account Creation</h3>
                  <p>You must provide accurate and complete information when creating your account. You are responsible for maintaining the security of your account credentials.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Age Requirements</h3>
                  <p>You must be at least 13 years old to use Songram. Users under 18 require parental or guardian consent.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Account Responsibilities</h3>
                  <ul className="space-y-2 ml-4">
                    <li>• Keep your login information secure</li>
                    <li>• Notify us immediately of any unauthorized use</li>
                    <li>• Use the service in compliance with all applicable laws</li>
                    <li>• Respect other users and their content</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Intellectual Property */}
            <motion.section
              className="card p-8 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-800"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">Intellectual Property and Content Rights</h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your Content</h3>
                  <p>You retain ownership of the original music and content you create. By using Songram, you grant us a limited license to host, display, and process your content to provide our services.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Generated Content</h3>
                  <p>Content generated using our AI tools may be subject to specific licensing terms. You have rights to use AI-assisted creations, but we retain rights to improve our AI models using anonymized data.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Platform Content</h3>
                  <p>All platform features, software, and underlying technology remain the property of Songram. You may not copy, modify, or reverse engineer our services.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Copyright Protection</h3>
                  <p>We respect intellectual property rights. If you believe your copyright has been infringed, please contact us at <a href="mailto:team@songram.app" className="text-primary-500 hover:text-primary-600">team@songram.app</a>.</p>
                </div>
              </div>
            </motion.section>

            {/* Prohibited Uses */}
            <motion.section
              className="card p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <IoWarningOutline size={24} className="text-red-500 mr-3" />
                <h2 className="text-2xl font-bold">Prohibited Uses</h2>
              </div>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>You agree not to use Songram for any of the following prohibited activities:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Upload or create content that infringes on others' intellectual property</li>
                  <li>• Generate or share harmful, abusive, or illegal content</li>
                  <li>• Attempt to reverse engineer or hack our AI systems</li>
                  <li>• Use our service to spam or harass other users</li>
                  <li>• Violate any applicable laws or regulations</li>
                  <li>• Impersonate others or provide false information</li>
                  <li>• Interfere with the normal operation of our platform</li>
                  <li>• Use automated systems to access our service without permission</li>
                </ul>
                <p className="text-red-600 dark:text-red-400 font-medium">Violation of these terms may result in account suspension or termination.</p>
              </div>
            </motion.section>

            {/* AI and Music Generation */}
            <motion.section
              className="card p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">AI and Music Generation Terms</h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Assistance</h3>
                  <p>Our AI tools are designed to assist and enhance your creativity, not replace it. The quality and accuracy of AI-generated content may vary.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Training Data</h3>
                  <p>Our AI models are trained on diverse musical datasets. We strive to ensure our training data respects copyright and licensing requirements.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Content Responsibility</h3>
                  <p>You are responsible for reviewing AI-generated content before using or sharing it. Ensure all final creations comply with applicable laws and respect others' rights.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Commercial Use</h3>
                  <p>Commercial use of AI-generated content may be subject to additional licensing terms. Please review our licensing guidelines for commercial applications.</p>
                </div>
              </div>
            </motion.section>

            {/* Disclaimers */}
            <motion.section
              className="card p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">Disclaimers and Limitations</h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Service Availability</h3>
                  <p>We strive to maintain high service availability but cannot guarantee uninterrupted access. We may perform maintenance or updates that temporarily affect service.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Limitation of Liability</h3>
                  <p>Songram is not liable for any indirect, incidental, or consequential damages arising from your use of our service. Our total liability is limited to the amount you paid for our services.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Third-Party Services</h3>
                  <p>Our platform may integrate with third-party services. We are not responsible for the performance, availability, or content of third-party services.</p>
                </div>
              </div>
            </motion.section>

            {/* Termination */}
            <motion.section
              className="card p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">Termination</h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>Either party may terminate these terms at any time:</p>
                <ul className="space-y-2 ml-4">
                  <li>• You may delete your account and stop using our service</li>
                  <li>• We may suspend or terminate accounts that violate these terms</li>
                  <li>• We may discontinue our service with reasonable notice</li>
                </ul>
                <p>Upon termination, your access to our service will cease, but these terms will continue to apply to any past use of our service.</p>
              </div>
            </motion.section>

            {/* Contact Information */}
            <motion.section
              className="card p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>If you have questions about these Terms of Service, please contact us:</p>
                <div className="space-y-2">
                  <p><strong>Legal:</strong> <a href="mailto:team@songram.app" className="text-primary-500 hover:text-primary-600">team@songram.app</a></p>
                  <p><strong>General:</strong> <a href="mailto:team@songram.app" className="text-primary-500 hover:text-primary-600">team@songram.app</a></p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                  These terms may be updated periodically. Continued use of our service after changes constitutes acceptance of the updated terms.
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <img 
                src="/icon.png" 
                alt="Songram Logo" 
                className="w-8 h-8 rounded-lg"
              />
              </div>
              <span className="text-xl font-bold text-gradient">Songram</span>
            </div>
            
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <a
                href="https://instagram.com/songram.app" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group"
                aria-label="Follow us on Instagram"
              >
                <IoLogoInstagram size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              
              <a
                href="https://tiktok.com/@songram.app"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group"
                aria-label="Follow us on TikTok"
              >
                <IoLogoTiktok size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              
              <a 
                href="https://x.com/songram_app"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group"
                aria-label="Follow us on X (Twitter)"
              >
                <XLogo size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <Link to="/privacy" className="hover:text-primary-500 transition-colors duration-200">Privacy</Link>
              <Link to="/terms" className="text-primary-500 font-medium">Terms</Link>
              <a href="mailto:team@songram.app?subject=Support Request" className="hover:text-primary-500 transition-colors duration-200">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 Songram. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsPage;
