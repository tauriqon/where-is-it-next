export default function AppLayout({ children }) {
  return (
    <main className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-md">
        {children}
      </div>
    </main>
  )
}