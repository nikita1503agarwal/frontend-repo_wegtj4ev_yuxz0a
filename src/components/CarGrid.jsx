import { useEffect, useMemo, useState } from 'react';
import { Fuel, Gauge, Users, Cog, ArrowRight } from 'lucide-react';
import { api } from '../lib/api';

export default function CarGrid() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ q: '', type: '', brand: '', transmission: '', fuel_type: '', seats: '', min_price: '', max_price: '', sort: 'popular' });

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== '' && v !== null && v !== undefined) params.append(k, v);
    });
    api(`/api/cars?${params.toString()}`, { signal: controller.signal })
      .then(setCars)
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [filters]);

  const unique = useMemo(() => ({
    brands: Array.from(new Set(cars.map(c => c.brand))).sort(),
    types: Array.from(new Set(cars.map(c => c.type))).sort(),
  }), [cars]);

  function updateFilter(k, v) {
    setFilters(prev => ({ ...prev, [k]: v }));
  }

  return (
    <section id="browse" className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <input placeholder="Search cars, brand, model" className="bg-black/60 border border-white/10 rounded-xl px-3 py-2" value={filters.q} onChange={e => updateFilter('q', e.target.value)} />
            <select className="bg-black/60 border border-white/10 rounded-xl px-3 py-2" value={filters.type} onChange={e => updateFilter('type', e.target.value)}>
              <option value="">All Types</option>
              {unique.types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select className="bg-black/60 border border-white/10 rounded-xl px-3 py-2" value={filters.brand} onChange={e => updateFilter('brand', e.target.value)}>
              <option value="">All Brands</option>
              {unique.brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <select className="bg-black/60 border border-white/10 rounded-xl px-3 py-2" value={filters.sort} onChange={e => updateFilter('sort', e.target.value)}>
              <option value="popular">Most Popular</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
          <div className="grid md:grid-cols-4 gap-4 mt-4">
            <select className="bg-black/60 border border-white/10 rounded-xl px-3 py-2" value={filters.transmission} onChange={e => updateFilter('transmission', e.target.value)}>
              <option value="">Any Transmission</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
            <select className="bg-black/60 border border-white/10 rounded-xl px-3 py-2" value={filters.fuel_type} onChange={e => updateFilter('fuel_type', e.target.value)}>
              <option value="">Any Fuel</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <input type="number" placeholder="Min Price" className="bg-black/60 border border-white/10 rounded-xl px-3 py-2" value={filters.min_price} onChange={e => updateFilter('min_price', e.target.value)} />
            <input type="number" placeholder="Max Price" className="bg-black/60 border border-white/10 rounded-xl px-3 py-2" value={filters.max_price} onChange={e => updateFilter('max_price', e.target.value)} />
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading cars...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map(car => (
              <a key={car.id} href={`/cars/${car.id}`} className="group rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.03] border border-white/10 p-4 hover:from-white/10 hover:to-white/5 transition block">
                <div className="aspect-[16/9] rounded-xl bg-black/60 overflow-hidden mb-4 relative">
                  <img src={car.images?.[0]} alt={car.title} className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{car.title}</h3>
                    <p className="text-sm text-gray-400">{car.brand} • {car.model}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-fuchsia-400 font-semibold">${car.price_per_day}/day</p>
                    <p className="text-xs text-gray-400">{car.transmission} • {car.seats} seats</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-4 text-gray-300 text-sm">
                  <div className="flex items-center gap-1"><Cog size={16}/> {car.transmission}</div>
                  <div className="flex items-center gap-1"><Users size={16}/> {car.seats}</div>
                  <div className="flex items-center gap-1"><Fuel size={16}/> {car.fuel_type}</div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-fuchsia-400">
                  Book Now <ArrowRight size={16} />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
