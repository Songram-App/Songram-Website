import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoTimeOutline, IoLogoInstagram } from 'react-icons/io5';
import { FaWrench } from 'react-icons/fa';
import SEO from '../components/SEO';

const MaintenancePage: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Set 503 status code via meta tag for SEO/crawlers
    // Note: In production, this should be handled by the server/CDN
    const metaStatus = document.createElement('meta');
    metaStatus.setAttribute('http-equiv', 'status');
    metaStatus.setAttribute('content', '503 Service Unavailable');
    document.head.appendChild(metaStatus);
    
    return () => {
      document.body.style.overflow = 'auto';
      document.head.removeChild(metaStatus);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center px-4 pt-20">
      <SEO
        title="Songram | Scheduled Maintenance"
        description="Songram is currently undergoing scheduled maintenance. We'll be back shortly with improvements to your music creation experience."
        keywords="songram maintenance, scheduled maintenance, music platform"
        url="https://www.songram.app/maintenance"
      />
      
      <motion.div 
        className="max-w-2xl w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo Icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img src="/icon.png" alt="Songram" className="w-24 h-24 rounded-2xl shadow-2xl" />
        </motion.div>

        {/* Wrench Icon */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-[#2D2D44] flex items-center justify-center">
            <FaWrench className="text-gray-400 text-2xl" />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          We'll be back soon
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          We're performing scheduled maintenance to improve your experience.
        </motion.p>

        {/* Estimated Time Card */}
        <motion.div
          className="bg-[#2D2D44]/50 border border-white/10 rounded-2xl p-8 mb-10 max-w-md mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 text-gray-400 mb-3">
            <IoTimeOutline size={20} />
            <span className="text-sm uppercase tracking-wider font-medium">Estimated Time</span>
          </div>
          <h2 className="text-2xl font-semibold text-white">We'll be back shortly</h2>
        </motion.div>

        {/* Reassurance Message */}
        <motion.p
          className="text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          All your songs, projects, and data are safe. We're just making some improvements behind the scenes.
        </motion.p>

        {/* Instagram Link */}
        <motion.a
          href="https://www.instagram.com/songram.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-colors mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <IoLogoInstagram size={20} />
          <span className="font-medium">Follow Updates on Instagram</span>
        </motion.a>

        {/* Support Email */}
        <motion.p
          className="text-gray-500 text-sm mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Need help?{' '}
          <a
            href="mailto:team@songram.app"
            className="text-gray-400 hover:text-white transition-colors"
          >
            team@songram.app
          </a>
        </motion.p>

        {/* Final Message */}
        <motion.p
          className="text-gray-600 text-sm max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          Thank you for your patience. We'll have you back creating music in no time.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default MaintenancePage;
