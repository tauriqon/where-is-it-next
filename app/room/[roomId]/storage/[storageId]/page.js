import AppLayout from "@/components/AppLayout"
import { ROOMS } from "@/data/rooms"
import { STORAGES } from "@/data/storages"
import { SPOTS } from "@/data/spots"
import Card from "@/components/Card"
import PageHeader from "@/components/PageHeader"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

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

  const supabase = createServerSupabaseClient()
  const spotIds = spots.map((spot) => spot.id)

  let itemCountMap = {}

  if (spotIds.length > 0) {
    const { data, error } = await supabase
      .from("items")
      .select("id, spot_id")
      .in("spot_id", spotIds)

    if (error) {
      console.error("Spot별 아이템 개수 조회 오류:", error)
    } else {
      itemCountMap = (data ?? []).reduce((acc, item) => {
        acc[item.spot_id] = (acc[item.spot_id] ?? 0) + 1
        return acc
      }, {})
    }
  }

  return (
    <AppLayout>
      <PageHeader
        subtitle={`${currentRoom.emoji} ${currentRoom.name}`}
        title={currentStorage.name}
        showBack
      />

      <section className="mt-6 space-y-3">
        {spots.map((spot) => {
          const itemCount = itemCountMap[spot.id] ?? 0

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