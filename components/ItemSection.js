"use client"

import { useEffect, useMemo, useState } from "react"
import ItemInput from "@/components/ItemInput"
import ItemList from "@/components/ItemList"
import ConfirmModal from "@/components/ui/ConfirmModal"
import { createClient } from "@/lib/supabase/client"

export default function ItemSection({ spotId }) {
  const supabase = useMemo(() => createClient(), [])

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const [newItemName, setNewItemName] = useState("")
  const [editingItemId, setEditingItemId] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deletingItemId, setDeletingItemId] = useState(null)

  useEffect(() => {
    async function fetchItems() {
      setLoading(true)

      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("spot_id", Number(spotId))
        .order("id", { ascending: true })

      if (error) {
        console.error("아이템 조회 오류:", error)
        setItems([])
      } else {
        setItems(data ?? [])
      }

      setLoading(false)
    }

    fetchItems()
  }, [spotId, supabase])

  async function handleAddOrUpdateItem() {
    const trimmedName = newItemName.trim()
    if (!trimmedName) return

    if (editingItemId) {
      const { data, error } = await supabase
        .from("items")
        .update({ name: trimmedName })
        .eq("id", editingItemId)
        .select()

      if (error) {
        console.error("아이템 수정 오류:", error)
        return
      }

      const updatedItem = data?.[0]

      if (updatedItem) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === editingItemId ? updatedItem : item
          )
        )
      }

      setEditingItemId(null)
    } else {
      const { data, error } = await supabase
        .from("items")
        .insert({
          name: trimmedName,
          spot_id: Number(spotId),
        })
        .select()

      if (error) {
        console.error("아이템 추가 오류:", error)
        return
      }

      const insertedItem = data?.[0]

      if (insertedItem) {
        setItems((prev) => [...prev, insertedItem])
      }
    }

    setNewItemName("")
  }

  function handleDeleteItem(item) {
    if (!item) return
    setDeleteTarget(item)
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return

    const targetId = deleteTarget.id

    setDeleteTarget(null)
    setDeletingItemId(targetId)

    window.setTimeout(async () => {
      const { error } = await supabase
        .from("items")
        .delete()
        .eq("id", targetId)

      if (error) {
        console.error("아이템 삭제 오류:", error)
        setDeletingItemId(null)
        return
      }

      setItems((prev) =>
        prev.filter((item) => item.id !== targetId)
      )

      if (editingItemId === targetId) {
        setEditingItemId(null)
        setNewItemName("")
      }

      setDeletingItemId(null)
    }, 180)
  }

  function handleCancelDelete() {
    setDeleteTarget(null)
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
    <>
      <section className="mt-4">
        <p className="mb-3 text-sm font-semibold text-gray-500">
          {editingItemId ? "아이템 수정" : "새 아이템 추가"}
        </p>

        <ItemInput
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          onSubmit={handleAddOrUpdateItem}
          onCancel={handleCancelEdit}
          disabled={loading}
          isEditing={!!editingItemId}
        />

        <div className="mt-3">
          <ItemList
            items={items}
            isHydrated={!loading}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            deletingItemId={deletingItemId}
          />
        </div>
      </section>

      <ConfirmModal
        open={!!deleteTarget}
        title="아이템을 삭제할까요?"
        message={
          deleteTarget
            ? `'${deleteTarget.name}'은(는) 삭제 후 다시 복구할 수 없어요.`
            : ""
        }
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  )
}