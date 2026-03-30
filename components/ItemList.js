"use client"

import { useEffect, useRef, useState } from "react"
import Card from "@/components/Card"
import LoadingState from "@/components/ui/LoadingState"
import EmptyState from "@/components/ui/EmptyState"

export default function ItemList({
  items,
  isHydrated,
  onEdit,
  onDelete,
  deletingItemId = null,
}) {
  const [openMenuId, setOpenMenuId] = useState(null)

  const buttonRefs = useRef({})
  const menuRefs = useRef({})

  useEffect(() => {
    function handleClickOutside(event) {
      if (openMenuId === null) return

      const currentButton = buttonRefs.current[openMenuId]
      const currentMenu = menuRefs.current[openMenuId]

      const clickedInsideButton =
        currentButton && currentButton.contains(event.target)

      const clickedInsideMenu =
        currentMenu && currentMenu.contains(event.target)

      if (!clickedInsideButton && !clickedInsideMenu) {
        setOpenMenuId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [openMenuId])

  if (!isHydrated) {
    return <LoadingState message="아이템 불러오는 중..." />
  }

  if (items.length === 0) {
    return (
      <EmptyState
        message="아직 등록된 아이템이 없어요"
        description="위에서 첫 아이템을 추가해보세요"
      />
    )
  }

  return (
    <div className="mt-3 space-y-2.5">
      {items.map((item) => {
        const isOpen = openMenuId === item.id
        const isDeleting = deletingItemId === item.id

        return (
          <Card
            key={item.id}
            className={`relative transition-all duration-300 ${
              isDeleting
                ? "scale-90 opacity-0"
                : "opacity-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="truncate text-base font-semibold text-gray-900">
                {item.name}
              </p>

              <button
                ref={(el) => {
                  buttonRefs.current[item.id] = el
                }}
                onClick={() => setOpenMenuId(isOpen ? null : item.id)}
                className="rounded-xl px-3 py-2 text-lg text-gray-400 transition hover:bg-gray-100 active:scale-95 active:bg-gray-200"
                aria-label="아이템 메뉴 열기"
                disabled={isDeleting}
              >
                ⋯
              </button>
            </div>

            <div
              ref={(el) => {
                menuRefs.current[item.id] = el
              }}
              className={`absolute right-4 top-12 z-10 w-24 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-200 ${
                isOpen
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none translate-y-1 scale-95 opacity-0"
              }`}
            >
              <button
                onClick={() => {
                  onEdit(item)
                  setOpenMenuId(null)
                }}
                className="w-full px-3 py-2.5 text-center text-sm hover:bg-gray-50 active:bg-gray-100"
              >
                수정
              </button>

              <button
                onClick={() => {
                  onDelete(item)
                  setOpenMenuId(null)
                }}
                className="w-full px-3 py-2.5 text-center text-sm text-red-500 hover:bg-gray-50 active:bg-red-50"
              >
                삭제
              </button>
            </div>
          </Card>
        )
      })}
    </div>
  )
}