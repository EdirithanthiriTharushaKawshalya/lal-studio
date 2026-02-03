"use client";
import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, ArrowUpRight, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full px-8 md:px-24 pb-12 relative z-10 bg-transparent">
      <div className="glass-card p-12 md:p-16 border-white/5 bg-white/[0.01]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="font-bold tracking-tighter text-3xl italic text-white">
              LAL STUDIO
            </Link>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
              Engineering light and capturing raw emotion through a technical lens. 
              Based in Sri Lanka, serving global visions.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="/under-development" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:border-white transition-all">
                <Facebook size={18} className="text-white" />
              </a>
              <a href="/under-development" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:border-white transition-all">
                <Instagram size={18} className="text-white" />
              </a>
              <a href="/under-development" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:border-white transition-all">
                <Twitter size={18} className="text-white" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black">Studio</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/booking" className="hover:text-white transition-colors">Booking</Link></li>
            </ul>
          </div>

          {/* Contact Column - UPDATED */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black">Contact</h4>
            <ul className="space-y-4 text-sm font-light text-gray-500">
              <li className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                <Mail size={14} /> lalstudio.co@gmail.com
              </li>
              {/* Added Mobile Numbers */}
              <li className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                <Phone size={14} /> +94 78 291 8452
              </li>
              <li className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                <Phone size={14} /> +94 77 743 5636
              </li>
              <li className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                Ambalangoda, Sri Lanka <ArrowUpRight size={14} />
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-600 font-bold">
            &copy; {currentYear} LAL STUDIO &mdash; ENGINEERED IN SRI LANKA
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-gray-600">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}