export default async function SpotPage({ params }) {
  const { roomId, storageId } = await params

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-xl font-bold">
        Room: {roomId}
      </h1>

      <p className="mt-2">
        Storage: {storageId}
      </p>

      <p className="mt-4 text-gray-600">
        여기는 Spot 페이지야
      </p>
    </main>
  )
}