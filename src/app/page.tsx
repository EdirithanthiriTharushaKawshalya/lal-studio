import Scene from "@/components/3d/Scene";

export default function Home() {
  return (
    <main className="relative bg-transparent">
      {/* 3D Background */}
      <Scene />

      {/* Hero Content */}
      <section className="h-screen flex items-center px-10 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-8xl font-bold text-white tracking-tighter mb-4">
            LAL <br /> STUDIO
          </h1>
          <p className="text-gray-400 text-xl max-w-md">
            Capturing the essence of light through a technical lens. 
            Professional photography redefined.
          </p>
          <button className="glass-button mt-8">Explore Portfolio</button>
        </div>
      </section>

      {/* Blueprint / Technical Section */}
      <section className="h-screen flex items-center justify-end px-10 relative z-10">
        <div className="glass-card p-12 max-w-lg">
          <h2 className="text-3xl font-bold mb-4">The Technical Edge</h2>
          <p className="text-gray-400">
            Every shot is a masterpiece of engineering and art. We use the latest 
            optics to ensure your vision is captured with clinical precision.
          </p>
        </div>
      </section>
    </main>
  );
}