export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 border-t border-white/10" id="contact">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid sm:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold mb-3">Vitesse</h4>
          <p className="text-gray-400 text-sm">Premium car rentals with instant booking and concierge support.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#browse" className="hover:text-fuchsia-400">Browse Cars</a></li>
            <li><a href="#why" className="hover:text-fuchsia-400">Why Us</a></li>
            <li><a href="/faqs" className="hover:text-fuchsia-400">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <p className="text-sm text-gray-300">support@vitesse.rent</p>
          <p className="text-sm text-gray-300">+1 (555) 012-0110</p>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-500">© {new Date().getFullYear()} Vitesse Rentals. All rights reserved.</div>
    </footer>
  );
}
