'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Something went wrong!</h2>
        <p className="text-gray-400">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}