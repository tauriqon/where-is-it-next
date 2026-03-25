"use client"

import { useState } from "react"
import Card from "@/components/Card"

export default function ItemSection({ initialItems }) {
  const [items, setItems] = useState(initialItems)
  const [newItemName, setNewItemName] = useState("")

  function handleAddItem() {
    const trimmedName = newItemName.trim()

    if (!trimmedName) {
      return
    }

    const newItem = {
      id: Date.now(),
      name: trimmedName,
    }

    setItems((prev) => [...prev, newItem])
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
        />

        <button
          onClick={handleAddItem}
          className="rounded-2xl border px-4 py-3 font-medium hover:bg-gray-50"
        >
          Add
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            아직 등록된 아이템이 없습니다
          </p>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              {item.name}
            </Card>
          ))
        )}
      </div>
    </section>
  )
}