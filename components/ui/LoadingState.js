export default function LoadingState({
  message = "불러오는 중...",
}) {
  return (
    <div className="mt-4 rounded-2xl border bg-white px-4 py-6 text-center">
      <p className="text-sm text-gray-400">
        {message}
      </p>
    </div>
  )
}