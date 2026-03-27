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
    <div className="mt-4 space-y-2">
      {items.map((item) => (
        <Card key={item.id}>
          <div className="flex items-center justify-between gap-3">
            <span className="text-gray-900">
              {item.name}
            </span>

            <div className="flex gap-2">
              <Button
                onClick={() => onEdit(item)}
                variant="soft"
                size="sm"
                className="px-3 py-1.5"
              >
                수정
              </Button>

              <Button
                onClick={() => onDelete(item.id)}
                variant="softDanger"
                size="sm"
                className="px-3 py-1.5"
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