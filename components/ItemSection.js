"use client"

import { useEffect, useState } from "react"
import Card from "@/components/Card"

export default function ItemSection({ initialItems, spotId }) {
  const storageKey = `items-${spotId}`

  const [items, setItems] = useState(initialItems)
  const [newItemName, setNewItemName] = useState("")
  const [isHydrated, setIsHydrated] = useState(false)

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

  function handleAddItem() {
    const trimmedName = newItemName.trim()

    if (!trimmedName) return

    const newItem = {
      id: Date.now(),
      name: trimmedName,
    }

    setItems((prev) => [...prev, newItem])
    setNewItemName("")
  }

  function handleDeleteItem(itemId) {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
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
          onClick={handleAddItem}
          className="rounded-2xl border px-4 py-3 font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
          disabled={!isHydrated || !newItemName.trim()}
        >
          Add
        </button>
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

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
                >
                  삭제
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  )
}