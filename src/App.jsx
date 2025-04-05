import Hero from './components/Hero';
import Features from './components/Features';
import Collection from './components/Collection';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Features />
      <Collection />
    </div>
  );
}

export default App; 