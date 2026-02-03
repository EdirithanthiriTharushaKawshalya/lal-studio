"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('id', { ascending: true });
        
        if (!error) setServices(data || []);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <main className="relative min-h-screen pt-40 pb-20 overflow-hidden selection:bg-white selection:text-black">
      <div className="max-w-5xl mx-auto px-6 md:px-20 relative z-10">
        
        {/* Header Section */}
        <header className="mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold tracking-tighter mb-4 italic text-white"
          >
            CAPABILITIES
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.2 }}
            className="text-white uppercase tracking-[0.4em] text-[10px] font-mono"
          >
            LAL STUDIO / Ambalangoda / Est. 1982
          </motion.p>
        </header>

        {/* Services List Container */}
        <div className="border-t border-white/10">
          {loading ? (
            <div className="py-20 text-center text-gray-600 text-[10px] uppercase tracking-widest animate-pulse font-mono">
               Synchronizing Service Data...
            </div>
          ) : (
            services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))
          )}
        </div>

        {/* Simplified Legacy Footer */}
        <footer className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-30 text-[9px] font-mono tracking-[0.2em] uppercase text-gray-400">
          <span>HNB Building, Ambalangoda</span>
          <span className="hidden md:block">●</span>
          <span>44 Years of Precision</span>
          <span className="hidden md:block">●</span>
          <span>Since 1982</span>
        </footer>
      </div>
    </main>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group border-b border-white/10 py-16 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-white/[0.01] px-4 md:px-8 transition-all duration-500 cursor-default"
    >
      <div className="max-w-md">
        <span className="text-[10px] text-gray-600 font-mono mb-3 block uppercase tracking-[0.2em]">
            {service.tag}
        </span>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white group-hover:italic group-hover:translate-x-1 transition-all duration-500">
          {service.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
          {service.detail}
        </p>
      </div>
      
      <div className="mt-8 md:mt-0">
        <div className="text-[9px] uppercase font-bold tracking-[0.3em] text-gray-500 group-hover:text-white transition-all border border-white/5 px-6 py-3 rounded-full group-hover:border-white/20">
          Enquire
        </div>
      </div>
    </motion.div>
  );
}