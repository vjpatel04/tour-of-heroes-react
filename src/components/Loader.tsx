export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16" role="status" aria-live="polite">
      <span className="loading loading-spinner loading-lg text-primary" aria-hidden="true" />
      <span className="text-base-content/70">Loading heroes…</span>
    </div>
  )
}
