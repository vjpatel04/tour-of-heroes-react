export function Loader() {
  return (
    <div role="status" aria-live="polite" className="space-y-6">
      <span className="sr-only">Loading heroes…</span>
      <div className="skeleton h-40 w-full rounded-box" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="skeleton h-40 rounded-box" />
        ))}
      </div>
    </div>
  )
}
