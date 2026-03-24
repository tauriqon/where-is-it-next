import { ROOMS } from "@/data/rooms"
import { STORAGES } from "@/data/storages"

export default async function StoragePage({ params }) {
  const { roomId } = await params

  const currentRoom = ROOMS.find(
    (r) => r.id === Number(roomId)
  )

  if(!currentRoom) {
    return <div>존재하지 않는 Room입니다</div>
  }

  const storages = STORAGES.filter(
    (s) => s.roomId === Number(roomId)
  )

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-xl font-bold">
        {currentRoom.emoji} {currentRoom.name}
      </h1>

      <div className="mt-6 space-y-3">
        {storages.map((storage) => (
          <div
            key={storage.id}
            className="rounded-2xl border p-4"
          >
            {storage.name}
          </div>
        ))}
      </div>
    </main>
  )
}