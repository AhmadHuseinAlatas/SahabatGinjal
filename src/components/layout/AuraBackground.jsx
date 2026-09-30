/** Latar cahaya lembut (hijau, biru, koral dari logo) yang bergerak sangat pelan + tekstur butiran. */
export default function AuraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[22%] -left-[18%] size-[62vmax] animate-drift rounded-full bg-[radial-gradient(closest-side,var(--glow-1),transparent)]" />
      <div className="absolute top-[8%] -right-[22%] size-[56vmax] animate-drift rounded-full bg-[radial-gradient(closest-side,var(--glow-2),transparent)] [animation-delay:-9s]" />
      <div className="absolute -bottom-[28%] left-[18%] size-[52vmax] animate-drift rounded-full bg-[radial-gradient(closest-side,var(--glow-3),transparent)] [animation-delay:-17s]" />
      <div className="grain absolute inset-0" />
    </div>
  )
}
