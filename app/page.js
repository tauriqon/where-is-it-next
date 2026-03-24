import { ROOMS } from "@/data/rooms"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold text-gray-900">
          where-is-it
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          집 안 물건 위치를 기록하고 찾는 앱
        </p>

        <section className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Room
          </h2>
        <div className="mt-3 space-y-3">
            {ROOMS.map((room) => (
              <div
                key={room.id}
                className="rounded-2xl border border-gray-200 p-4"
              >
                <p className="text-base font-medium text-gray-800">
                  {room.emoji} {room.name}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}