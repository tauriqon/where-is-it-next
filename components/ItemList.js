import Card from "@/components/Card"
import Button from "@/components/ui/Button"
import LoadingState from "@/components/ui/LoadingState"
import EmptyState from "@/components/ui/EmptyState"

export default function ItemList({
  items,
  isHydrated,
  onEdit,
  onDelete,
}) {
  if (!isHydrated) {
    return <LoadingState message="아이템 불러오는 중..." />
  }

  if (items.length === 0) {
    return (
      <EmptyState message="아직 등록된 아이템이 없습니다" />
    )
  }

  return (
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <Card key={item.id} className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-gray-900">
                {item.name}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <Button
                onClick={() => onEdit(item)}
                variant="soft"
                size="sm"
                className="min-w-[44px] rounded-xl px-2.5 py-1 text-xs text-gray-500"
              >
                수정
              </Button>

              <Button
                onClick={() => onDelete(item.id)}
                variant="softDanger"
                size="sm"
                className="min-w-[44px] rounded-xl px-2.5 py-1 text-xs text-red-400"
              >
                삭제
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}