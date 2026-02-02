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
      service_type: formData.get('service'),
      booking_date: formData.get('date'),
    };

    try {
      const { error: supabaseError } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (supabaseError) throw supabaseError;

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6 flex items-center justify-center">
      <div className="w-full max-w-2xl glass-card p-12 md:p-16 border-white/5 relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-12 text-center">
                <h1 className="text-5xl font-bold tracking-tighter mb-4">RESERVE A SESSION</h1>
                <p className="text-gray-500 uppercase tracking-widest text-xs">Clinical Precision in Every Frame</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 text-xs rounded-lg text-center">
                    {error}
                  </div>
                )}

                <div className="space-y-6">
                  <div className="group border-b border-white/10 focus-within:border-white transition-all">
                    <label className="text-[10px] uppercase tracking-widest text-gray-600 group-focus-within:text-white">Client Identity</label>
                    <input name="name" type="text" required placeholder="Your Name" className="w-full bg-transparent py-4 text-xl outline-none" />
                  </div>
                  
                  <div className="group border-b border-white/10 focus-within:border-white transition-all">
                    <label className="text-[10px] uppercase tracking-widest text-gray-600 group-focus-within:text-white">Electronic Mail</label>
                    <input name="email" type="email" required placeholder="Email@Studio.com" className="w-full bg-transparent py-4 text-xl outline-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="group border-b border-white/10 focus-within:border-white transition-all">
                      <label className="text-[10px] uppercase tracking-widest text-gray-600 group-focus-within:text-white">Service Type</label>
                      <select name="service" required className="w-full bg-transparent py-4 text-lg outline-none appearance-none cursor-pointer">
                        <option className="bg-black">Editorial</option>
                        <option className="bg-black">Portrait</option>
                        <option className="bg-black">Product</option>
                      </select>
                    </div>
                    <div className="group border-b border-white/10 focus-within:border-white transition-all">
                      <label className="text-[10px] uppercase tracking-widest text-gray-600 group-focus-within:text-white">Preferred Date</label>
                      <input name="date" type="date" required className="w-full bg-transparent py-4 text-lg outline-none [color-scheme:dark]" />
                    </div>
                  </div>
                </div>

                <button 
                  disabled={loading}
                  className="w-full py-6 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:scale-[0.98] transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Transmitting..." : "Send Inquiry"}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h2 className="text-4xl font-bold tracking-tighter mb-4">INQUIRY RECEIVED</h2>
              <p className="text-gray-500 mb-10">Our studio coordinator will review your request and contact you shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs uppercase tracking-widest border-b border-white/20 pb-1 hover:border-white transition-all"
              >
                Back to form
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}