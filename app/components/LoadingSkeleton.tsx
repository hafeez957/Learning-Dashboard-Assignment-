export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="mb-8">
        <div className="h-12 w-64 bg-gray-800 rounded-lg animate-pulse" />
        <div className="h-4 w-48 bg-gray-800 rounded-lg mt-2 animate-pulse" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-900/50 rounded-2xl p-6 h-64 animate-pulse"
          >
            <div className="w-12 h-12 bg-gray-800 rounded-xl mb-4" />
            <div className="h-5 bg-gray-800 rounded-lg w-3/4 mb-2" />
            <div className="h-4 bg-gray-800 rounded-lg w-1/2 mb-4" />
            <div className="h-2 bg-gray-800 rounded-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}