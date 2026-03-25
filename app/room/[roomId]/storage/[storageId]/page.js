import AppLayout from "@/components/AppLayout"
import { ROOMS } from "@/data/rooms"
import { STORAGES } from "@/data/storages"
import { SPOTS } from "@/data/spots"
import Card from "@/components/Card"
import PageHeader from "@/components/PageHeader"

export default async function SpotPage({ params }) {
  const { roomId, storageId } = await params

  const currentRoom = ROOMS.find(
    (r) => r.id === Number(roomId)
  )

  const currentStorage = STORAGES.find(
    (s) => s.id === Number(storageId)
  )

  if (!currentRoom) {
    return <div>존재하지 않는 Room입니다</div>
  }

  if (!currentStorage) {
    return <div>존재하지 않는 Storage입니다</div>
  }

  const spots = SPOTS.filter(
    (spot) => spot.storageId === Number(storageId)
  )

  return (
    <AppLayout>
      <PageHeader
        subtitle={`${currentRoom.emoji} ${currentRoom.name}`}
        title={currentStorage.name}
      />

      <div className="mt-6 space-y-3">
        {spots.map((spot) => (
          <Card key={spot.id}>
            {spot.name}
          </Card>
        ))}
      </div>
    </AppLayout>
  )
}