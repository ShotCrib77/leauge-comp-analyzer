import Image from "next/image";
import { DDRAGON_VERSION } from "../lib/constants";
interface PlayerCardProps {
  gameName: string;
  tagLine: string;
  profileIconId: number;
}

export default function PlayerCard({ gameName, tagLine, profileIconId }: PlayerCardProps) {
  return (
    <div
      className="relative px-5 py-4 h-fit rounded-sm flex items-center gap-4 overflow-hidden">
      <div className="relative rounded-sm overflow-hidden" style={{ border: "1px solid rgba(200,155,60,0.2)" }}>
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/profileicon/${profileIconId}.png`}
          height={64}
          width={64}
          alt={`${gameName} profile icon`}
        />
      </div>
      <h2 className="text-xl font-semibold" style={{ color: "#e8e0d0", fontFamily: "Georgia, serif" }}>
        {gameName}{" "}
        <span className="text-base font-normal" style={{ color: "rgba(200,155,60,0.6)" }}>
          #{tagLine}
        </span>
      </h2>
    </div>
  );
}