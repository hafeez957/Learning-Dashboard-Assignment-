export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-spin" />
        <p className="text-gray-400">Loading dashboard...</p>
      </div>
    </div>
  );
}