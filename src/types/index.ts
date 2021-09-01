export type RatingType = {
  id: string;
  Ro: string;
  Rn: string;
  matches: string;
  wins: string;
  draws: string;
  losses: string;
  name?: string;
  level?: number;
};

export type TeamType = {
  id: string;
  name: string;
};

export type TeamHistoryType = {
  date: string;
  result: string;
  team_id: string;
  team_Ro: string;
  team_goals: string;
  opp_team_goals: string;
  opp_team_id: string;
  opp_team_Ro: string;
  tournament_id: string;
  team_Rn: string;
  team_name: string;
  opp_team_name: string;
  timestamp: number;
};

export type MessageErrorType = {
  status: number;
  message: string;
};

export type MatchType = {
  date: string;
  home_team_id: string;
  home_team_goals: string;
  away_team_goals: string;
  away_team_id: string;
  tournament_id: string;
  home_team_name?: string;
  away_team_name?: string;
};

export type MatchHistoryType = {
  id: string;
  name: string;
  history: Array<TeamHistoryType>;
};
