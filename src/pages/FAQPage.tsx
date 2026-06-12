import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import {
  IoClose,
  IoMenu,
  IoSearch,
  IoMusicalNotes,
  IoSparkles,
  IoCloudUploadOutline,
  IoCut,
  IoConstructOutline,
  IoRocket,
  IoShieldCheckmarkOutline,
  IoPeople,
  IoKeypadOutline,
  IoLogoInstagram,
  IoLogoTiktok,
} from 'react-icons/io5';
import XLogo from '../components/XLogo';
import SEO from '../components/SEO';

type FAQCategory = 'Basics' | 'Creation' | 'Studio' | 'Rights' | 'Creators';

interface FAQItem {
  question: string;
  answer: string;
  category: FAQCategory;
  icon: IconType;
  keywords: string[];
}

const faqItems: FAQItem[] = [
  {
    question: 'What is Songram?',
    answer: 'Songram is an AI music workspace that helps artists build, complete, and publish songs by generating musical parts that fit what they already created.',
    category: 'Basics',
    icon: IoMusicalNotes,
    keywords: ['ai music workspace', 'song creation', 'publish songs'],
  },
  {
    question: 'How is Songram different from Suno or Udio?',
    answer: 'Suno and Udio are built around generating full songs. Songram focuses on complementary music matching: adding the missing drums, bass, harmony, melody, or texture around your existing idea.',
    category: 'Basics',
    icon: IoSparkles,
    keywords: ['suno', 'udio', 'complementary music matching', 'full songs'],
  },
  {
    question: 'Can I upload my own music?',
    answer: 'Yes. Songram is designed around your own tracks, loops, recordings, and ideas.',
    category: 'Creation',
    icon: IoCloudUploadOutline,
    keywords: ['upload', 'tracks', 'loops', 'recordings'],
  },
  {
    question: 'What does "complementary music" mean?',
    answer: 'It means Songram listens to your current arrangement and creates new parts that musically fit instead of replacing your original idea.',
    category: 'Creation',
    icon: IoSparkles,
    keywords: ['complementary music', 'arrangement', 'new parts'],
  },
  {
    question: 'Can Songram generate a full song from scratch?',
    answer: 'Songram is strongest when you start with an idea, recording, loop, or arrangement. Its purpose is to help complete music, not erase the artist.',
    category: 'Creation',
    icon: IoMusicalNotes,
    keywords: ['full song', 'from scratch', 'complete music'],
  },
  {
    question: 'Can I separate stems?',
    answer: 'Yes. Songram supports stem separation so you can split audio into parts like vocals, drums, bass, and other instruments.',
    category: 'Studio',
    icon: IoCut,
    keywords: ['stems', 'stem separation', 'vocals', 'drums', 'bass'],
  },
  {
    question: 'What audio formats are supported?',
    answer: 'For best results, use WAV, FLAC, or MP3. M4A may need conversion depending on the feature.',
    category: 'Studio',
    icon: IoMusicalNotes,
    keywords: ['audio formats', 'wav', 'flac', 'mp3', 'm4a'],
  },
  {
    question: 'Can I edit my song inside Songram?',
    answer: 'Yes. Songram includes a browser-based studio for arranging, editing, mixing, and working with generated parts.',
    category: 'Studio',
    icon: IoConstructOutline,
    keywords: ['edit', 'studio', 'arranging', 'mixing'],
  },
  {
    question: 'Can I publish music from Songram?',
    answer: 'Yes. Songram includes a publish flow for sharing completed tracks.',
    category: 'Rights',
    icon: IoRocket,
    keywords: ['publish', 'sharing', 'completed tracks'],
  },
  {
    question: 'Do I own the music I make?',
    answer: 'You keep ownership of your songs made on the basic and premium plan.',
    category: 'Rights',
    icon: IoShieldCheckmarkOutline,
    keywords: ['ownership', 'own music', 'basic', 'premium'],
  },
  {
    question: 'Can I use Songram music commercially?',
    answer: 'Yes, if you are a paid user.',
    category: 'Rights',
    icon: IoShieldCheckmarkOutline,
    keywords: ['commercial', 'paid user', 'license'],
  },
  {
    question: 'Can I upload copyrighted songs?',
    answer: 'Only upload audio you own or have permission to use.',
    category: 'Rights',
    icon: IoShieldCheckmarkOutline,
    keywords: ['copyright', 'permission', 'owned audio'],
  },
  {
    question: 'Does Songram replace musicians?',
    answer: "No. Songram is built as a collaborator. It helps finish and expand ideas while keeping the artist's taste at the center.",
    category: 'Creators',
    icon: IoPeople,
    keywords: ['musicians', 'collaborator', 'artist taste'],
  },
  {
    question: 'Who is Songram for?',
    answer: 'Songwriters, producers, vocalists, beatmakers, indie artists, and creators with unfinished ideas they want to turn into complete songs.',
    category: 'Creators',
    icon: IoPeople,
    keywords: ['songwriters', 'producers', 'vocalists', 'beatmakers', 'indie artists'],
  },
  {
    question: 'Can beginners use Songram?',
    answer: 'Yes. Songram is built to make music creation easier without requiring advanced production knowledge.',
    category: 'Creators',
    icon: IoPeople,
    keywords: ['beginners', 'easy', 'production knowledge'],
  },
  {
    question: 'Can advanced producers use Songram?',
    answer: 'Yes. Producers can use it for arrangement ideas, stem workflows, complementary parts, and faster song development.',
    category: 'Creators',
    icon: IoConstructOutline,
    keywords: ['advanced producers', 'arrangement', 'stem workflows'],
  },
  {
    question: 'Does Songram support collaboration?',
    answer: 'Songram can support collaborative workflows through shared projects and publishing features as the platform evolves.',
    category: 'Creators',
    icon: IoPeople,
    keywords: ['collaboration', 'shared projects', 'publishing'],
  },
  {
    question: 'Is my uploaded music private?',
    answer: 'Uploaded projects should remain private unless you choose to publish or share them.',
    category: 'Rights',
    icon: IoShieldCheckmarkOutline,
    keywords: ['private', 'uploaded music', 'publish', 'share'],
  },
  {
    question: 'Can I export my music?',
    answer: 'Songram should support exporting finished tracks and project audio, depending on the available plan/features.',
    category: 'Studio',
    icon: IoRocket,
    keywords: ['export', 'finished tracks', 'project audio'],
  },
  {
    question: 'Why use Songram instead of a regular DAW?',
    answer: 'A regular DAW gives you tools. Songram gives you tools plus AI that understands your existing music and helps complete it.',
    category: 'Basics',
    icon: IoSparkles,
    keywords: ['daw', 'ai tools', 'complete music'],
  },
  {
    question: 'Does Songram support MIDI?',
    answer: 'Yes. Songram supports MIDI editing and playback, includes a built-in digital MIDI keyboard, and lets you connect an external MIDI piano or keyboard to create and arrange musical parts directly in the studio.',
    category: 'Studio',
    icon: IoKeypadOutline,
    keywords: ['midi', 'keyboard', 'piano', 'editing', 'playback'],
  },
];

const faqCategories: Array<{ name: FAQCategory | 'All'; description: string; icon: IconType }> = [
  { name: 'All', description: 'Browse every Songram answer in one place.', icon: IoSearch },
  { name: 'Basics', description: 'Learn what Songram is and how it compares.', icon: IoMusicalNotes },
  { name: 'Creation', description: 'Understand uploads and complementary music.', icon: IoSparkles },
  { name: 'Studio', description: 'Explore stems, editing, exports, and MIDI.', icon: IoConstructOutline },
  { name: 'Rights', description: 'Review ownership, privacy, and commercial use.', icon: IoShieldCheckmarkOutline },
  { name: 'Creators', description: 'See who Songram is built for.', icon: IoPeople },
];

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/team', label: 'Team' },
  { path: '/pricing', label: 'Pricing' },
];

const FAQPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | 'All'>('All');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const hasActiveSearch = searchTerm.trim().length > 0;

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const words = normalizedSearch.split(/\s+/).filter(Boolean);

    return faqItems.filter((item) => {
      const matchesCategory = hasActiveSearch || selectedCategory === 'All' || item.category === selectedCategory;

      if (!normalizedSearch) {
        return matchesCategory;
      }

      const searchableContent = [
        item.question,
        item.answer,
        item.category,
        ...item.keywords,
      ].join(' ').toLowerCase();

      return matchesCategory && words.every((word) => searchableContent.includes(word));
    });
  }, [hasActiveSearch, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen text-white">
      <SEO
        title="FAQ - Frequently Asked Questions"
        description="Find answers to common questions about Songram. Learn how to create music, upload tracks, use AI features, and more."
        keywords="songram FAQ, music creation help, AI music questions, songram support, music app guide"
        url="https://songram.app/faq"
      />
      {/* FAQ Schema for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map((item) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
              },
            })),
          }),
        }}
      />
      <nav className="fixed top-0 left-0 right-0 z-50 navbar-blur transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div className="flex items-center space-x-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Link to="/" className="flex items-center space-x-2">
                <img src="/icon.png" alt="Songram" className="w-8 h-8 rounded-xl" />
                <span className="text-xl font-bold text-gradient glow-text font-satoshi">Songram</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm transition-colors ${link.path === '/faq' ? 'text-primary-400' : 'text-gray-300 hover:text-white'}`}
                >
                  {link.label}
                </Link>
              ))}
              <a href="https://songram.app/login" className="btn-primary">Get Started</a>
            </div>

            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
              </button>
            </div>
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
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 ${link.path === '/faq' ? 'text-primary-400' : 'text-gray-300 hover:text-white'}`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a href="https://songram.app/login" className="w-full btn-primary mt-4 block text-center">
                  Get Started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <section className="max-w-3xl mx-auto">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-primary-400 text-sm font-medium mb-3 tracking-wide uppercase">Support</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently asked questions
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto mb-8">
              Everything you need to know about Songram.
            </p>

            {/* Search bar */}
            <div className="max-w-xl mx-auto">
              <label htmlFor="faq-search" className="sr-only">Search FAQ</label>
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 focus-within:border-white/25 transition-colors duration-200">
                <IoSearch className="text-gray-500 flex-shrink-0" size={16} aria-hidden="true" />
                <input
                  id="faq-search"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full bg-transparent text-sm text-white placeholder-gray-600 outline-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {faqCategories.map((category) => {
              const isSelected = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                    isSelected
                      ? 'bg-white text-black font-medium'
                      : 'text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Accordion */}
          <motion.div
            className="divide-y divide-white/[0.08]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const isOpen = openQuestion === item.question;
                return (
                  <div key={item.question}>
                    <button
                      type="button"
                      onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                      className="flex w-full items-center justify-between py-5 text-left group"
                      aria-expanded={isOpen}
                    >
                      <span className={`text-base transition-colors duration-200 ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                        {item.question}
                      </span>
                      <span
                        className={`ml-6 flex-shrink-0 text-gray-500 group-hover:text-white transition-all duration-300 ${isOpen ? 'rotate-90 text-white' : ''}`}
                        aria-hidden="true"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 2L9 7L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p className="pb-5 text-gray-400 text-sm leading-relaxed">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="py-16 text-center">
                <p className="text-gray-500 text-sm">No answers found for this category.</p>
              </div>
            )}
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/icon.png" alt="Songram" className="w-8 h-8 rounded-xl" />
                <span className="text-lg font-bold text-gradient font-satoshi">Songram</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md text-sm">
                The AI-powered music creation platform where creativity meets technology.
              </p>
              <div className="flex space-x-3">
                <a href="https://instagram.com/songramapp" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-pink-400 transition-all">
                  <IoLogoInstagram size={18} />
                </a>
                <a href="https://tiktok.com/@songramapp" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-all">
                  <IoLogoTiktok size={18} />
                </a>
                <a href="https://x.com/songramapp" target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-all">
                  <XLogo size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</Link></li>
                <li><Link to="/faq" className="text-primary-400 text-sm">FAQ</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About</Link></li>
                <li><Link to="/team" className="text-gray-400 hover:text-white transition-colors text-sm">Team</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
                <li><a href="mailto:team@songram.app" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a></li>
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

export default FAQPage;
