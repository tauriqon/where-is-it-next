import AppLayout from "@/components/AppLayout"
import PageHeader from "@/components/PageHeader"
import { ROOMS } from "@/data/rooms"
import { STORAGES } from "@/data/storages"
import { SPOTS } from "@/data/spots"

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

  return (
    <AppLayout>
      <PageHeader
        subtitle={`${currentRoom.emoji} ${currentRoom.name} / ${currentStorage.name}`}
        title={currentSpot.name}
      />

      <div className="mt-6 rounded-2xl border p-4">
        여기는 Item 페이지야
      </div>
    </AppLayout>
  )
}