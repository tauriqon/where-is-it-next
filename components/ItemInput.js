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
        className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 h-12 outline-none placeholder:text-gray-400"
        disabled={disabled}
      />

      <Button
        onClick={onSubmit}
        variant="primary"
        className="h-12"
        disabled={disabled || !value.trim()}
      >
        {isEditing ? "저장" : "추가"}
      </Button>

      {isEditing && (
        <Button
          onClick={onCancel}
          variant="secondary"
          className="h-12"
        >
          취소
        </Button>
      )}
    </div>
  )
}