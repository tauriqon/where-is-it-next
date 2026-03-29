import Link from "next/link"
import AppLayout from "@/components/AppLayout"
import { ROOMS } from "@/data/rooms"
import Card from "@/components/Card"

export default function HomePage() {
  return (
    <AppLayout>
      <header>
        <h1 className="text-[22px] font-bold tracking-[-0.02em] text-gray-900">
          where-is-it
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          집 안 물건 위치를 기록하고 찾는 앱
        </p>
      </header>

      <section className="mt-8">
        <h2 className="text-base font-semibold text-gray-900">
          Room
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {ROOMS.map((room) => (
            <Link key={room.id} href={`/room/${room.id}`}>
              <Card className="h-full p-4">
                <div className="flex h-full flex-col justify-between gap-4">
                  <div className="text-2xl">
                    {room.emoji}
                  </div>

                  <div>
                    <p className="text-[15px] font-medium text-gray-900">
                      {room.name}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </AppLayout>
  )
}