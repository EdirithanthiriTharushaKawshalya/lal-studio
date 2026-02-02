"use client";
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* Left: Huge Title */}
        <div className="lg:col-span-5">
          <h1 className="text-8xl font-bold tracking-tighter leading-[0.8]">
            THE <br /> STUDIO
          </h1>
          <div className="mt-12 h-px w-20 bg-white/20" />
        </div>

        {/* Right: Detailed Content */}
        <div className="lg:col-span-7 space-y-12">
          <p className="text-3xl text-gray-300 leading-tight tracking-tight">
            LAL STUDIO is a technical photography house based in Sri Lanka, focused on the intersection of optical precision and cinematic storytelling.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-500 leading-relaxed text-lg">
            <p>
              We believe that photography is an engineering challenge. By mastering the physics of light and the mechanics of the lens, we unlock emotions that static images rarely reach.
            </p>
            <p>
              Our workflow is purely digital but our soul is analog. We treat every pixel with the same respect as a silver halide crystal on a 35mm film strip.
            </p>
          </div>

          <div className="glass-card p-10 flex flex-wrap gap-12 items-center">
            <div>
              <span className="block text-4xl font-bold text-white tracking-tighter">2026</span>
              <span className="text-xs uppercase tracking-widest text-gray-600">Established</span>
            </div>
            <div>
              <span className="block text-4xl font-bold text-white tracking-tighter">Premium</span>
              <span className="text-xs uppercase tracking-widest text-gray-600">Equipment Class</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}