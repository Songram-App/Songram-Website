import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  IoClose, 
  IoMenu,
  IoLogoInstagram,
  IoLogoTiktok,
  IoInfinite,
  IoMusicalNotes,
  IoShareSocial,
  IoPeople,
  IoSparkles,
  IoCloudUpload,
  IoCheckmark,
  IoStar
} from 'react-icons/io5';
import validator from 'validator';
import XLogo from '../components/XLogo';

const PricingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'basic' | 'premium'>('premium');

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

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Start creating at no cost',
      features: [
        { text: 'Upload up to 10 songs', icon: <IoCloudUpload /> },
        { text: 'Basic audio editing', icon: <IoMusicalNotes /> },
        { text: 'Share to social media', icon: <IoShareSocial /> },
        { text: 'Community support', icon: <IoPeople /> },
        { text: 'Basic analytics', icon: <IoCheckmark /> },
      ],
      buttonText: 'Start Free',
      popular: false,
    },
    {
      name: 'Basic',
      price: '$10',
      period: 'per month',
      description: 'Perfect for getting started',
      features: [
        { text: 'Upload up to 50 songs', icon: <IoCloudUpload /> },
        { text: 'Basic audio editing', icon: <IoMusicalNotes /> },
        { text: 'Share to social media', icon: <IoShareSocial /> },
        { text: 'Community support', icon: <IoPeople /> },
        { text: 'Basic analytics', icon: <IoCheckmark /> },
      ],
      buttonText: 'Get Started',
      popular: false,
    },
    {
      name: 'Premium',
      price: '$20',
      period: 'per month',
      description: 'Unlimited creativity for serious creators',
      features: [
        { text: 'Unlimited uploads', icon: <IoInfinite /> },
        { text: 'Advanced audio tools', icon: <IoSparkles /> },
        { text: 'Collaboration features', icon: <IoPeople /> },
        { text: 'Priority support', icon: <IoCheckmark /> },
        { text: 'Advanced analytics', icon: <IoCheckmark /> },
        { text: 'Early access to features', icon: <IoSparkles /> },
      ],
      buttonText: 'Start Premium',
      popular: true,
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
                <span className="text-2xl font-bold text-gradient glow-text font-sans">Songram</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} 
                  className={`transition-colors ${link.path === '/pricing' ? 'text-primary-400' : 'text-gray-300 hover:text-white'}`}>
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
                    className={`block py-2 ${link.path === '/pricing' ? 'text-primary-400' : 'text-gray-300'}`}>
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
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 text-primary-400 mb-6">
              <IoStar size={20} />
              <span className="text-sm font-medium">Simple Pricing</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Choose Your <span className="text-gradient">Plan</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Select the plan that works best for you
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-4 z-10">
                    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded">
                      Popular
                    </span>
                  </div>
                )}
                
                <div className={`p-6 h-full flex flex-col rounded-xl border transition-all ${
                  plan.popular 
                    ? 'bg-zinc-900 border-primary-500' 
                    : 'bg-zinc-900/50 border-white/10 hover:border-white/20'
                }`}>
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-5xl font-bold text-gradient">{plan.price}</span>
                      {plan.period && (
                        <span className="text-gray-400 ml-2">/{plan.period}</span>
                      )}
                    </div>
                    <p className="text-gray-400">{plan.description}</p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 text-primary-400">
                          {feature.icon}
                        </div>
                        <span className="text-gray-300">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      setSelectedPlan(plan.name.toLowerCase() as 'free' | 'basic' | 'premium');
                      setShowSignupModal(true);
                    }}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular 
                        ? 'btn-primary' 
                        : 'btn-secondary'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ or Additional Info */}
          <motion.div className="mt-20 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="text-gray-400">
              Questions? Contact us at{' '}
              <a href="mailto:team@songram.app" className="text-primary-400 hover:text-primary-300 transition-colors">
                team@songram.app
              </a>
            </p>
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
                <li><Link to="/pricing" className="text-primary-400">Pricing</Link></li>
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
                  <p className="text-gray-400">We'll notify you when Songram launches{selectedPlan === 'premium' ? ' and your Premium plan will be ready' : selectedPlan === 'basic' ? ' and your Basic plan will be ready' : ' and your Free account will be ready'}.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Join Songram {selectedPlan === 'premium' ? 'Premium' : selectedPlan === 'basic' ? 'Basic' : 'Free'}
                  </h3>
                  <p className="text-gray-400 mb-6">Be the first to experience AI-powered music creation.</p>
                  
                  {selectedPlan === 'premium' ? (
                    <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 text-primary-400">
                        <IoSparkles />
                        <span className="font-medium">Premium Plan Selected</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">$20/month • Unlimited everything</p>
                    </div>
                  ) : selectedPlan === 'basic' ? (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 text-white">
                        <IoMusicalNotes />
                        <span className="font-medium">Basic Plan Selected</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">$10/month • Great for getting started</p>
                    </div>
                  ) : (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 text-white">
                        <IoMusicalNotes />
                        <span className="font-medium">Free Plan Selected</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">$0 • Up to 10 songs</p>
                    </div>
                  )}
                  
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
                      {isSubmitting ? 'Joining...' : `Get Early Access - ${selectedPlan === 'premium' ? 'Premium' : selectedPlan === 'basic' ? 'Basic' : 'Free'}`}
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

export default PricingPage;
