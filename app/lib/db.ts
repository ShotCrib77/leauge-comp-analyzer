import postgres from "postgres";

const pool = postgres(process.env.DATABASE_URL!, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});


export async function getChampData(champion: string): Promise<ChampionGameStat[]> {
	const result = await pool<ChampionGameStat[]>`
		SELECT * FROM champion_game_stats WHERE championName = ${champion}
	`
	return result;
}

export async function getEarly(championNames: string[]) {
    const result = await pool`
        SELECT 
            "championName",
            AVG("goldAt10" + "goldAt15" + "xpAt10" + "xpAt15") as "score",
            MIN(AVG("goldAt10" + "goldAt15" + "xpAt10" + "xpAt15")) OVER () as "minScore",
            MAX(AVG("goldAt10" + "goldAt15" + "xpAt10" + "xpAt15")) OVER () as "maxScore"
        FROM champion_game_stats
        GROUP BY "championName"
        HAVING COUNT(*) > 50
    `
    return championNames.map(name => {
        const champ = result.find(r => r.championName === name)
        if (!champ) return null
        return (champ.score - champ.minScore) / (champ.maxScore - champ.minScore) * 100
    }).filter(v => v !== null)
}

export async function getLateGame(championNames: string[]) {
    const result = await pool`
        SELECT *,
            "lateWinRate" - "avgGoldAt10" / NULLIF("avgGoldAt25", 0) as "score",
            MIN("lateWinRate" - "avgGoldAt10" / NULLIF("avgGoldAt25", 0)) OVER () as "minScore",
            MAX("lateWinRate" - "avgGoldAt10" / NULLIF("avgGoldAt25", 0)) OVER () as "maxScore"
        FROM (
            SELECT 
                "championName",
                AVG("goldAt10") as "avgGoldAt10",
                AVG("goldAt25") as "avgGoldAt25",
                COUNT(CASE WHEN "gameDuration" > 2100 AND win THEN 1 END)::float / 
                NULLIF(COUNT(CASE WHEN "gameDuration" > 2100 THEN 1 END), 0) as "lateWinRate"
            FROM champion_game_stats
            GROUP BY "championName"
            HAVING COUNT(CASE WHEN "gameDuration" > 2100 THEN 1 END) > 50
        ) as champion_late_stats
    `
    return championNames.map(name => {
        const champ = result.find(r => r.championName === name)
        if (!champ) return null
        return (champ.score - champ.minScore) / (champ.maxScore - champ.minScore) * 100
    }).filter(v => v !== null)
}

export async function getPoke(championNames: string[]) {
    const result = await pool`
        SELECT 
            "championName",
            AVG("minutesWithDamage"::float / ("gameDuration" / 60)) as "score",
            MIN(AVG("minutesWithDamage"::float / ("gameDuration" / 60))) OVER () as "minScore",
            MAX(AVG("minutesWithDamage"::float / ("gameDuration" / 60))) OVER () as "maxScore"
        FROM champion_game_stats
        GROUP BY "championName"
        HAVING COUNT(*) > 50
    `
    return championNames.map(name => {
        const champ = result.find(r => r.championName === name)
        if (!champ) return null
        return (champ.score - champ.minScore) / (champ.maxScore - champ.minScore) * 100
    }).filter(v => v !== null)
}

export async function getEngage(championNames: string[]) {
    const result = await pool`
        SELECT 
            "championName",
            AVG("timeEnemySpentControlled") as "score",
            MIN(AVG("timeEnemySpentControlled")) OVER () as "minScore",
            MAX(AVG("timeEnemySpentControlled")) OVER () as "maxScore"
        FROM champion_game_stats
        GROUP BY "championName"
        HAVING COUNT(*) > 50
    `
    return championNames.map(name => {
        const champ = result.find(r => r.championName === name)
        if (!champ) return null
        return (champ.score - champ.minScore) / (champ.maxScore - champ.minScore) * 100
    }).filter(v => v !== null)
}

export async function getPick(championNames: string[]) {
    const result = await pool`
        SELECT 
            "championName",
            AVG("soloKills") as "score",
            MIN(AVG("soloKills")) OVER () as "minScore",
            MAX(AVG("soloKills")) OVER () as "maxScore"
        FROM champion_game_stats
        GROUP BY "championName"
        HAVING COUNT(*) > 50
    `
    return championNames.map(name => {
        const champ = result.find(r => r.championName === name)
        if (!champ) return null
        return (champ.score - champ.minScore) / (champ.maxScore - champ.minScore) * 100
    }).filter(v => v !== null)
}

export async function getTeamfight(championNames: string[]) {
    const result = await pool`
        SELECT 
            "championName",
            AVG("teamfightKills") as "score",
            MIN(AVG("teamfightKills")) OVER () as "minScore",
            MAX(AVG("teamfightKills")) OVER () as "maxScore"
        FROM champion_game_stats
        GROUP BY "championName"
        HAVING COUNT(*) > 50
    `
    return championNames.map(name => {
        const champ = result.find(r => r.championName === name)
        if (!champ) return null
        return (champ.score - champ.minScore) / (champ.maxScore - champ.minScore) * 100
    }).filter(v => v !== null)
}