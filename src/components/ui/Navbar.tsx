export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="glass-card px-8 py-4 flex justify-between items-center">
        <span className="font-bold tracking-widest text-xl">LAL STUDIO</span>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
          <a href="#" className="hover:text-gray-400">Portfolio</a>
          <a href="#" className="hover:text-gray-400">Services</a>
          <a href="#" className="hover:text-gray-400">About</a>
          <a href="#" className="glass-button !py-2 !px-4 !text-xs">Book Now</a>
        </div>
      </div>
    </nav>
  );
}