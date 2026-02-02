"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    async function getBookings() {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setBookings(data);
    }
    getBookings();
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter">CLIENT INQUIRIES</h1>
        <p className="text-neutral-500 text-sm mt-2">Manage your incoming photography sessions.</p>
      </header>

      <div className="overflow-hidden rounded-3xl border border-white/5 bg-neutral-900/30">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-neutral-500">
              <th className="p-6">Client</th>
              <th className="p-6">Service</th>
              <th className="p-6">Date</th>
              <th className="p-6">Status</th>
              <th className="p-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {bookings.map((b) => (
              <tr key={b.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="p-6">
                  <div className="font-bold">{b.client_name}</div>
                  <div className="text-xs text-neutral-500">{b.email}</div>
                </td>
                <td className="p-6 uppercase text-[10px] tracking-widest">{b.service_type}</td>
                <td className="p-6 text-neutral-400">{b.booking_date}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    b.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="p-6">
                  <button className="text-[10px] uppercase font-bold text-white hover:underline underline-offset-4">Confirm</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}