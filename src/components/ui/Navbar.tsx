import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl flex justify-between items-center px-10 py-5 glass-card">
      <Link href="/" className="font-bold tracking-tighter text-2xl italic">LAL STUDIO</Link>
      
      <div className="flex gap-12 text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400">
        <Link href="/portfolio" className="hover:text-white transition-colors">Works</Link>
        <Link href="/services" className="hover:text-white transition-colors">Services</Link>
        <Link href="/about" className="hover:text-white transition-colors">Studio</Link>
        <Link href="/booking" className="text-white border-b border-white/20 pb-1 hover:border-white transition-all">Booking</Link>
      </div>
    </nav>
  );
}