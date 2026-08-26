export default function SupportPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--color-surface)] border border-[var(--border-color)] rounded-2xl p-6 text-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Support & Legal</h1>
        <p className="text-[var(--color-text-secondary)] mb-6">
          If you need assistance, please use the Support Hub button located at the bottom right corner of the screen.
        </p>
        <a href="/" className="px-6 py-3 bg-[var(--color-primary)] text-black rounded-full font-bold inline-block hover:brightness-110 transition-all">
          Return Home
        </a>
      </div>
    </div>
  );
}
