import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img 
          src="/images/hero.JPEG"
          alt="Luxury apartment exterior" 
          className="w-full h-full object-cover"
          style={{ backgroundColor: '#333' }}
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Overlay */}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-white text-center"
      >
        <motion.h1 
          className="text-8xl font-light mb-4"
          style={{ fontFamily: 'Cormorant Garamond' }}
        >
          EVO
        </motion.h1>
        <motion.p 
          className="text-xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          A New Tomorrow
        </motion.p>
        <motion.button
          className="px-6 py-2 border border-white text-sm hover:bg-white hover:text-black transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          COMING SOON
        </motion.button>
        <motion.div
          className="absolute bottom-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <p className="text-sm">SCROLL DOWN</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero; 