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
  IoLogoLinkedin,
  IoLogoGithub,
  IoLocationOutline,
  IoBriefcaseOutline,
  IoSchoolOutline,
  IoMailOutline
} from 'react-icons/io5';
import validator from 'validator';
import XLogo from '../components/XLogo';
import EdirinAvatar from '../assets/images/Edirin_avatar.jpg';
import SebastianAvatar from '../assets/images/sebastian_avatar.jpg';

const TeamPage: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

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

  const teamMembers = [
    {
      name: "Edirin Okpikpi",
      role: "Founder & CEO",
      location: "British Columbia, Canada",
      bio: "GIS Analyst and Data Specialist leading Songram's strategic vision and product development. With 8+ years of experience in spatial data analysis, database management, and GIS automation at Metro Vancouver and Manitoba Government, Edirin brings deep expertise in data-driven decision making and system modeling. His background in geospatial technologies and applied computer science drives Songram's innovative approach to music data analytics and user experience optimization.",
      experience: [
        "Leading Songram's strategic direction and product vision as Founder & CEO",
        "Engineering Technician II (GIS Analyst) at Metro Vancouver - System Modelling and Data Analytics for Water Services",
        "Data Specialist - Expert in spatial data analysis, ETL workflows, and database management with 8+ years experience",
        "GIS Automation & Analysis - Proficient in ArcGIS Pro, Python, SQL, and enterprise geodatabase management",
        "Government Systems Experience - Engineering roles at Manitoba Government, City of Winnipeg, and Metro Vancouver",
        "Technical Leadership - Applied Science Technologist certified with proven track record in system modeling and data analytics"
      ],
      education: "Bachelor of Science in Applied Computer Science (Major) and Geography (Minor), University of Winnipeg",
      skills: ["Strategic Leadership", "Data Analytics", "GIS Systems", "Python", "SQL", "Database Management", "System Modeling", "Product Strategy", "Team Leadership", "Government Relations"],
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
      bio: "Systems software engineer and Co-Founder & CTO of Songram, where he leads platform architecture and engineering strategy. Currently a Systems Software Engineer at CrowdStrike, architecting enterprise CI/CD infrastructure for global cybersecurity operations. Sebastian brings deep expertise in scalable systems, DevOps, and technical leadership to drive Songram's innovative music creation platform.",
      experience: [
        "Leading Songram's technical architecture and platform development as Co-Founder & CTO",
        "Full-Stack Development - Building Songram's AI-powered music creation platform from frontend to backend infrastructure",
        "Systems Software Engineer at CrowdStrike - Building enterprise-scale CI/CD infrastructure",
        "Platform Development Leadership - Led mobile, web, and platform engineering teams",
        "Enterprise DevOps Specialist - Jenkins, Kubernetes, automated deployments, and system monitoring",
        "Performance Optimization Expert - Maintaining 99.9% uptime for enterprise systems"
      ],
      education: "Bachelor of Arts in Psychology, University of Winnipeg - Unique perspective on user behavior and system design",
      social: {
        linkedin: "https://www.linkedin.com/in/akpevwen-sebastian-gbudje",
        github: "https://github.com/gbudjeakp",
        email: "gbudjeakp@gmail.com"
      },
      avatar: SebastianAvatar
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
              <Link to="/team" className="text-primary-500 dark:text-primary-400 font-medium">
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
              <Link to="/team" className="block text-primary-500 dark:text-primary-400 font-medium">
                Team
              </Link>
              <Link to="/pricing" className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
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

      {/* Hero Section */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Meet the <span className="text-gradient">Team</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The visionaries and technical experts behind Songram's revolutionary AI-powered music creation platform.
          </motion.p>
        </div>

        {/* Team Members */}
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start gap-4 sm:gap-6 lg:gap-8`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Profile Image */}
                <div className="flex-shrink-0 w-full max-w-xs sm:max-w-sm lg:w-64 lg:pt-2 mx-auto lg:mx-0">
                  <div className="relative">
                    <div className="card overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-800">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={member.avatar} 
                          alt={`${member.name} avatar`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-4 h-4 sm:w-6 sm:h-6 bg-primary-500/20 rounded-full animate-float"></div>
                    <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-3 h-3 sm:w-4 sm:h-4 bg-primary-300/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>

                {/* Profile Information */}
                <div className="flex-1 text-center lg:text-left space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{member.name}</h2>
                    <div className="text-lg sm:text-xl text-primary-600 dark:text-primary-400 font-semibold mb-2">{member.role}</div>
                    <div className="flex items-center justify-center lg:justify-start text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                      <IoLocationOutline size={16} className="mr-2 flex-shrink-0" />
                      <span className="text-center lg:text-left">{member.location}</span>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Experience */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center justify-center lg:justify-start">
                        <IoBriefcaseOutline size={18} className="mr-2 flex-shrink-0" />
                        Key Experience
                      </h3>
                      <ul className="space-y-2">
                        {member.experience.map((exp, i) => (
                          <li key={i} className="flex items-start justify-center lg:justify-start text-sm sm:text-base text-gray-600 dark:text-gray-300">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="text-center lg:text-left">{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center justify-center lg:justify-start">
                        <IoSchoolOutline size={18} className="mr-2 flex-shrink-0" />
                        Education
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center lg:text-left">{member.education}</p>
                    </div>


                    {/* Social Links */}
                    <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4 pt-4">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 sm:p-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group"
                          aria-label="LinkedIn Profile"
                        >
                          <IoLogoLinkedin size={18} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 sm:p-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group"
                          aria-label="GitHub Profile"
                        >
                          <IoLogoGithub size={18} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                        </a>
                      )}
                      <a
                        href={`mailto:${member.social.email}`}
                        className="p-2 sm:p-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group"
                        aria-label="Email Contact"
                      >
                        <IoMailOutline size={18} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center mt-16 sm:mt-20 lg:mt-24">
          <motion.div
            className="card p-6 sm:p-8 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-800"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Join the Music Revolution?</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Connect with our team and be part of the future of music creation. We're always looking for talented individuals to join our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => setShowSignupModal(true)}
                className="btn-primary text-sm sm:text-base lg:text-lg px-6 py-3 sm:px-8 sm:py-4"
              >
                Get Early Access
              </button>
              <a
                href="mailto:team@songram.app"
                className="btn-secondary text-sm sm:text-base lg:text-lg px-6 py-3 sm:px-8 sm:py-4"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
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
            <p>&copy; 2025 Songram. All rights reserved.</p>
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
              <h3 className="text-2xl font-bold">Join Songram</h3>
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
                  We'll notify you when Songram launches.
                </p>
              </div>
            ) : (
              <form
                action="https://app.us11.list-manage.com/subscribe/post?u=6672acc5c2e3d9aa757c7ab19&id=de3b92a4a0"
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Joining...' : 'Get Early Access'}
                </button>

                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                  By signing up, you agree to our Terms and Privacy Policy.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TeamPage;
