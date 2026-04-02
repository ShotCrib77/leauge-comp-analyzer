"use client";
import { useEffect, useState } from "react";
import { getBadgeData } from "../lib/badges";
import Badge from "./Badge";

interface TeamBadgesProps {
  blueSideChamps: {
    top: string,
    jungle: string,
    middle: string,
    bottom: string;
    utility: string;
  }
  redSideChamps:{
    top: string,
    jungle: string,
    middle: string,
    bottom: string;
    utility: string;
  }
}

type BadgeResult = { side: "blue" | "red", advantage: "slight" | "big" } | null

type BadgesType = {
  early: BadgeResult
  late: BadgeResult
  poke: BadgeResult
  engage: BadgeResult
  pick: BadgeResult
  teamfight: BadgeResult
}

export default function TeamBadges({blueSideChamps, redSideChamps}: TeamBadgesProps) {
  const [badges, setBadges] = useState<BadgesType | null>(null)

  useEffect(() => {
    const getBadges = async () => {
      const blueChamps = Object.values(blueSideChamps)
      const redChamps = Object.values(redSideChamps)
      
      const badgeData = await getBadgeData(blueChamps, redChamps);
      setBadges(badgeData)
    }
    getBadges()
  }, [blueSideChamps, redSideChamps]);


  if (badges === null) return;

  return (
    <div className="mt-4 flex justify-between">
      <div className="pr-12 pl-2 py-2 flex gap-2 flex-wrap justify-center max-w-64">
        {Object.entries(badges).map(([type, badge]) => 
            badge?.side === "blue" && (
                <Badge
                    key={type}
                    type={type} 
                    advantage={badge.advantage}
                />
            )
        )}

      </div>
      <div className="pr-2 pl-12 py-2 flex gap-2 flex-wrap justify-center max-w-64">
        {Object.entries(badges).map(([type, badge]) => 
            badge?.side === "red" && (
                <Badge 
                    key={type}
                    type={type} 
                    advantage={badge.advantage}
                />
            )
        )}
      </div>
    </div>
  );
}