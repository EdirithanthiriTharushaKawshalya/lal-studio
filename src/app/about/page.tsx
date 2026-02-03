"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AboutPage() {
  const [content, setContent] = useState<any[]>([]);
  const containerRef = useRef(null);
  
  // Scroll Progress for Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const { data, error } = await supabase
          .from('about_content')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (!error) setContent(data || []);
      } catch (err) {
        console.error("Error loading about content:", err);
      }
    }
    fetchAbout();
  }, []);

  // Content Filtering
  const philosophy = content.find(c => c.section_type === 'philosophy')?.content;
  const descriptions = content.filter(c => c.section_type === 'description');
  const stats = content.filter(c => c.section_type === 'stat');

  return (
    <main ref={containerRef} className="min-h-screen pt-40 pb-32 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* Left Section: The Statement */}
        <div className="lg:col-span-5 relative">
          <motion.div style={{ y: yParallax, opacity: opacityFade }} className="sticky top-40">
            <h1 className="text-8xl font-bold tracking-tighter leading-[0.8] mb-12 text-white">
              THE <br /> STUDIO
            </h1>
            <div className="h-px w-24 bg-white/20 mb-12" />
            <p className="text-gray-500 uppercase tracking-[0.3em] text-xs font-mono">
              Based in Sri Lanka. <br /> Serving Global Visions.
            </p>
          </motion.div>
        </div>

        {/* Right Section: The Philosophy */}
        <div className="lg:col-span-7 space-y-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl text-gray-200 leading-tight tracking-tight font-medium"
          >
            {philosophy || "Loading our philosophy..."}
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-500 leading-relaxed text-sm uppercase tracking-wider">
            {descriptions.length > 0 ? (
              descriptions.map((desc, i) => (
                <p key={i}>{desc.content}</p>
              ))
            ) : (
              <>
                <p className="animate-pulse bg-white/5 h-4 w-full rounded" />
                <p className="animate-pulse bg-white/5 h-4 w-full rounded" />
              </>
            )}
          </div>

          {/* Technical Stats Card */}
          <StatCard stats={stats} />
        </div>
      </div>
    </main>
  );
}

function StatCard({ stats }: { stats: any[] }) {
  // Fixed: useMotionValue is now properly imported
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-10, 10]), { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="p-12 flex flex-wrap gap-16 items-center border border-white/5 bg-white/[0.02] backdrop-blur-md rounded-2xl transition-colors hover:bg-white/[0.04]"
    >
      {stats.length > 0 ? (
        stats.map((stat, i) => (
          <div key={i}>
            <span className="block text-5xl font-bold text-white tracking-tighter italic">
              {stat.value}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black font-mono">
              {stat.content}
            </span>
          </div>
        ))
      ) : (
        <div className="w-full py-4 text-[10px] text-gray-800 uppercase tracking-widest font-mono">
          Initializing Optical Specs...
        </div>
      )}
    </motion.div>
  );
}