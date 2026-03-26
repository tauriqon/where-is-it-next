export default function Button({
  children,
  onClick,
  type = "button",
  variant = "secondary",
  size = "md",
  disabled = false,
  className = "",
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-2xl font-medium transition disabled:cursor-not-allowed disabled:opacity-50"

  const variantClasses = {
    primary:
      "bg-blue-500 px-4 py-3 text-white hover:bg-blue-600 disabled:hover:bg-blue-500",
    secondary:
      "border bg-white px-4 py-3 text-gray-900 hover:bg-gray-50 disabled:hover:bg-white",
    danger:
      "border bg-white px-4 py-3 text-red-500 hover:bg-red-50 disabled:hover:bg-white",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100",
  }

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    icon: "h-10 w-10 text-lg",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  )
}