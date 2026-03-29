import { forwardRef } from "react"

const Card = forwardRef(function Card(
  { children, className = "", onClick },
  ref
) {
  const clickable = !!onClick

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`
        rounded-3xl border border-gray-100 bg-white p-4 shadow-sm
        ${
          clickable
            ? "cursor-pointer transition active:scale-[0.99] active:shadow-none"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  )
})

export default Card