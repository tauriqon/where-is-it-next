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
        className="flex-1 rounded-2xl border px-4 py-3 outline-none"
        disabled={disabled}
      />

      <button
        onClick={onSubmit}
        className="rounded-2xl border px-4 py-3 font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
        disabled={disabled || !value.trim()}
      >
        {isEditing ? "저장" : "Add"}
      </button>

      {isEditing && (
        <button
          onClick={onCancel}
          className="rounded-2xl border px-4 py-3 font-medium hover:bg-gray-50"
        >
          취소
        </button>
      )}
    </div>
  )
}