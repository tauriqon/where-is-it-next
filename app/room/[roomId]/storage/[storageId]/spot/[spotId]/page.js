import AppLayout from "@/components/AppLayout"
import PageHeader from "@/components/PageHeader"
import ItemSection from "@/components/ItemSection"
import { ROOMS } from "@/data/rooms"
import { STORAGES } from "@/data/storages"
import { SPOTS } from "@/data/spots"
import { ITEMS } from "@/data/items"

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
        title={`${currentRoom.emoji} ${currentRoom.name} > ${currentStorage.name} > ${currentSpot.name}`}
        subtitle="아이템"
        showBack
      />

      <ItemSection
        initialItems={items}
        spotId={spotId}
      />
    </AppLayout>
  )
}