"use client";
import React from 'react';
import { motion } from 'framer-motion';

const work = [
  { id: 1, title: "Noir Portrait", category: "Editorial", size: "col-span-2 row-span-2" },
  { id: 2, title: "Technical Lens", category: "Product", size: "col-span-1 row-span-1" },
  { id: 3, title: "Shadow Play", category: "Fashion", size: "col-span-1 row-span-2" },
  { id: 4, title: "The Film Reel", category: "Vintage", size: "col-span-1 row-span-1" },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 border-l border-white/20 pl-8">
          <h1 className="text-7xl font-bold tracking-tighter leading-none">PORTFOLIO</h1>
          <p className="text-gray-500 uppercase tracking-[0.3em] mt-4 text-sm">Selected Works & Case Studies</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[300px]">
          {work.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`glass-card relative overflow-hidden group cursor-pointer ${item.size}`}
            >
              <div className="absolute inset-0 bg-zinc-900 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-8 left-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">{item.category}</p>
                <h2 className="text-2xl font-bold tracking-tight">{item.title}</h2>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}