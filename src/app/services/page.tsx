import Link from "next/link";

const services = [
  { name: "Editorial & Fashion", price: "Starts at $500", desc: "High-end studio photography for brands." },
  { name: "Portraiture", price: "Starts at $250", desc: "Professional headshots and personal branding." },
  { name: "Product Engineering", price: "Custom Quote", desc: "Technical 3D and macro photography." },
];

export default function ServicesPage() {
  return (
    <main className="pt-40 px-10 min-h-screen bg-black">
      <h1 className="text-6xl font-bold tracking-tighter mb-20 text-center">SERVICES</h1>
      <div className="max-w-4xl mx-auto space-y-4">
        {services.map((s, i) => (
          <div key={i} className="glass-card p-10 flex justify-between items-center group hover:bg-white/10 transition-all cursor-default">
            <div>
              <h3 className="text-2xl font-bold mb-2">{s.name}</h3>
              <p className="text-gray-500">{s.desc}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono text-gray-400 mb-4">{s.price}</p>
              <Link href="/booking" className="glass-button !py-2 !px-4 !text-[10px]">Select</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}