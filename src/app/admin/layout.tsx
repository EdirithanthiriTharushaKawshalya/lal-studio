"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Inquiries", href: "/admin" },
    { name: "Portfolio", href: "/admin/portfolio" },
    { name: "Live Site", href: "/" },
  ];

  return (
    <div className="min-h-screen bg-[#02040a] text-white selection:bg-white selection:text-black">
      {/* Cinematic Sidebar/Nav */}
      <nav className="fixed left-0 top-0 h-full w-20 border-r border-white/5 flex flex-col items-center py-10 gap-12 bg-black z-50">
        <div className="flex flex-col items-center gap-1">
          <span className="font-bold tracking-tighter italic text-2xl">L</span>
          <span className="bg-white text-[8px] text-black px-1 font-black">ADMIN</span>
        </div>
        
        <div className="flex flex-col gap-8 flex-1 justify-center">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`rotate-180 [writing-mode:vertical-lr] text-[10px] uppercase tracking-[0.4em] transition-all ${
                pathname === item.href ? "text-white font-black" : "text-neutral-600 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      <main className="pl-20 min-h-screen">
        <div className="p-8 md:p-16 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}