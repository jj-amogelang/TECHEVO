import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Collection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="bg-black py-20">
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-gold text-3xl text-center mb-16"
        style={{ fontFamily: 'Cormorant Garamond' }}
      >
        OUR COLLECTION
      </motion.h2>

      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Gold border decoration */}
          <div className="absolute -inset-4 border border-gold" />
          
          <div className="grid grid-cols-2 gap-8">
            <div className="relative group cursor-pointer">
              <img 
                src="/images/oasis-exterior.jpg" 
                alt="Oasis" 
                className="w-full h-[400px] object-cover"
              />
              <motion.h3
                className="absolute bottom-8 left-8 text-white text-6xl font-light"
                style={{ fontFamily: 'Cormorant Garamond' }}
              >
                Oasis
              </motion.h3>
            </div>

            <div className="relative group cursor-pointer">
              <img 
                src="/images/sanctuary-exterior.jpg" 
                alt="Sanctuary" 
                className="w-full h-[400px] object-cover"
              />
              <motion.h3
                className="absolute bottom-8 left-8 text-white text-6xl font-light"
                style={{ fontFamily: 'Cormorant Garamond' }}
              >
                Sanctuary
              </motion.h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection; 