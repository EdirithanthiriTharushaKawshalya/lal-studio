"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookingPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const bookingData = {
      client_name: formData.get('name'),
      email: formData.get('email'),
      booking_date: formData.get('date'),
      message: formData.get('message'), // Added message field
    };

    try {
      const { error: supabaseError } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (supabaseError) throw supabaseError;

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Transmission failed. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-40 pb-20 px-6 flex flex-col items-center justify-center selection:bg-white selection:text-black">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-16 border-l border-white/10 pl-8">
                <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-4 italic text-white">RESERVE</h1>
                <p className="text-gray-500 uppercase tracking-[0.4em] text-[10px] font-mono">
                  LAL STUDIO / Ambalangoda / Est. 1982
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12 bg-white/[0.02] p-8 md:p-12 border border-white/5 rounded-3xl backdrop-blur-xl">
                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase tracking-widest text-center font-mono">
                    System Error: {error}
                  </motion.div>
                )}

                <div className="space-y-10">
                  <div className="group space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-gray-600 group-focus-within:text-white transition-colors font-mono">Client Identity</label>
                    <input name="name" type="text" required placeholder="Full Name" className="w-full bg-transparent border-b border-white/10 py-3 text-2xl outline-none focus:border-white transition-all placeholder:text-white/5" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="group space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-gray-600 group-focus-within:text-white transition-colors font-mono">Electronic Mail</label>
                      <input name="email" type="email" required placeholder="contact@domain.com" className="w-full bg-transparent border-b border-white/10 py-3 text-lg outline-none focus:border-white transition-all placeholder:text-white/5" />
                    </div>
                    <div className="group space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-gray-600 group-focus-within:text-white transition-colors font-mono">Preferred Sync Date</label>
                      <input name="date" type="date" required className="w-full bg-transparent border-b border-white/10 py-3 text-lg outline-none focus:border-white transition-all [color-scheme:dark]" />
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-gray-600 group-focus-within:text-white transition-colors font-mono">Project Brief / Message</label>
                    <textarea 
                      name="message" 
                      rows={4} 
                      required
                      placeholder="Describe your visual requirements..." 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-6 text-lg outline-none focus:border-white/40 transition-all placeholder:text-white/5 resize-none" 
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    disabled={loading}
                    className="group relative w-full py-6 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-full overflow-hidden transition-transform active:scale-95 disabled:bg-white/20 disabled:text-black/40"
                  >
                    <span className="relative z-10">{loading ? "Transmitting..." : "Initialize Request"}</span>
                    <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-3xl"
            >
              <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-10">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="w-3 h-3 bg-white rounded-full" 
                />
              </div>
              <h2 className="text-5xl font-bold tracking-tighter mb-4 text-white italic">LOGGED</h2>
              <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-12">Session inquiry successfully transmitted.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-[10px] uppercase tracking-widest text-white/40 border-b border-white/10 pb-1 hover:text-white hover:border-white transition-all font-mono"
              >
                New Transmission
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-20 text-center opacity-20">
            <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-white">44 Years of Visual Engineering</span>
        </footer>
      </div>
    </main>
  );
}