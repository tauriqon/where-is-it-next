export default function PageHeader({ subtitle, title }) {
  return (
    <div>
      {subtitle && (
        <p className="text-sm text-gray-500">
          {subtitle}
        </p>
      )}

      <h1 className="mt-2 text-xl font-bold">
        {title}
      </h1>
    </div>
  )
}