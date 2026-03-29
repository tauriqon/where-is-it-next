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

  if (!currentRoom) {
    return <div>존재하지 않는 Room입니다</div>
  }

  const storages = STORAGES.filter(
    (s) => s.roomId === Number(roomId)
  )

  return (
    <AppLayout>
      <PageHeader
        title={`${currentRoom.emoji} ${currentRoom.name}`}
        showBack
      />

      <section className="mt-6 space-y-3">
        {storages.map((storage) => (
          <Link
            key={storage.id}
            href={`/room/${roomId}/storage/${storage.id}`}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[15px] font-medium text-gray-900">
                  {storage.name}
                </p>

                <span className="text-sm text-gray-400">
                  &gt;
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </section>
    </AppLayout>
  )
}