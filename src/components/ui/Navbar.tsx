import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl flex justify-between items-center px-8 py-5 glass-card">
      <Link href="/" className="font-bold tracking-tighter text-2xl italic hover:opacity-70 transition-opacity">
        LAL STUDIO
      </Link>
      
      <div className="flex gap-10 text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400">
        <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
        <Link href="/services" className="hover:text-white transition-colors">Services</Link>
        <Link href="/about" className="hover:text-white transition-colors">About</Link>
        <Link href="/booking" className="text-white border-b border-white/30 pb-1 hover:border-white transition-all">Book Now</Link>
      </div>
    </nav>
  );
}