"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export default function PortfolioManager() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [status, setStatus] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  
  // Custom Dropdown State
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    "Birthday", "Portrait", "Commercial", "Wedding", 
    "Engagement", "Event", "Graduation", "Official Documentation", "Product"
  ];

  // Fetch all gallery items from Supabase
  async function fetchAssets() {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setItems(data || []);
  }

  useEffect(() => { 
    fetchAssets();
    // Close dropdown when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerStatus = (msg: string, type: 'success' | 'error' = 'success') => {
    setStatus({ msg, type });
    setTimeout(() => setStatus(null), 4000);
  };

  async function handlePublish(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;
    const title = formData.get('title');

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: storageError } = await supabase.storage.from('portfolio').upload(fileName, file);
      if (storageError) throw storageError;

      const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(fileName);
      const { error: dbError } = await supabase.from('portfolio').insert([{
        title, 
        category: selectedCategory, // Using state instead of formData
        image_url: urlData.publicUrl,
      }]);
      if (dbError) throw dbError;

      triggerStatus("Asset Synced to Cloud");
      fetchAssets(); // Refresh grid
      (e.target as HTMLFormElement).reset();
      setSelectedCategory("");
    } catch (err: any) {
      triggerStatus(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  // Purely Bespoke Delete Function
  async function deleteAsset(id: number, imageUrl: string) {
    try {
      // 1. Extract filename from URL to delete from Storage
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        await supabase.storage.from('portfolio').remove([fileName]);
      }

      // 2. Remove from Database
      const { error } = await supabase.from('portfolio').delete().eq('id', id);
      if (error) throw error;

      setItems(prev => prev.filter(item => item.id !== id));
      triggerStatus("Asset Purged Successfully");
    } catch (err: any) {
      triggerStatus("Purge Failed: " + err.message, "error");
    }
  }

  return (
    <div className="space-y-24 pb-40">
      {/* Toast Notification */}
      <AnimatePresence>
        {status && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className={`fixed bottom-10 right-10 z-50 px-6 py-4 rounded-xl border backdrop-blur-md text-[10px] font-mono uppercase tracking-widest ${
              status.type === 'success' 
                ? 'bg-white/5 border-white/10 text-white' 
                : 'bg-red-500/10 border-red-500/20 text-red-500'
            }`}
          >
            {status.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="border-l border-white/10 pl-8">
        <h1 className="text-6xl font-bold tracking-tighter italic">GALLERY</h1>
        <p className="text-neutral-500 text-[10px] uppercase tracking-[0.4em] mt-2 font-mono">Archive System v2.4</p>
      </header>

      {/* Upload Form Section */}
      <form onSubmit={handlePublish} className="max-w-2xl bg-white/[0.02] border border-white/5 p-12 rounded-3xl space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-mono">Visual Title</label>
            <input 
              name="title" 
              required 
              className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-white transition-all text-white" 
            />
          </div>

          {/* BEAUTIFUL CUSTOM DROPDOWN */}
          <div className="space-y-2 relative" ref={dropdownRef}>
            <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-mono">Asset Category</label>
            
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex justify-between items-center bg-transparent border-b border-white/10 py-2 outline-none text-left group transition-all"
            >
              <span className={`text-sm ${selectedCategory ? 'text-white' : 'text-neutral-500'}`}>
                {selectedCategory || "Select a category"}
              </span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-500 ${isOpen ? 'rotate-180 text-white' : 'text-neutral-600'}`} 
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 right-0 mt-4 z-50 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl"
                >
                  <div className="max-h-60 overflow-y-auto scrollbar-hide py-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-[11px] uppercase tracking-widest flex justify-between items-center transition-all ${
                          selectedCategory === cat 
                            ? 'bg-white/10 text-white' 
                            : 'text-neutral-500 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {cat}
                        {selectedCategory === cat && <Check className="w-3 h-3" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-mono">Source File</label>
          <input 
            name="image" 
            type="file" 
            accept="image/*" 
            required 
            className="w-full text-[10px] text-neutral-500 file:bg-white/5 file:text-white file:border-0 file:rounded-full file:px-4 file:py-2 file:mr-4 hover:file:bg-white/10 transition-all" 
          />
        </div>

        <button 
          disabled={loading} 
          className="w-full py-6 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] rounded-full hover:scale-[0.99] active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? "ARCHIVING..." : "PUBLISH TO CLOUD"}
        </button>
      </form>

      {/* Live Asset Grid Section */}
      <section className="space-y-10">
        <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-500 font-mono">Live Asset Grid</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div 
                key={item.id} 
                layout
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/5"
              >
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <p className="text-[10px] font-bold text-white truncate">{item.title}</p>
                  <p className="text-[8px] text-white/40 uppercase mb-4">{item.category}</p>
                  <button 
                    onClick={() => deleteAsset(item.id, item.image_url)}
                    className="w-full py-2 bg-red-600 text-white text-[8px] font-black uppercase tracking-widest rounded-lg hover:bg-red-500 transition-colors"
                  >
                    Purge Asset
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}