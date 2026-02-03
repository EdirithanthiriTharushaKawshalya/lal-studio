"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortfolioPage() {
  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) setWorks(data || []);
      setLoading(false);
    }
    fetchPortfolio();
  }, []);

  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6 md:px-20 selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 border-l border-white/20 pl-8">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-bold tracking-tighter italic text-white"
          >
            PORTFOLIO
          </motion.h1>
          <p className="text-gray-500 uppercase tracking-[0.3em] mt-4 text-[10px] font-mono">
            LAL STUDIO / Ambalangoda / Est. 1982
          </p>
        </header>

        {loading ? (
          <div className="h-96 flex items-center justify-center font-mono text-[10px] text-white/20 uppercase tracking-widest animate-pulse">
            Fetching Archive...
          </div>
        ) : (
          /* MASONRY: Prevents forced square cropping */
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence>
              {works.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative break-inside-avoid group overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]"
                >
                  {/* Native Height (h-auto) ensures original sizes */}
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-105" 
                    loading="lazy"
                  />
                  
                  {/* Cinematic Hover State */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                    <span className="text-[10px] uppercase tracking-widest text-white/50 mb-2 font-mono">
                      {item.category}
                    </span>
                    <h2 className="text-xl font-bold italic text-white">
                      {item.title}
                    </h2>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <footer className="mt-40 pt-10 border-t border-white/5 flex justify-between items-center opacity-20 text-[9px] font-mono tracking-widest uppercase text-white">
          <span>LAL STUDIO ARCHIVE</span>
          <span>HATTON NATIONAL BANK, AMBALANGODA</span>
      </footer>
    </main>
  );
}