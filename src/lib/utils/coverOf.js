// Cover = project screenshot; fall back to the generic backdrop
export default function coverOf(p) {
  const demos = p?.demos ?? []
  return (
    p?.featuredCanvas ||
    demos.find((d) => d?.type === 'image')?.url ||
    demos.find((d) => d?.poster)?.poster ||
    p?.backdrop?.url ||
    ''
  )
}
