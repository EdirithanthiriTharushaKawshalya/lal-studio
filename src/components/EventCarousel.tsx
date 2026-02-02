"use client";
import { motion } from "framer-motion";

interface Album {
  title: string;
  image_url: string;
  facebook_url: string;
  category: string;
}

export default function EventCarousel({ albums }: { albums: Album[] }) {
  // We double the array to ensure the loop is seamless
  const loopData = [...albums, ...albums];

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-6 mb-10">
        <h2 className="text-4xl font-bold tracking-tighter uppercase italic">Featured Facebook Albums</h2>
      </div>

      <div className="relative flex">
        <motion.div
          className="flex gap-6 pr-6"
          animate={{ x: [0, -1000] }} // Adjust -1000 based on total width
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {loopData.map((album, idx) => (
            <a
              key={idx}
              href={album.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[350px] group relative rounded-3xl overflow-hidden bg-[#0a0c14] border border-white/5"
            >
              <div className="relative h-60 w-full">
                <img 
                  src={album.image_url} 
                  alt={album.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-bold text-white">
                  {album.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{album.title}</h3>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  View on Facebook
                </div>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}