import Card from "@/components/Card"

export default function ItemList({
  items,
  isHydrated,
  onEdit,
  onDelete,
}) {
  if (!isHydrated) {
    return (
      <div className="mt-4">
        <p className="text-center text-sm text-gray-400">
          불러오는 중...
        </p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mt-4">
        <p className="text-center text-sm text-gray-500">
          아직 등록된 아이템이 없습니다
        </p>
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <Card key={item.id}>
          <div className="flex items-center justify-between gap-3">
            <span>{item.name}</span>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(item)}
                className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
              >
                수정
              </button>

              <button
                onClick={() => onDelete(item.id)}
                className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
              >
                삭제
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}