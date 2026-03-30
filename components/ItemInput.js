import Button from "@/components/ui/Button"

export default function ItemInput({
  value,
  onChange,
  onSubmit,
  onCancel,
  disabled,
  isEditing,
}) {
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder="무엇을 보관하시나요?"
          className="h-12 flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 outline-none placeholder:text-gray-400 focus:bg-white"
          disabled={disabled}
        />

        <Button
          onClick={onSubmit}
          variant="primary"
          className="h-12 px-5"
          disabled={disabled || !value.trim()}
        >
          {isEditing ? "저장" : "추가"}
        </Button>
      </div>

      {isEditing && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            아이템 이름을 수정하고 있어요
          </p>

          <Button
            onClick={onCancel}
            variant="soft"
            className="h-12 px-5"
          >
            취소
          </Button>
        </div>
      )}
    </section>
  )
}