import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero({ onBrowse }) {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/m8wpIQzXWhEh9Yek/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-24 pb-16 flex flex-col">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-6">
            <div className="h-2 w-2 rounded-full bg-fuchsia-500 animate-pulse" />
            <p className="text-sm text-gray-300">Premium rides. Instant booking. 24/7 support.</p>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight">
            Drive the Future
            <span className="block bg-gradient-to-r from-fuchsia-400 via-purple-400 to-fuchsia-500 bg-clip-text text-transparent">Luxury Car Rentals</span>
          </h1>
          <p className="mt-5 text-gray-300 text-lg">
            Browse an exclusive fleet of performance and luxury cars. Real-time availability, transparent pricing, and effortless checkout.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <button onClick={onBrowse} className="uppercase tracking-wide bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-xl font-medium transition">
              Browse Cars
            </button>
            <a href="#why" className="uppercase tracking-wide bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 px-6 py-3 rounded-xl font-medium transition">
              Why Choose Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
