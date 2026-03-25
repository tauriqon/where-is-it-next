import Link from "next/link"
import AppLayout from "@/components/AppLayout"
import { ROOMS } from "@/data/rooms"
import Card from "@/components/Card"

export default function HomePage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-md">
        <h1 className="text-xl font-bold text-gray-900">
          where-is-it
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          집 안 물건 위치를 기록하고 찾는 앱
        </p>

        <section className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Room
          </h2>

          <div className="mt-6 space-y-3">
            {ROOMS.map((room) => (
              <Link key={room.id} href={`/room/${room.id}`}>
                <Card clickable>
                  <p className="text-base font-medium text-gray-800">
                    {room.emoji} {room.name}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  )
}