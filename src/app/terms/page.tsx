import React from 'react';

export default function TermsOfService() {
  return (
    <main className="pt-40 pb-20 bg-[#02040a] min-h-screen text-white">
      <div className="container mx-auto px-8 md:px-24">
        <div className="glass-card p-12 md:p-16 border-white/5 bg-white/[0.01]">
          <h1 className="text-5xl font-bold italic tracking-tighter mb-12">TERMS OF SERVICE</h1>
          
          <div className="space-y-12 text-gray-400 leading-relaxed max-w-4xl">
            <section>
              <h2 className="text-white text-lg font-bold uppercase tracking-widest mb-4">01. Booking & Deposits</h2>
              <p>
                A non-refundable deposit is required to secure your date. Remaining balances must be cleared 
                on or before the day of the shoot.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-bold uppercase tracking-widest mb-4">02. Cancellation</h2>
              <p>
                Cancellations made within 48 hours of the event will result in a total loss of the deposit. 
                Rescheduling is subject to studio availability.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-bold uppercase tracking-widest mb-4">03. Delivery</h2>
              <p>
                Standard post-production time is 2-4 weeks. High-resolution digital files will be delivered 
                via a secure online gallery.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}