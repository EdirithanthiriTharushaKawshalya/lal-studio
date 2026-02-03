import Scene from "@/components/3d/Scene";
import Link from "next/link";
import { ArrowRight, Camera, Cpu, Layers, Facebook } from "lucide-react";

export default function Home() {
  return (
    <main className="relative bg-transparent overflow-x-hidden">

      {/* Hero Section: Removed the gradient-to-r overlay entirely */}
      <section className="relative z-10 pt-32 pb-8 md:pt-48 md:pb-30 flex items-center pl-8 md:pl-80 px-8 md:px-24">
        <div className="max-w-4xl md:pl-20">
          {/* Prestige Badge */}
          <div className="flex items-center gap-3 mb-6 opacity-40">
            <span className="h-px w-6 bg-white"></span>
            <p className="text-[9px] uppercase tracking-[0.4em] font-bold">
              Ambalangoda, SL — Est. 1982
            </p>
          </div>
          {/* Branding */}
          <h1 className="text-6xl md:text-[7.5rem] font-bold text-white tracking-tighter leading-[0.85] mb-10">
            LAL <br /> STUDIO
          </h1>
          {/* Description */}
          <div className="space-y-2 mb-12">
            <p className="text-gray-400 text-sm md:text-lg uppercase tracking-[0.3em] font-light leading-snug">
              Engineering light.
            </p>
            <p className="text-gray-400 text-sm md:text-lg uppercase tracking-[0.3em] font-light leading-snug">
              Capturing raw emotion.
            </p>
            <p className="text-gray-600 text-[10px] md:text-xs max-w-[280px] mt-6 leading-relaxed font-light lowercase italic opacity-80">
              Where four decades of optical mastery meets modern digital
              alchemy.
            </p>
          </div>
          {/* CTA Group */}
          <div className="flex flex-wrap gap-8 items-center">
            <Link
              href="/portfolio"
              className="glass-button !px-6 !py-2.5 inline-flex items-center gap-4 group"
            >
              Explore Portfolio
              <ArrowRight
                size={16}
                className="group-hover:translate-x-2 transition-transform"
              />
            </Link>

            <Link
              href="/booking"
              className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-1"
            >
              Request Session
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-0 left-8 md:left-24 flex flex-col items-center gap-3 opacity-20 translate-y-full">
          <p className="text-[8px] uppercase tracking-[0.5em] [writing-mode:vertical-lr] font-bold text-white">
            Scroll
          </p>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Section 1: Philosophy - Tight spacing */}
      <section className="py-12 flex items-center justify-center px-4 md:px-12 relative z-10">
        <div className="glass-card p-12 md:p-24 max-w-5xl border-white/5 bg-white/[0.01]">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-10">
            The Philosophy
          </h2>
          <p className="text-3xl md:text-6xl font-medium tracking-tight leading-tight text-white">
            We don't just take pictures. We{" "}
            <span className="text-white italic">engineer</span> light to capture
            the raw architecture of emotion.
          </p>
        </div>
      </section>

      {/* Section 2: Technical Specs - Tight spacing */}
      <section className="py-12 flex items-center justify-center px-8 md:px-24 relative z-10">
        <div className="glass-card p-12 md:p-20 max-w-5xl border-white/5 bg-white/[0.01]">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-16">
            Technical Infrastructure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/40 transition-all">
                <Camera className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                Optical Precision
              </h3>
              <p className="text-gray-400 leading-relaxed font-light text-sm">
                Ultra-high resolution glass ensuring clinical clarity in every
                frame.
              </p>
            </div>

            <div className="space-y-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/40 transition-all">
                <Cpu className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                Digital Alchemy
              </h3>
              <p className="text-gray-400 leading-relaxed font-light text-sm">
                Advanced post-production workflows treated with analog respect.
              </p>
            </div>

            <div className="space-y-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/40 transition-all">
                <Layers className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                Set Engineering
              </h3>
              <p className="text-gray-400 leading-relaxed font-light text-sm">
                Custom lighting rigs built to support unique project narratives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Facebook Connect - Tight spacing */}
      <section className="py-12 flex items-center justify-center px-8 md:px-24 relative z-10">
        <div className="glass-card p-12 md:p-24 max-w-5xl border-white/5 bg-white/[0.01] w-full flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-left">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-6 font-black">
              Community
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-white leading-none">
              JOIN OUR <br /> COMMUNITY
            </h3>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Connect with us on Facebook to see behind-the-scenes content, live
              shoots, and our latest studio updates.
            </p>
          </div>
          <Link
            href="https://facebook.com"
            target="_blank"
            className="group flex flex-col items-center justify-center p-12 aspect-square rounded-[3rem] bg-white text-black hover:scale-105 transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <Facebook size={60} fill="black" className="mb-4" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-black">
              Follow Us
            </span>
          </Link>
        </div>
      </section>

      {/* Section 4: Final Call to Action */}
      <section className="py-24 flex flex-col items-center justify-center text-center px-8 md:px-24 relative z-10">
        <div className="glass-card p-16 md:p-20 max-w-5xl border-white/5 w-full bg-white/[0.01]">
          <h2 className="text-6xl md:text-6xl font-bold tracking-tighter mb-12 text-white">
            READY TO BEGIN?
          </h2>
          <p className="text-gray-500 text-md uppercase tracking-[0.4em] font-light mb-14">
            Consult with the studio to bring your vision into focus.
          </p>
          <Link
            href="/booking"
            className="inline-block px-16 py-6 bg-white text-black rounded-full font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </main>
  );
}