export default function Card({ children, clickable = false }) {
  return (
    <div
      className={[
        "rounded-2xl border p-4",
        clickable ? "cursor-pointer hover:bg-gray-50" : "",
      ].join(" ")}
    >
      {children}
    </div>
  )
}