import Button from "@/components/ui/Button"

export default function ItemInput({
  value,
  onChange,
  onSubmit,
  onCancel,
  disabled,
  isEditing,
}) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="아이템 이름 입력"
        className="flex-1 rounded-2xl border bg-white px-4 py-3 outline-none placeholder:text-gray-400"
        disabled={disabled}
      />

      <Button
        onClick={onSubmit}
        variant="primary"
        disabled={disabled || !value.trim()}
      >
        {isEditing ? "저장" : "Add"}
      </Button>

      {isEditing && (
        <Button onClick={onCancel} variant="secondary">
          취소
        </Button>
      )}
    </div>
  )
}