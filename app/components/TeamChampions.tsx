"use client";
import { useState } from "react";
import ChampionCard from "./ChampionCard";

export default function TeamChampions() {
	const [blueSideChamps, setBlueSideChamps] = useState({
		top: "",
		jungle: "",
		middle: "",
		bottom: "",
		utility: ""
	})

	const [redSideChamps, setRedSideChamps] = useState({
		top: "",
		jungle: "",
		middle: "",
		bottom: "",
		utility: ""
	})

	const handleChampChange = (side: "blue" | "red", role: string, champ: string) => {
	  const taken = Object.values(blueSideChamps).includes(champ) || Object.values(redSideChamps).includes(champ);
  	if (taken) return;
		
		if (side === "blue") {
			setBlueSideChamps(prev => ({ ...prev, [role]: champ }));
		} else {
			setRedSideChamps(prev => ({ ...prev, [role]: champ }));
		}
	};



	return (
		<div className="w-full md:w-xl">
			<div className="flex justify-between">
				<div className="flex flex-col gap-2 items-center mr-auto px-8">
					<h2 className="mt-2 text-base lg:text-lg tracking-widest uppercase text-blue-500" style={{textShadow: "0 1px 4px #000, 0 1px 4px #000"}}>
						Blue Side
					</h2>
					<ChampionCard selectedChamp={blueSideChamps.top}     setSelectedChamp={(champ: string) => handleChampChange("blue", "top", champ)}     />
					<ChampionCard selectedChamp={blueSideChamps.jungle}  setSelectedChamp={(champ: string) => handleChampChange("blue", "jungle", champ)}  />
					<ChampionCard selectedChamp={blueSideChamps.middle}  setSelectedChamp={(champ: string) => handleChampChange("blue", "middle", champ)}  />
					<ChampionCard selectedChamp={blueSideChamps.bottom}  setSelectedChamp={(champ: string) => handleChampChange("blue", "bottom", champ)}  />
					<ChampionCard selectedChamp={blueSideChamps.utility} setSelectedChamp={(champ: string) => handleChampChange("blue", "utility", champ)} />
				</div>
				<div className="flex flex-col gap-2 w-fit items-center ml-auto px-8">
					<h2 className="mt-2 w-fit text-base lg:text-lg tracking-widest uppercase text-red-500" style={{textShadow: "0 1px 4px #000, 0 1px 4px #000"}}>
						Red Side
					</h2>

					<ChampionCard selectedChamp={redSideChamps.top}     setSelectedChamp={(champ: string) => handleChampChange("red", "top", champ)}     direction="left" />
					<ChampionCard selectedChamp={redSideChamps.jungle}  setSelectedChamp={(champ: string) => handleChampChange("red", "jungle", champ)}  direction="left" />
					<ChampionCard selectedChamp={redSideChamps.middle}  setSelectedChamp={(champ: string) => handleChampChange("red", "middle", champ)}  direction="left" />
					<ChampionCard selectedChamp={redSideChamps.bottom}  setSelectedChamp={(champ: string) => handleChampChange("red", "bottom", champ)}  direction="left" />
					<ChampionCard selectedChamp={redSideChamps.utility} setSelectedChamp={(champ: string) => handleChampChange("red", "utility", champ)} direction="left" />
				</div>
			</div>

		</div>
	);
}