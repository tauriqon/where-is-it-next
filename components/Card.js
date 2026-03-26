export default function Card({
  children,
  className = "",
  onClick,
}) {
  const clickable = !!onClick

  return (
    <div
      onClick={onClick}
      className={`
        rounded-3xl border border-gray-100 bg-white p-4 shadow-sm
        ${clickable ? "cursor-pointer transition active:scale-[0.99] active:shadow-none" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  )
}