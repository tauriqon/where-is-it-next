"use client"

import { useEffect, useState } from "react"
import Card from "@/components/Card"

export default function ItemSection({ initialItems, spotId }) {
  const storageKey = `items-${spotId}`

  const [items, setItems] = useState(initialItems)
  const [newItemName, setNewItemName] = useState("")
  const [isHydrated, setIsHydrated] = useState(false)
  const [editingItemId, setEditingItemId] = useState(null)

  useEffect(() => {
    const savedItems = localStorage.getItem(storageKey)

    if (savedItems) {
      setItems(JSON.parse(savedItems))
    } else {
      setItems(initialItems)
    }

    setIsHydrated(true)
  }, [storageKey, initialItems])

  useEffect(() => {
    if (!isHydrated) return

    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [items, storageKey, isHydrated])

  function handleAddOrUpdateItem() {
    const trimmedName = newItemName.trim()

    if (!trimmedName) return

    if (editingItemId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItemId
            ? { ...item, name: trimmedName }
            : item
        )
      )
      setEditingItemId(null)
    } else {
      const newItem = {
        id: Date.now(),
        name: trimmedName,
      }

      setItems((prev) => [...prev, newItem])
    }

    setNewItemName("")
  }

  function handleDeleteItem(itemId) {
    setItems((prev) => prev.filter((item) => item.id !== itemId))

    if (editingItemId === itemId) {
      setEditingItemId(null)
      setNewItemName("")
    }
  }

  function handleEditItem(item) {
    setEditingItemId(item.id)
    setNewItemName(item.name)
  }

  function handleCancelEdit() {
    setEditingItemId(null)
    setNewItemName("")
  }

  return (
    <section className="mt-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="아이템 이름 입력"
          className="flex-1 rounded-2xl border px-4 py-3 outline-none"
          disabled={!isHydrated}
        />

        <button
          onClick={handleAddOrUpdateItem}
          className="rounded-2xl border px-4 py-3 font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
          disabled={!isHydrated || !newItemName.trim()}
        >
          {editingItemId ? "저장" : "Add"}
        </button>

        {editingItemId && (
          <button
            onClick={handleCancelEdit}
            className="rounded-2xl border px-4 py-3 font-medium hover:bg-gray-50"
          >
            취소
          </button>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {!isHydrated ? (
          <p className="text-center text-sm text-gray-400">
            불러오는 중...
          </p>
        ) : items.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            아직 등록된 아이템이 없습니다
          </p>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              <div className="flex items-center justify-between gap-3">
                <span>{item.name}</span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
                  >
                    수정
                  </button>

                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  )
}