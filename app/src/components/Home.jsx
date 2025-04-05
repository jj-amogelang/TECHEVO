import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src="/images/hero-bg.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-light text-white mb-6"
            style={{ fontFamily: 'Cormorant Garamond' }}
          >
            Welcome to EVO
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Your gateway to innovative property management and technology solutions
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/propevo')}
              className="px-8 py-3 bg-gold text-black hover:bg-gold/90 transition-colors duration-300"
            >
              Explore PropEvo
            </button>
            <button
              onClick={() => navigate('/techevo')}
              className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition-colors duration-300"
            >
              Discover TechEvo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl text-center text-white mb-16"
            style={{ fontFamily: 'Cormorant Garamond' }}
          >
            Our Solutions
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PropEvo Feature */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-lg"
            >
              <h3 className="text-2xl text-gold mb-4">PropEvo</h3>
              <p className="text-white/80">
                Streamline your property management with our comprehensive dashboard.
                Access real-time data, manage properties, and make informed decisions.
              </p>
            </motion.div>

            {/* TechEvo Feature */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-lg"
            >
              <h3 className="text-2xl text-gold mb-4">TechEvo</h3>
              <p className="text-white/80">
                Leverage cutting-edge technology solutions to enhance your business
                operations and stay ahead of the competition.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 