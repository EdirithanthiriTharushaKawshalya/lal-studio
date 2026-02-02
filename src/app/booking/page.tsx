"use client";
import React, { useState } from 'react';

export default function BookingPage() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6 flex items-center justify-center">
      <div className="w-full max-w-2xl glass-card p-12 md:p-16 border-white/5">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold tracking-tighter mb-4">RESERVE A SESSION</h1>
          <p className="text-gray-500 uppercase tracking-widest text-xs">Clinical Precision in Every Frame</p>
        </div>

        <form className="space-y-8">
          <div className="space-y-6">
            <div className="group border-b border-white/10 focus-within:border-white transition-all">
              <label className="text-[10px] uppercase tracking-widest text-gray-600 group-focus-within:text-white">Client Identity</label>
              <input type="text" placeholder="Your Name" className="w-full bg-transparent py-4 text-xl outline-none" />
            </div>
            
            <div className="group border-b border-white/10 focus-within:border-white transition-all">
              <label className="text-[10px] uppercase tracking-widest text-gray-600 group-focus-within:text-white">Electronic Mail</label>
              <input type="email" placeholder="Email@Studio.com" className="w-full bg-transparent py-4 text-xl outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="group border-b border-white/10 focus-within:border-white transition-all">
                <label className="text-[10px] uppercase tracking-widest text-gray-600 group-focus-within:text-white">Service Type</label>
                <select className="w-full bg-transparent py-4 text-lg outline-none appearance-none cursor-pointer">
                  <option className="bg-black">Editorial</option>
                  <option className="bg-black">Portrait</option>
                  <option className="bg-black">Product</option>
                </select>
              </div>
              <div className="group border-b border-white/10 focus-within:border-white transition-all">
                <label className="text-[10px] uppercase tracking-widest text-gray-600 group-focus-within:text-white">Preferred Date</label>
                <input type="date" className="w-full bg-transparent py-4 text-lg outline-none [color-scheme:dark]" />
              </div>
            </div>
          </div>

          <button className="w-full py-6 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:scale-[0.98] transition-all duration-300">
            Send Inquiry
          </button>
        </form>
      </div>
    </main>
  );
}