import { ROOMS } from "@/data/rooms"
import { STORAGES } from "@/data/storages"
import { SPOTS } from "@/data/spots"

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
    <main className="min-h-screen p-6">
      <p className="text-sm text-gray-500">
        {currentRoom.emoji} {currentRoom.name}
      </p>

      <h1 className="mt-2 text-xl font-bold">
        {currentStorage.name}
      </h1>

      <div className="mt-6 space-y-3">
        {spots.map((spot) => (
          <div
            key={spot.id}
            className="rounded-2xl border p-4"
          >
            {spot.name}
          </div>
        ))}
      </div>
    </main>
  )
}