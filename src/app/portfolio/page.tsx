"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

export default function PortfolioPage() {
  const [works, setWorks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPortfolio() {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setWorks(data);
    }
    fetchPortfolio();
  }, []);

  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 border-l border-white/20 pl-8">
          <h1 className="text-7xl font-bold tracking-tighter">PORTFOLIO</h1>
          <p className="text-gray-500 uppercase tracking-[0.3em] mt-4 text-sm">Real-time Studio Feed</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {works.map((item) => (
            <motion.div key={item.id} className="glass-card relative aspect-square overflow-hidden group">
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                <p className="text-[10px] uppercase tracking-widest text-white/50">{item.category}</p>
                <h2 className="text-xl font-bold">{item.title}</h2>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}