export default function NotFound(){
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <p className="text-gray-400">Page not found</p>
        <a href="/" className="mt-6 inline-block bg-white text-black px-5 py-3 rounded-xl">Back Home</a>
      </div>
    </div>
  )
}
