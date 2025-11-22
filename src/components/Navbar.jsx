import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-4 flex items-center justify-between">
        <a href="/" className="text-white font-semibold text-lg">Vitesse</a>
        <button onClick={() => setOpen(!open)} className="text-white p-2 rounded-lg bg-white/10 hover:bg-white/20">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="mx-auto max-w-7xl px-6 sm:px-10 pb-6">
          <div className="rounded-2xl bg-black/70 backdrop-blur border border-white/10 p-6 text-white space-y-3">
            <a href="#browse" className="block hover:text-fuchsia-400">Browse Cars</a>
            <a href="#why" className="block hover:text-fuchsia-400">Why Us</a>
            <a href="#deals" className="block hover:text-fuchsia-400">Deals</a>
            <a href="#contact" className="block hover:text-fuchsia-400">Contact</a>
          </div>
        </nav>
      )}
    </header>
  );
}
