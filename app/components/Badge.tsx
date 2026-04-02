export default function Badge({ advantage, type }: { advantage: "weakness" | "slight" | "big", type: string }) {
  const styles = {
    weakness: "bg-red-500/25 text-red-300 border-red-500/30",
    slight: "bg-emerald-500/25 text-emerald-300 border-emerald-500/30",
    big: "bg-amber-500/25 text-amber-200 border-amber-400/40",
  };
 
  return (
    <span
      className={`inline-flex items-center px-1.5 py-1 rounded-md border text-[11px] font-medium max-h-8 ${styles[advantage]}`}
    >
      {type}
    </span>
  );
}