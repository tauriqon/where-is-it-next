export default function EmptyState({
  message = "데이터가 없어요",
  description,
}) {
  return (
    <div className="mt-4 rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-10 text-center">
      <p className="text-base font-semibold text-gray-900">
        {message}
      </p>

      {description && (
        <p className="mt-2 text-sm leading-6 text-gray-500">
          {description}
        </p>
      )}
    </div>
  )
}