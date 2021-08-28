/*
Elo (value) {
  Ro: number;
  K: number;
  goals_for: number;
  goals_against: number;
  goals_diff: number;
  rating_one: number;
  rating_two: number;
  playing_home: Boolean;
};
*/

function CalcElo(value) {
  const CalcK = (K, goals_diff) => {
    if (goals_diff < 2) return K;
    if (goals_diff === 2) return K + K / 2;
    if (goals_diff === 3) return K + (K * 3) / 4;
    return 3 / 4 + (goals_diff - 3) / 8;
  };

  const CalcW = (goals_for, goals_against) => {
    if (goals_for > goals_against) return 1;
    if (goals_for === goals_against) return 0.5;
    return 0;
  };

  const CalcDr = (rating_one, rating_two, playing_home) => {
    if (playing_home) {
      rating_one += 100;
    }
    return rating_one - rating_two;
  };

  const CalcWe = (dr) => 1 / (Math.pow(10, -dr / 400) + 1);

  const k = CalcK(value.K, value.goals_diff);
  const w = CalcW(value.goals_for, value.goals_against);
  const dr = CalcDr(value.rating_one, value.rating_two, value.playing_home);
  const we = CalcWe(dr);

  return Math.round(value.Ro + k * (w - we));
}

module.exports = CalcElo;
