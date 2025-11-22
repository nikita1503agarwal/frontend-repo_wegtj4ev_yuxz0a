import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { Fuel, Users, Gauge, CalendarCheck2, Star, ArrowLeft } from 'lucide-react';

function formatMoney(n) { return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n); }

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState({ pickup_date: '', dropoff_date: '' });
  const [customer, setCustomer] = useState({ user_name: '', email: '', phone: '' });
  const [booking, setBooking] = useState({ status: 'idle', total: 0, id: null, error: null });

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api(`/api/cars/${id}`),
      api(`/api/reviews?car_id=${id}`),
    ]).then(([c, rs]) => { setCar(c); setReviews(rs); }).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  const days = useMemo(() => {
    if (!dates.pickup_date || !dates.dropoff_date) return 0;
    const d1 = new Date(dates.pickup_date);
    const d2 = new Date(dates.dropoff_date);
    const diff = Math.round((d2 - d1) / (1000*60*60*24));
    return Math.max(0, diff);
  }, [dates]);

  const total = useMemo(() => car ? Math.max(0, days * car.price_per_day) : 0, [days, car]);

  async function submitBooking(e) {
    e.preventDefault();
    setBooking({ status: 'submitting', total: 0, id: null, error: null });
    try {
      const payload = { ...customer, pickup_date: dates.pickup_date, dropoff_date: dates.dropoff_date, car_id: id };
      const res = await api('/api/bookings', { method: 'POST', body: JSON.stringify(payload) });
      setBooking({ status: 'confirmed', total: res.total_cost, id: res.id, error: null });
    } catch (err) {
      setBooking({ status: 'error', total: 0, id: null, error: err.message });
    }
  }

  async function submitReview(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = { car_id: id, user_name: form.get('name'), rating: Number(form.get('rating')), comment: form.get('comment') };
    try {
      await api('/api/reviews', { method: 'POST', body: JSON.stringify(payload) });
      const rs = await api(`/api/reviews?car_id=${id}`);
      setReviews(rs);
      e.currentTarget.reset();
    } catch {}
  }

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  if (!car) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Car not found</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <a href="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6"><ArrowLeft size={18}/> Back</a>
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-black/60">
                <Gallery images={car.images || []} />
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-semibold mb-3">Specifications</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300">
                <Spec icon={Gauge} label="Year" value={car.year} />
                <Spec icon={Users} label="Seats" value={car.seats} />
                <Spec icon={Fuel} label="Fuel" value={car.fuel_type} />
                <Spec icon={Gauge} label="Transmission" value={car.transmission} />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-semibold mb-3">Customer reviews</h3>
              <div className="space-y-4">
                {reviews.length === 0 && <p className="text-gray-400 text-sm">No reviews yet.</p>}
                {reviews.map(r => (
                  <div key={r.id} className="border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{r.user_name}</p>
                      <div className="flex items-center gap-1 text-fuchsia-400">{Array.from({length: r.rating}).map((_,i)=>(<Star key={i} size={16} fill="currentColor"/>))}</div>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">{r.comment}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={submitReview} className="mt-4 grid sm:grid-cols-4 gap-3">
                <input name="name" required placeholder="Your name" className="sm:col-span-2 bg-black/60 border border-white/10 rounded-xl px-3 py-2"/>
                <select name="rating" required className="bg-black/60 border border-white/10 rounded-xl px-3 py-2">
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </select>
                <button className="bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl px-4 py-2">Submit</button>
                <textarea name="comment" placeholder="Write a short review" className="sm:col-span-4 bg-black/60 border border-white/10 rounded-xl px-3 py-2"/>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sticky top-6">
              <h1 className="text-2xl font-bold">{car.title}</h1>
              <p className="text-gray-400">{car.brand} • {car.model}</p>
              <div className="mt-4 text-fuchsia-400 text-xl font-semibold">{formatMoney(car.price_per_day)}/day</div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2"><CalendarCheck2 size={18}/> Booking</h3>
                <form onSubmit={submitBooking} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="date" required value={dates.pickup_date} onChange={e=>setDates(d=>({...d, pickup_date:e.target.value}))} className="bg-black/60 border border-white/10 rounded-xl px-3 py-2" />
                    <input type="date" required value={dates.dropoff_date} onChange={e=>setDates(d=>({...d, dropoff_date:e.target.value}))} className="bg-black/60 border border-white/10 rounded-xl px-3 py-2" />
                  </div>
                  <input required placeholder="Full name" value={customer.user_name} onChange={e=>setCustomer(c=>({...c, user_name:e.target.value}))} className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2" />
                  <input required type="email" placeholder="Email" value={customer.email} onChange={e=>setCustomer(c=>({...c, email:e.target.value}))} className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2" />
                  <input placeholder="Phone" value={customer.phone} onChange={e=>setCustomer(c=>({...c, phone:e.target.value}))} className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2" />
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>{days} days</span>
                    <span className="text-white font-medium">{formatMoney(total)}</span>
                  </div>
                  <button disabled={booking.status==='submitting'} className="w-full uppercase tracking-wide bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-xl font-medium transition">
                    {booking.status==='submitting' ? 'Processing...' : 'Book Now'}
                  </button>
                  {booking.status==='confirmed' && (
                    <div className="text-sm text-green-400">Booking confirmed! ID: {booking.id}. Total: {formatMoney(booking.total)}</div>
                  )}
                  {booking.status==='error' && (
                    <div className="text-sm text-red-400">{booking.error}</div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between bg-black/40 rounded-xl px-4 py-3">
      <div className="flex items-center gap-2 text-gray-300"><Icon size={16}/> {label}</div>
      <div className="text-white font-medium">{value}</div>
    </div>
  );
}

function Gallery({ images }) {
  const [i, setI] = useState(0);
  function prev() { setI((i - 1 + images.length) % images.length); }
  function next() { setI((i + 1) % images.length); }
  useEffect(() => { const id = setInterval(next, 4000); return () => clearInterval(id); });
  if (!images || images.length === 0) return <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>;
  return (
    <div className="relative w-full h-full">
      <img src={images[i]} alt="car" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${idx===i?'w-6 bg-fuchsia-500':'w-3 bg-white/40'}`} />
        ))}
      </div>
    </div>
  );
}
