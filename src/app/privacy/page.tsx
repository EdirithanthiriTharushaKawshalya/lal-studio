import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="pt-40 pb-20 bg-[#02040a] min-h-screen text-white">
      <div className="container mx-auto px-8 md:px-24">
        <div className="glass-card p-12 md:p-16 border-white/5 bg-white/[0.01]">
          <h1 className="text-5xl font-bold italic tracking-tighter mb-12">PRIVACY POLICY</h1>
          
          <div className="space-y-12 text-gray-400 leading-relaxed max-w-4xl">
            <section>
              <h2 className="text-white text-lg font-bold uppercase tracking-widest mb-4">01. Data Collection</h2>
              <p>
                LAL STUDIO collects personal information such as names, email addresses, and phone numbers when you 
                book a session or contact us. We also collect technical data via cookies to improve your browsing experience.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-bold uppercase tracking-widest mb-4">02. Use of Information</h2>
              <p>
                Your data is used exclusively to facilitate photography services, manage bookings, and communicate 
                project updates. We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-bold uppercase tracking-widest mb-4">03. Image Rights</h2>
              <p>
                LAL STUDIO retains ownership of all captured media unless otherwise agreed in writing. We may use 
                images for portfolio display on this website and social media channels.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}