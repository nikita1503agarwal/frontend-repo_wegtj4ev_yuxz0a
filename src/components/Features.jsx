import { ShieldCheck, Clock, Stars, Headphones } from 'lucide-react';

const items = [
  { icon: ShieldCheck, title: 'Trusted & Insured', desc: 'Fully insured fleet with transparent pricing and no hidden fees.' },
  { icon: Clock, title: 'Fast & Flexible', desc: 'Instant confirmation, easy changes, and 24/7 pickup options.' },
  { icon: Stars, title: 'Premium Fleet', desc: 'Curated selection of luxury and performance vehicles.' },
  { icon: Headphones, title: '24/7 Support', desc: 'Real humans. Real help—whenever you need it.' },
];

export default function Features() {
  return (
    <section id="why" className="relative bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Why choose us</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
              <Icon className="text-fuchsia-400 mb-4" />
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
