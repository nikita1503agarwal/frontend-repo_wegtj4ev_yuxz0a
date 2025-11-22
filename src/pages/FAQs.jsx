import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function FAQs() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    api('/api/faqs').then(setFaqs).catch(() => setFaqs([]));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        <div className="divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {faqs.map((f, i) => (
            <details key={i} className="group">
              <summary className="cursor-pointer bg-white/5 hover:bg-white/10 transition px-6 py-4 font-medium">
                {f.q}
              </summary>
              <div className="px-6 py-4 text-gray-300">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
