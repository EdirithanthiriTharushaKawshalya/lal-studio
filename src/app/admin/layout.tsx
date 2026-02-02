export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-white selection:text-black">
      <nav className="border-b border-white/5 p-6 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <span className="font-bold tracking-tighter italic text-xl">LAL STUDIO</span>
          <span className="px-2 py-0.5 rounded bg-white text-[10px] text-black font-black uppercase">Admin</span>
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-neutral-500">
          <a href="/admin" className="hover:text-white transition-colors">Bookings</a>
          <a href="/admin/portfolio" className="hover:text-white transition-colors">Manage Portfolio</a>
          <a href="/" className="hover:text-white transition-colors">View Site</a>
        </div>
      </nav>
      <main className="p-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}