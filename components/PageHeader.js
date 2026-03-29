"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

export default function PageHeader({
  subtitle,
  title,
  showBack = false,
}) {
  const router = useRouter()

  return (
    <header className="mb-6">
      <div className="flex items-center gap-1">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="뒤로가기"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        <h1 className="mt-1 text-sl font-semibold text-gray-900 leading-snug">
          {title}
        </h1>
      </div>

      {subtitle && (
        <p className="mt-2 pl-10 text-sm font-semibold text-gray-600">
          {subtitle}
        </p>
      )}
    </header>
  )
}