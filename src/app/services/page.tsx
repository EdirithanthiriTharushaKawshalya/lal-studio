"use client";
import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Editorial & Fashion",
    description: "High-concept imagery for brands and publications. We manage the entire visual narrative from lighting design to post-production.",
    capabilities: ["Studio Lighting", "Set Design", "Advanced Retouching"]
  },
  {
    title: "Fine Art Portraiture",
    description: "Capturing the human form with a focus on shadow, texture, and character. Clinical precision meets artistic soul.",
    capabilities: ["B&W Specialist", "Character Studies", "Corporate Branding"]
  },
  {
    title: "Product Engineering",
    description: "Technical photography for high-end objects. We highlight the mechanical beauty and material integrity of your products.",
    capabilities: ["Macro Photography", "Focus Stacking", "Material Physics"]
  },
  {
    title: "Event Documentation",
    description: "Candid, cinematic coverage of luxury events. We blend into the environment to capture authentic moments with professional polish.",
    capabilities: ["Natural Light", "Cinematic Grading", "Fast Delivery"]
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <header className="mb-24">
          <h1 className="text-8xl font-bold tracking-tighter leading-none mb-6">SERVICES</h1>
          <p className="text-gray-500 uppercase tracking-[0.4em] text-xs">Our Discipline & Expertise</p>
        </header>

        <div className="space-y-px bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-black p-12 md:p-16 flex flex-col lg:flex-row gap-12 group hover:bg-zinc-900/50 transition-all duration-500 border-b border-white/5 last:border-0"
            >
              {/* Left: Title & Concept */}
              <div className="lg:w-1/2">
                <h3 className="text-4xl font-bold tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                  {service.description}
                </p>
              </div>

              {/* Right: Technical Capabilities */}
              <div className="lg:w-1/2 flex flex-col justify-center">
                <div className="flex flex-wrap gap-3">
                  {service.capabilities.map((cap, i) => (
                    <span 
                      key={i} 
                      className="px-5 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-gray-500 group-hover:border-white/30 group-hover:text-white transition-all"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing CTA */}
        <footer className="mt-24 text-center">
          <p className="text-gray-500 mb-8 italic">Have a unique project in mind?</p>
          <a href="/booking" className="glass-button">Consult with the Studio</a>
        </footer>
      </div>
    </main>
  );
}