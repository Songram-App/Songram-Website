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
  IoInfinite,
  IoMusicalNotes,
  IoShareSocial,
  IoPeople,
  IoOptions,
  IoSparkles,
  IoCloudUpload,
  IoTrendingUp
} from 'react-icons/io5';
import validator from 'validator';
import XLogo from '../components/XLogo';

const PricingPage: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('premium');

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

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        { text: '25 AI music generations per month', icon: <IoMusicalNotes size={16} className="text-primary-500" /> },
        { text: 'Basic social features', icon: <IoShareSocial size={16} className="text-primary-500" /> },
        { text: '3 collaboration projects', icon: <IoPeople size={16} className="text-primary-500" /> },
        { text: 'Standard audio quality', icon: <IoOptions size={16} className="text-primary-500" /> },
        { text: '5 public playlists', icon: <IoTrendingUp size={16} className="text-primary-500" /> },
      ],
      buttonText: 'Get Started Free',
      popular: false,
      buttonClass: 'btn-secondary'
    },
    {
      name: 'Premium',
      price: '$10',
      period: 'per month',
      description: 'Unlimited creativity for serious creators',
      features: [
        { text: 'Unlimited AI music generations', icon: <IoInfinite size={16} className="text-primary-500" /> },
        { text: 'Advanced social features', icon: <IoShareSocial size={16} className="text-primary-500" /> },
        { text: 'Unlimited collaboration projects', icon: <IoPeople size={16} className="text-primary-500" /> },
        { text: 'High-quality audio (320kbps)', icon: <IoOptions size={16} className="text-primary-500" /> },
        { text: 'Unlimited playlists', icon: <IoTrendingUp size={16} className="text-primary-500" /> },
        { text: 'Advanced production tools', icon: <IoSparkles size={16} className="text-primary-500" /> },
        { text: 'Priority AI processing', icon: <IoSparkles size={16} className="text-primary-500" /> },
        { text: 'Commercial use license', icon: <IoCloudUpload size={16} className="text-primary-500" /> },
      ],
      buttonText: 'Start Premium',
      popular: true,
      buttonClass: 'btn-primary'
    }
  ];

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
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="/icon.png" 
                alt="Songram Logo" 
                className="w-8 h-8 rounded-lg"
              />
              <Link to="/" className="text-2xl font-bold text-gradient">Songram</Link>
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
              <Link to="/pricing" className="text-primary-500 dark:text-primary-400 font-medium">
                Pricing
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <IoSunny size={20} /> : <IoMoon size={20} />}
              </button>
              <button
                onClick={() => setShowSignupModal(true)}
                className="btn-primary"
              >
                Get Started
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
              <Link to="/pricing" className="block text-primary-500 dark:text-primary-400 font-medium">
                Pricing
              </Link>
              <Link to="/privacy" className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Privacy
              </Link>
              <Link to="/terms" className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                Terms & Conditions
              </Link>
              <button
                onClick={() => { setShowSignupModal(true); setIsMobileMenuOpen(false); }}
                className="w-full btn-primary"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main 
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        style={{ 
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, #0a0a0f, #1a1a2e, #16213e)' 
            : 'linear-gradient(135deg, #f8fafc, #e2e8f0, #cbd5e1)'
        }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Choose Your <span className="text-gradient">Creative Journey</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Start for free or unlock unlimited creativity with Premium.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {plan.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`glass-card p-5 rounded-xl h-full flex flex-col ${
                  plan.popular 
                    ? 'border-2 border-primary-500/20 shadow-xl shadow-primary-500/10' 
                    : 'border border-gray-200 dark:border-gray-700'
                }`}>
                  {/* Plan Header */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-2xl font-bold text-gradient">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-gray-600 dark:text-gray-400 ml-1 text-xs">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-xs">
                      {plan.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 mb-4 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-2">
                        <div className="flex-shrink-0 mt-0.5">
                          {feature.icon}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-xs">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      setSelectedPlan(plan.name.toLowerCase() as 'free' | 'premium');
                      setShowSignupModal(true);
                    }}
                    className={`w-full ${plan.buttonClass} py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 mt-auto`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}
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
            
            {/* Social Media Links */}
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
              <Link to="/terms" className="hover:text-primary-500 transition-colors duration-200">Terms & Conditions</Link>
              <a href="mailto:team@songram.app?subject=Support Request" className="hover:text-primary-500 transition-colors duration-200">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 Songram Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            className="bg-light-bg dark:bg-gray-900 rounded-2xl shadow-xl max-w-md w-full p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">
                Join Songram {selectedPlan === 'premium' ? 'Premium' : ''}
              </h3>
              <button
                onClick={() => setShowSignupModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <IoClose size={20} />
              </button>
            </div>

            {showThankYou ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-2">You're all set!</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  We'll notify you when Songram launches and your {selectedPlan} plan will be ready.
                </p>
              </div>
            ) : (
              <>
                {selectedPlan === 'premium' && (
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2 text-primary-700 dark:text-primary-300">
                      <IoSparkles size={20} />
                      <span className="font-medium">Premium Plan Selected</span>
                    </div>
                    <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">
                      $10/month • Unlimited AI generations • All premium features
                    </p>
                  </div>
                )}
                
                <form
                  action="https://app.us18.list-manage.com/subscribe/post?u=6672acc5c2e3d9aa757c7ab19&id=83ae707f97&f_id=004ea5e6f0"
                  method="post"
                  onSubmit={handleFormSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="EMAIL"
                      id="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your email"
                    />
                    {emailError && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{emailError}</p>
                    )}
                  </div>

                  {/* Honeypot field for spam prevention */}
                  <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                    <input type="text" name="b_6672acc5c2e3d9aa757c7ab19_83ae707f97" tabIndex={-1} defaultValue="" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Joining...' : `Get Early Access - ${selectedPlan === 'premium' ? 'Premium' : 'Free'}`}
                  </button>

                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    By signing up, you agree to our Terms and Privacy Policy.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;