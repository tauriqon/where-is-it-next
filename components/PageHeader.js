"use client"

import { useRouter } from "next/navigation"

export default function PageHeader({ subtitle, title, showBack = false }) {
  const router = useRouter()

  return (
    <div>
      {showBack && (
        <button
          onClick={() => router.back()}
          className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border text-lg hover:bg-gray-50"
          aria-label="뒤로가기"
        >
          🔙
        </button>
      )}

      {subtitle && (
        <p className="text-sm text-gray-500">
          {subtitle}
        </p>
      )}

      <h1 className="mt-2 text-xl font-bold">
        {title}
      </h1>
    </div>
  )
}