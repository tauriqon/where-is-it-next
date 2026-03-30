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
      <div className="flex items-start gap-2">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 active:scale-95"
            aria-label="뒤로가기"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        <div className="min-w-0">
          {subtitle && (
            <p className="text-xs font-medium tracking-tight text-gray-500">
              {subtitle}
            </p>
          )}

          <h1 className="mt-1 break-words text-xl font-semibold leading-snug text-gray-900">
            {title}
          </h1>
        </div>
      </div>
    </header>
  )
}