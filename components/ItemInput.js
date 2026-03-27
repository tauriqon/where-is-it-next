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
    <section className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="아이템 이름 입력"
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
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            수정 중입니다
          </p>

          <Button
            onClick={onCancel}
            variant="soft"
            size="sm"
            className="px-3 py-1.5"
          >
            취소
          </Button>
        </div>
      )}
    </section>
  )
}