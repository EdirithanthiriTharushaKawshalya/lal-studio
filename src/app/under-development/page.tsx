"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Construction, ArrowLeft } from 'lucide-react';

export default function UnderDevelopment() {
  return (
    <main className="min-h-screen bg-[#02040a] flex items-center justify-center px-6">
      <div className="glass-card p-12 md:p-20 border-white/5 bg-white/[0.01] max-w-2xl text-center relative overflow-hidden">
        
        {/* Animated Background Element */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10">
            <Construction size={32} className="text-gray-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold italic tracking-tighter text-white mb-6 uppercase">
            Under Development
          </h1>
          
          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 max-w-sm mx-auto">
            We are currently engineering this section to meet our technical standards. 
            Check back soon to see the finished vision.
          </p>

          <Link 
            href="/" 
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-white hover:text-blue-400 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Studio
          </Link>
        </div>
      </div>
    </main>
  );
}