export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
        <div className="text-3xl md:text-4xl text-gray-700 font-semibold tracking-wide animate-pulse">Loading...</div>
        <p className="text-lg md:text-xl text-gray-500 font-medium">잠시만 기다려주세요</p>
      </div>
    </div>
  );
}
