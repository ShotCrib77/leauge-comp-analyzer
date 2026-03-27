export default function Badge({
  advantage,
  type,
}: {
  advantage: "weakness" | "slight" | "big";
  type: string;
}) {
  const styles = {
    weakness: "bg-red-500/25 text-red-300 border-red-500/30",
    slight: "bg-yellow-500/25 text-yellow-300 border-yellow-500/30",
    big: "bg-emerald-500/25 text-emerald-300 border-emerald-500/30",
  };
 
  return (
    <span
      className={`inline-flex items-center px-1.5 py-1 rounded-md border text-[11px] font-medium ${styles[advantage]}`}
    >
      {type}
    </span>
  );
}
 