"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  async function getBookings() {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setBookings(data || []);
    setLoading(false);
  }

  // Show a temporary toast notification
  const triggerToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  async function updateStatus(id: number, currentStatus: string) {
    const nextStatus = currentStatus === 'confirmed' ? 'pending' : 'confirmed';
    const { error } = await supabase.from('bookings').update({ status: nextStatus }).eq('id', id);
    
    if (!error) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: nextStatus } : b));
      triggerToast(`Inquiry #${id} updated to ${nextStatus}`);
    }
  }

  async function confirmDelete() {
    if (!deleteConfirm) return;
    const { error } = await supabase.from('bookings').delete().eq('id', deleteConfirm);
    
    if (!error) {
      setBookings(prev => prev.filter(b => b.id !== deleteConfirm));
      triggerToast("Record successfully purged", 'success');
    } else {
      triggerToast("Purge failed: System error", 'error');
    }
    setDeleteConfirm(null);
  }

  useEffect(() => { getBookings(); }, []);

  return (
    <div className="space-y-16 relative">
      {/* Toast Notification Interface */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed bottom-10 right-10 z-[100] px-6 py-4 rounded-xl border backdrop-blur-xl flex items-center gap-4 ${
              notification.type === 'success' ? 'bg-white/5 border-white/10 text-white' : 'bg-red-500/10 border-red-500/20 text-red-500'
            }`}
          >
            <div className={`w-2 h-2 rounded-full animate-pulse ${notification.type === 'success' ? 'bg-white' : 'bg-red-500'}`} />
            <span className="text-[10px] font-mono uppercase tracking-widest">{notification.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal Interface */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 p-10 rounded-3xl text-center space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold italic tracking-tighter">PURGE RECORD?</h2>
                <p className="text-neutral-500 text-[10px] uppercase tracking-widest font-mono">This action will permanently delete Inquiry #{deleteConfirm}.</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-4 rounded-full border border-white/5 text-[10px] uppercase font-black hover:bg-white/5 transition-all tracking-widest">Cancel</button>
                <button onClick={confirmDelete} className="flex-1 py-4 rounded-full bg-red-600 text-white text-[10px] uppercase font-black hover:bg-red-700 transition-all tracking-widest">Confirm Purge</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header className="border-l border-white/10 pl-8">
        <h1 className="text-6xl font-bold tracking-tighter italic uppercase">Inquiries</h1>
        <p className="text-neutral-500 text-[10px] uppercase tracking-[0.4em] mt-2 font-mono">Legacy Management / Est. 1982</p>
      </header>

      <div className="grid gap-6">
        {loading ? (
          <div className="py-20 text-center text-white/20 font-mono text-[10px] uppercase tracking-widest animate-pulse">Syncing...</div>
        ) : (
          <AnimatePresence mode="popLayout">
            {bookings.map((b, i) => (
              <motion.div 
                key={b.id} layout
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                className="group bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.04] transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono text-white/20">#{b.id.toString().padStart(4, '0')}</span>
                      <h3 className="text-2xl font-bold tracking-tight">{b.client_name}</h3>
                      <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        b.status === 'confirmed' ? 'bg-white text-black' : 'bg-white/10 text-white/40'
                      }`}>
                        {b.status || 'pending'}
                      </div>
                    </div>
                    <p className="text-neutral-400 font-mono text-xs">{b.email} — {b.booking_date}</p>
                    <div className="bg-black/40 p-6 rounded-xl border border-white/5 text-sm text-neutral-300 leading-relaxed italic">
                      "{b.message || "No project brief provided."}"
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between items-end gap-4">
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(b.id, b.status)} className="px-6 py-3 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-white hover:text-black transition-all">
                        {b.status === 'confirmed' ? 'Mark Pending' : 'Confirm'}
                      </button>
                      <button onClick={() => setDeleteConfirm(b.id)} className="px-6 py-3 border border-white/5 text-red-500/40 rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-red-500 hover:text-white transition-all">
                        Delete
                      </button>
                    </div>
                    <span className="text-[9px] text-neutral-700 font-mono italic">RECEIVED: {new Date(b.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}