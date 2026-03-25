"use client"

import { useEffect, useState } from "react"
import ItemInput from "@/components/ItemInput"
import ItemList from "@/components/ItemList"

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
      <ItemInput
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        onSubmit={handleAddOrUpdateItem}
        onCancel={handleCancelEdit}
        disabled={!isHydrated}
        isEditing={!!editingItemId}
      />

      <ItemList
        items={items}
        isHydrated={isHydrated}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />
    </section>
  )
}