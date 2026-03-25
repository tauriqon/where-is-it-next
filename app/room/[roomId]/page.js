import Link from "next/link"
import AppLayout from "@/components/AppLayout"
import { ROOMS } from "@/data/rooms"
import { STORAGES } from "@/data/storages"
import Card from "@/components/Card"
import PageHeader from "@/components/PageHeader"

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
    <AppLayout>
      <PageHeader
        title={`${currentRoom.emoji} ${currentRoom.name}`}
      />

      <div className="mt-6 space-y-3">
        {storages.map((storage) => (
          <Link
            key={storage.id}
            href={`/room/${roomId}/storage/${storage.id}`}
          >
            <Card clickable>
              {storage.name}
            </Card>
          </Link>
        ))}
      </div>
    </AppLayout>
  )
}