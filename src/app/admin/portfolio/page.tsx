"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PortfolioManager() {
  const [loading, setLoading] = useState(false);

  async function handleAddPhoto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // In a real scenario, you'd upload the file to Supabase Storage first.
    // For now, we'll manually enter the URL we got from the storage bucket.
    const newPhoto = {
      title: formData.get('title'),
      category: formData.get('category'),
      image_url: formData.get('url'),
    };

    const { error } = await supabase.from('portfolio').insert([newPhoto]);
    if (!error) window.location.reload();
    setLoading(false);
  }

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold tracking-tighter">GALLERY MANAGER</h1>

      <form onSubmit={handleAddPhoto} className="glass-card p-8 max-w-xl space-y-6">
        <h2 className="font-bold text-lg">Add New Work</h2>
        <input name="title" placeholder="Project Title" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl" required />
        <select name="category" className="w-full bg-neutral-900 border border-white/10 p-4 rounded-xl appearance-none">
          <option>Editorial</option>
          <option>Portrait</option>
          <option>Product</option>
        </select>
        <input name="url" placeholder="Supabase Image URL" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl" required />
        <button className="w-full py-4 bg-white text-black font-black uppercase text-xs rounded-xl hover:scale-95 transition-all">
          {loading ? "Adding..." : "Publish to Portfolio"}
        </button>
      </form>
    </div>
  );
}