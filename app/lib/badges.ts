"use server";

import { getEarly, getLateGame, getPoke, getEngage, getPick, getTeamfight } from "../lib/db"
import { BIG_ADVANTAGE_THRESHOLD, SLIGHT_ADVANTAGE_THRESHOLD } from "./constants"

const sum = (nums: number[]) => nums.reduce((a, b) => a + b, 0)

export async function getStatDeltas(blueChamps: string[], redChamps: string[]) {
    const [
        blueEarly, blueLate, bluePoke, blueEngage, bluePick, blueTeamfight,
        redEarly, redLate, redPoke, redEngage, redPick, redTeamfight,
    ] = await Promise.all([
        getEarly(blueChamps),
        getLateGame(blueChamps),
        getPoke(blueChamps),
        getEngage(blueChamps),
        getPick(blueChamps),
        getTeamfight(blueChamps),
        getEarly(redChamps),
        getLateGame(redChamps),
        getPoke(redChamps),
        getEngage(redChamps),
        getPick(redChamps),
        getTeamfight(redChamps),
    ])
    
    const blue = {
        early: sum(blueEarly),
        late: sum(blueLate),
        poke: sum(bluePoke),
        engage: sum(blueEngage),
        pick: sum(bluePick),
        teamfight: sum(blueTeamfight),
    }

    const red = {
        early: sum(redEarly),
        late: sum(redLate),
        poke: sum(redPoke),
        engage: sum(redEngage),
        pick: sum(redPick),
        teamfight: sum(redTeamfight),
    }

    const delta = {
        early: blue.early - red.early,
        late: blue.late - red.late,
        poke: blue.poke - red.poke,
        engage: blue.engage - red.engage,
        pick: blue.pick - red.pick,
        teamfight: blue.teamfight - red.teamfight,
    }

    return { blue, red, delta }
}

function getBadgeAdvantage(delta: number): { side: "blue" | "red", advantage: "slight" | "big" } | null {
    const abs = Math.abs(delta)
    if (abs < SLIGHT_ADVANTAGE_THRESHOLD) return null
    return {
        side: delta > 0 ? "blue" : "red",
        advantage: abs < BIG_ADVANTAGE_THRESHOLD ? "slight" : "big"
    }
}

export async function getBadgeData(blueChamps: string[], redChamps: string[]) {
    const { blue, red, delta } = await getStatDeltas(blueChamps, redChamps);

    console.log("BLUE: ", blue)
    console.log("RED: ", red)
    console.log("DELTA: ", delta)

    const badges = {
        early: getBadgeAdvantage(delta.early),
        late: getBadgeAdvantage(delta.late),
        poke: getBadgeAdvantage(delta.poke),
        engage: getBadgeAdvantage(delta.engage),
        pick: getBadgeAdvantage(delta.pick),
        teamfight: getBadgeAdvantage(delta.teamfight),
    }

    return badges
}