const RootDatabaseFolder = "./src/admin/database";
const MatchsCSVHeader =
  "date;home_team_id;home_team_goals;away_team_goals;away_team_id;tournament_id";

const MatchesBySeason = 38;

const TeamsLevels = {
  _1: MatchesBySeason,
  _2: MatchesBySeason * 2,
  _3: MatchesBySeason * 3,
  _4: MatchesBySeason * 4,
};

const GetTeamLevel = (matches) => {
  if (matches <= TeamsLevels._1) {
    return 1;
  }

  if (matches > TeamsLevels._1 && matches <= TeamsLevels._2) {
    return 2;
  }

  if (matches > TeamsLevels._2 && matches <= TeamsLevels._3) {
    return 3;
  }

  return 4;
};

module.exports = {
  RootDatabaseFolder,
  MatchsCSVHeader,
  TeamsPaths: [
    "/team/AME",
    "/team/ATG",
    "/team/ATH",
    "/team/ATL",
    "/team/AVA",
    "/team/BAH",
    "/team/BOT",
    "/team/CEA",
    "/team/CHA",
    "/team/COR",
    "/team/CTB",
    "/team/CRU",
    "/team/CSA",
    "/team/CUI",
    "/team/FLA",
    "/team/FLU",
    "/team/FOR",
    "/team/GOI",
    "/team/GRE",
    "/team/INT",
    "/team/JUV",
    "/team/PAL",
    "/team/PAR",
    "/team/RED",
    "/team/SAN",
    "/team/SAO",
    "/team/SPO",
    "/team/VAS",
    "/team/VIT",
  ],
  TeamsData: `${RootDatabaseFolder}/teams.csv`,
  TournamentsData: `${RootDatabaseFolder}/tournaments.csv`,
  MatchesFolder: `${RootDatabaseFolder}/matches`,
  TeamsRatingsFolder: `${RootDatabaseFolder}/ratings/teams`,
  RatingFolder: `${RootDatabaseFolder}/ratings`,
  RatingsData: `${RootDatabaseFolder}/ratings/ratings.csv`,
  TeamsLevels,
  GetTeamLevel,
};
