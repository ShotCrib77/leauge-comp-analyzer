import Badge from "./Badge";

export default function Badges() {
  return (
    <div className="p-2 flex gap-2 flex-wrap justify-center max-w-64">
        <Badge type="Early Game" advantage="weakness" />
        <Badge type="Late Game" advantage="big" />
        <Badge type="Late Game" advantage="big" />
        <Badge type="Late Game" advantage="big" />
        <Badge type="Poke" advantage="slight" />
    </div>
  );
}