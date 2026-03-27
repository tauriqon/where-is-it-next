export default function AppLayout({ children }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-10 pt-6">
        {children}
      </div>
    </main>
  )
}