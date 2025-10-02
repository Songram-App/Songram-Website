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
  IoShieldCheckmarkOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoCloudOutline
} from 'react-icons/io5';
import XLogo from '../components/XLogo';

const PrivacyPage: React.FC = () => {
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
              <Link to="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Pricing
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
              <Link to="/privacy" className="block text-primary-500 dark:text-primary-400 font-medium">
                Privacy
              </Link>
              <Link to="/terms" className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Terms & Conditions
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
              <IoShieldCheckmarkOutline size={48} className="text-primary-500 mr-4" />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Last updated: June 13, 2025
            </p>
          </motion.div>

          {/* Privacy Sections */}
          <div className="space-y-12">
            {/* Information We Collect */}
            <motion.section
              className="card p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <IoEyeOutline size={24} className="text-primary-500 mr-3" />
                <h2 className="text-2xl font-bold">Information We Collect</h2>
              </div>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Personal Information</h3>
                  <p>When you create an account, we collect information such as your name, email address, and profile information to provide you with our services.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Music and Creative Content</h3>
                  <p>We collect and process the music you create, upload, or interact with on our platform. This includes audio files, lyrics, metadata, and your creative preferences to improve our AI recommendations.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Usage Data</h3>
                  <p>We collect information about how you use Songram, including features accessed, time spent, and interaction patterns to enhance your experience and improve our services.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Device Information</h3>
                  <p>We may collect device information such as IP address, browser type, operating system, and device identifiers for security and optimization purposes.</p>
                </div>
              </div>
            </motion.section>

            {/* How We Use Your Information */}
            <motion.section
              className="card p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <IoCloudOutline size={24} className="text-primary-500 mr-3" />
                <h2 className="text-2xl font-bold">How We Use Your Information</h2>
              </div>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span><strong>Service Provision:</strong> To provide, maintain, and improve Songram's AI-powered music creation platform</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span><strong>AI Training:</strong> To train and improve our AI models for music generation, recommendations, and personalization</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span><strong>Communication:</strong> To send you updates, notifications, and support communications</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span><strong>Security:</strong> To protect against fraud, abuse, and security threats</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span><strong>Analytics:</strong> To understand usage patterns and improve our services</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Information Sharing */}
            <motion.section
              className="card p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <IoLockClosedOutline size={24} className="text-primary-500 mr-3" />
                <h2 className="text-2xl font-bold">Information Sharing and Disclosure</h2>
              </div>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p className="mb-4">We do not sell your personal information. We may share your information in the following circumstances:</p>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span><strong>With Your Consent:</strong> When you explicitly agree to share information</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span><strong>Service Providers:</strong> With trusted third-party services that help us operate our platform</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span><strong>Public Content:</strong> Music and content you choose to make public on the platform</span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Data Security */}
            <motion.section
              className="card p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">Data Security</h2>
              <div className="text-gray-600 dark:text-gray-300 space-y-4">
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                <p>Your music files and personal data are encrypted in transit and at rest. We regularly review and update our security practices to ensure the highest level of protection.</p>
              </div>
            </motion.section>

            {/* Your Rights */}
            <motion.section
              className="card p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">Your Rights</h2>
              <div className="text-gray-600 dark:text-gray-300 space-y-4">
                <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Access and review your personal information</li>
                  <li>• Correct inaccurate or incomplete information</li>
                  <li>• Delete your personal information</li>
                  <li>• Object to or restrict processing</li>
                  <li>• Data portability</li>
                  <li>• Withdraw consent</li>
                </ul>
                <p>To exercise these rights, please contact us at <a href="mailto:team@songram.app" className="text-primary-500 hover:text-primary-600">team@songram.app</a>.</p>
              </div>
            </motion.section>

            {/* AI and Music Processing */}
            <motion.section
              className="card p-8 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-800"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">AI and Music Processing</h2>
              <div className="text-gray-600 dark:text-gray-300 space-y-4">
                <p>Songram uses artificial intelligence to enhance your music creation experience. This includes:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Analyzing your music preferences to provide personalized recommendations</li>
                  <li>• Processing audio data to generate AI-assisted compositions</li>
                  <li>• Using anonymized and aggregated data to improve our AI models</li>
                  <li>• Ensuring your original creations remain your intellectual property</li>
                </ul>
                <p>We are committed to responsible AI development and ensuring your creative rights are protected.</p>
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
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <div className="text-gray-600 dark:text-gray-300 space-y-4">
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> <a href="mailto:team@songram.app" className="text-primary-500 hover:text-primary-600">team@songram.app</a></p>
                  <p><strong>General Contact:</strong> <a href="mailto:team@songram.app" className="text-primary-500 hover:text-primary-600">team@songram.app</a></p>
                  <p><strong>Address:</strong> Winnipeg, Manitoba, Canada</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                  We will update this Privacy Policy as needed to reflect changes in our practices or applicable laws. Please review this policy periodically for any updates.
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
              <Link to="/privacy" className="text-primary-500 font-medium">Privacy</Link>
              <Link to="/terms" className="hover:text-primary-500 transition-colors duration-200">Terms & Conditions</Link>
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

export default PrivacyPage;
