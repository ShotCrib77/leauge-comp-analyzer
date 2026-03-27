type ChampionGameStat = {
  matchId: string;
  championName: string;
  gameDuration: number;
  win: boolean;
  goldAt10: number;
  goldAt15: number;
  goldAt25: number;
  goldAt35: number;
  xpAt10: number;
  xpAt15: number;
  minutesWithDamage: number;
  timeEnemySpentControlled: number;
  soloKills: number;
  teamfightKills: number;
}