import Badges from "./Badges";

export default function TeamBadges() {
  return (
    <div className="mt-4 flex justify-between">
      <div className="pr-12">
        <Badges />
      </div>
      <div className="pl-12">
        <Badges />
      </div>
    </div>
  );
}