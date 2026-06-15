import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoHome, IoMusicalNotes } from 'react-icons/io5';
import SEO from '../components/SEO';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen text-white flex items-center justify-center px-4">
      <SEO
        title="Page Not Found - Songram"
        description="The page you're looking for doesn't exist. Return to Songram to create and share music."
        url="https://www.songram.app/404"
        noindex={true}
      />
      
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-8"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <IoMusicalNotes className="w-24 h-24 mx-auto text-purple-500/50" />
        </motion.div>
        
        <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          Looks like this track got lost in the mix. Let's get you back to the music.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 btn-primary px-6 py-3"
        >
          <IoHome className="w-5 h-5" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
