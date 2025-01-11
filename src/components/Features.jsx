import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-16">
          {/* First Feature */}
          <div className="relative">
            {/* Gold border decoration */}
            <div className="absolute -inset-4 border border-gold" />
            <img 
              src="/images/proptech.jpg"
              alt="Proptech innovation" 
              className="w-full h-[600px] object-cover"
            />
          </div>

          <motion.div 
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 
              className="text-4xl mb-6 text-gold"
              style={{ fontFamily: 'Cormorant Garamond' }}
            >
              DRIVING THE EVOLUTION OF PROPTECH WITH EVO
            </h2>
            <p className="text-gray-300 mb-8">
              At Evo, we redefine the future of property with groundbreaking innovations that merge technology and real estate.
            </p>
            <p className="text-gray-300 mb-8">
              Explore advanced digital solutions, smart property management systems, and immersive technologies that revolutionize the property landscape.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="self-start px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition-colors"
            >
              DISCOVER EVO →
            </motion.button>
          </motion.div>
        </div>

        {/* World Class Section */}
        <div className="grid grid-cols-2 gap-16 mt-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 
              className="text-4xl mb-6 text-gold"
              style={{ fontFamily: 'Cormorant Garamond' }}
            >
              TRANSFORMING SPACES INTO SMART COMMUNITIES
            </h2>
            <p className="text-gray-300 mb-8">
              Evo envisions properties as connected ecosystems, leveraging smart technologies to create dynamic and sustainable environments.
            </p>
            <p className="text-gray-300 mb-8">
              From intelligent design to community-focused innovation, we build spaces that inspire growth and connectivity.
            </p>
          </motion.div>

          <div className="relative">
            {/* Gold border decoration */}
            <div className="absolute -inset-4 border border-gold" />
            <img 
              src="/images/proptech2.jpg"
              alt="Innovative interior design" 
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
