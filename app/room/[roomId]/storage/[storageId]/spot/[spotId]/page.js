import AppLayout from "@/components/AppLayout"
import PageHeader from "@/components/PageHeader"
import { ROOMS } from "@/data/rooms"
import { STORAGES } from "@/data/storages"
import { SPOTS } from "@/data/spots"
import { ITEMS } from "@/data/items"
import Card from "@/components/Card"

export default async function ItemPage({ params }) {
  const { roomId, storageId, spotId } = await params

  const currentRoom = ROOMS.find(
    (r) => r.id === Number(roomId)
  )

  const currentStorage = STORAGES.find(
    (s) => s.id === Number(storageId)
  )

  const currentSpot = SPOTS.find(
    (s) => s.id === Number(spotId)
  )

  if (!currentRoom) {
    return <div>존재하지 않는 Room입니다</div>
  }

  if (!currentStorage) {
    return <div>존재하지 않는 Storage입니다</div>
  }

  if (!currentSpot) {
    return <div>존재하지 않는 Spot입니다</div>
  }

  const items = ITEMS.filter(
    (item) => item.spotId === Number(spotId)
  )

  return (
    <AppLayout>
      <PageHeader
        subtitle={`${currentRoom.emoji} ${currentRoom.name} / ${currentStorage.name}`}
        title={currentSpot.name}
      />

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <Card key={item.id}>
            {item.name}
          </Card>
        ))}
      </div>
    </AppLayout>
  )
}