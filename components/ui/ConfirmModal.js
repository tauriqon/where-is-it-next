"use client"

import { useEffect, useRef } from "react"
import Button from "@/components/ui/Button"

export default function ConfirmModal({
  open,
  title = "정말 삭제할까요?",
  message,
  confirmText = "삭제",
  cancelText = "취소",
  onConfirm,
  onCancel,
}) {
  const modalRef = useRef(null)
  const confirmButtonRef = useRef(null)

  useEffect(() => {
    if (!open) return

    function handleKeyDown(e) {
      if (e.key === "Enter") {
        e.preventDefault()
        onConfirm()
      }

      if (e.key === "Escape") {
        onCancel()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    // 👉 삭제 버튼 자동 포커스
    confirmButtonRef.current?.focus()

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onConfirm, onCancel])

  function handleBackdropClick(e) {
    // 👉 모달 바깥 클릭 시 닫기
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCancel()
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-xl"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          {title}
        </h2>

        {message && (
          <p className="mt-2 text-sm leading-6 text-gray-500">
            {message}
          </p>
        )}

        <div className="mt-5 flex gap-2">
          <Button
            onClick={onCancel}
            variant="soft"
            className="h-12 flex-1"
          >
            {cancelText}
          </Button>

          <Button
            ref={confirmButtonRef}
            onClick={onConfirm}
            variant="primary"
            className="h-12 flex-1 bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}