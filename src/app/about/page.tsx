"use client";
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* Left Section: The Statement */}
        <div className="lg:col-span-5">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-8xl font-bold tracking-tighter leading-[0.8] mb-12"
          >
            THE <br /> STUDIO
          </motion.h1>
          <div className="h-px w-24 bg-white/20 mb-12" />
          <p className="text-gray-500 uppercase tracking-[0.3em] text-xs">
            Based in Sri Lanka. <br /> Serving Global Visions.
          </p>
        </div>

        {/* Right Section: The Philosophy */}
        <div className="lg:col-span-7 space-y-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl text-gray-200 leading-tight tracking-tight"
          >
            LAL STUDIO is a technical photography house focused on the intersection of optical precision and cinematic storytelling.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-500 leading-relaxed text-lg">
            <p>
              We believe that photography is an engineering challenge. By mastering the physics of light and the mechanics of the lens, we unlock emotions that static images rarely reach.
            </p>
            <p>
              Our workflow is purely digital but our soul is analog. We treat every pixel with the same respect as a silver halide crystal on a 35mm film strip.
            </p>
          </div>

          {/* Technical Stats Card */}
          <div className="glass-card p-12 flex flex-wrap gap-16 items-center border-white/5 bg-white/[0.02]">
            <div>
              <span className="block text-5xl font-bold text-white tracking-tighter">2026</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">Established</span>
            </div>
            <div>
              <span className="block text-5xl font-bold text-white tracking-tighter">1.2ms</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">Optical Sync</span>
            </div>
            <div>
              <span className="block text-5xl font-bold text-white tracking-tighter">High</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">Dynamic Range</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}