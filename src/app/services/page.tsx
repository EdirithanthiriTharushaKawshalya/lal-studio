"use client";
import { motion } from 'framer-motion';

const services = [
  {
    title: "EDITORIAL",
    detail: "High-concept imagery for brands and publications. We manage the entire narrative from set design to final grade.",
    tag: "Commercial"
  },
  {
    title: "PORTRAITURE",
    detail: "Technical headshots and character studies. Focused on the architecture of the human face.",
    tag: "Individual"
  },
  {
    title: "PRODUCT",
    detail: "Macro photography for high-end objects. Highlighting mechanical beauty and material integrity.",
    tag: "Technical"
  },
  {
    title: "ARCHITECTURAL",
    detail: "Capturing the interplay between light and structure. Precision-focused spatial documentation.",
    tag: "Space"
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        <header className="mb-24 text-center">
          <h1 className="text-7xl font-bold tracking-tighter mb-4">CAPABILITIES</h1>
          <p className="text-gray-600 uppercase tracking-[0.4em] text-[10px]">What we do best</p>
        </header>

        <div className="border-t border-white/10">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="group border-b border-white/10 py-16 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-white/[0.01] px-8 transition-colors cursor-default"
            >
              <div className="max-w-md">
                <span className="text-[10px] text-gray-600 font-mono mb-2 block">{service.tag}</span>
                <h3 className="text-4xl font-bold tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.detail}
                </p>
              </div>
              <div className="mt-8 md:mt-0">
                <a href="/booking" className="text-[10px] uppercase font-bold tracking-widest border-b border-white/20 pb-1 hover:border-white transition-all">
                  Inquire
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}