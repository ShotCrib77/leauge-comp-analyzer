import Image from "next/image";
import { DDRAGON_VERSION } from "../lib/constants";
import ChampionSearchToggle from "./ChampionSearchToggle";

export default function ChampionCard({ selectedChamp, setSelectedChamp, direction = "right" }: { selectedChamp: string, setSelectedChamp: (champ: string) => void, direction?: "left" | "right" }) {
  return (
    <div className="flex items-center gap-2 w-fit">
      {selectedChamp ? (
        <div className="w-12 h-12 bg-gray-950 border-2 border-gray-400 rounded-md" >
          <Image
            className="rounded-md"
            src={`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${selectedChamp}.png`}
            width={48}
            height={48}
            alt={`${selectedChamp} champion icon`}
          />
        </div>
      ) : (
        <div className="w-12 h-12 bg-gray-950 border-2 border-gray-500 rounded-md" />
      )}
      <div className={direction === "left" ? "order-first" : ""}>
        <ChampionSearchToggle selectedChamp={selectedChamp} setSelectedChamp={setSelectedChamp} direction={direction} />
      </div>
    </div>
  );
}