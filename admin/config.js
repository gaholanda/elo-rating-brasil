const RootDatabaseFolder = "./admin/database";
const MatchsCSVHeader =
  "date;home_team_id;home_team_goals;away_team_goals;away_team_id;tournament_id\r";

module.exports = {
  RootDatabaseFolder,
  MatchsCSVHeader,
  TeamsData: `${RootDatabaseFolder}/teams.csv`,
  TournamentsData: `${RootDatabaseFolder}/tournaments.csv`,
  MatchesFolder: `${RootDatabaseFolder}/matches`,
  TeamsRatingsFolder: `${RootDatabaseFolder}/ratings/teams`,
  RatingFolder: `${RootDatabaseFolder}/ratings`,
  LastRatingData: "ratings.csv",
};
