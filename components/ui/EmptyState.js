export default function EmptyState({
  message = "데이터가 없습니다",
}) {
  return (
    <div className="mt-4 rounded-2xl border bg-white px-4 py-6 text-center">
      <p className="text-sm text-gray-500">
        {message}
      </p>
    </div>
  )
}