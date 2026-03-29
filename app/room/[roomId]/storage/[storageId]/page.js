import AppLayout from "@/components/AppLayout"
import { ROOMS } from "@/data/rooms"
import { STORAGES } from "@/data/storages"
import { SPOTS } from "@/data/spots"
import { ITEMS } from "@/data/items"
import Card from "@/components/Card"
import PageHeader from "@/components/PageHeader"
import Link from "next/link"

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
        showBack
      />

      <section className="mt-6 space-y-3">
        {spots.map((spot) => {
          const itemCount = ITEMS.filter(
            (item) => item.spotId === spot.id
          ).length

          return (
            <Link
              key={spot.id}
              href={`/room/${roomId}/storage/${storageId}/spot/${spot.id}`}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[15px] font-medium text-gray-900">
                    {spot.name}
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      {itemCount}개
                    </span>

                    <span className="text-sm text-gray-300">
                      &gt;
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </section>
    </AppLayout>
  )
}