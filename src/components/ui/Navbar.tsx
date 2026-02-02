"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Book Now', href: '/booking', isBtn: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-6xl">
      <div className="glass-card px-8 py-5 flex justify-between items-center">
        <Link href="/" className="font-bold tracking-tighter text-xl italic">LAL STUDIO</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className={link.isBtn ? "text-white" : "hover:text-white transition-colors"}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Evoke Style Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 w-full glass-card border-white/10 p-6 mt-2 overflow-hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-[10px] uppercase tracking-[0.3em] font-bold ${link.isBtn ? "text-white bg-white/10 py-4 rounded-2xl" : "text-gray-400"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}