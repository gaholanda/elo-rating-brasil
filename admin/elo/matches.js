const FS = require("fs");
const CSV2JSON = require("convert-csv-to-json");

const {
  MatchesFolder,
  TeamsRatingsFolder,
  TournamentsData,
  TeamsData,
} = require("../config");
const CalcElo = require("./calcelo");

function teamRatingsFileExists(team_id) {
  let file = `${TeamsRatingsFolder}/${team_id}.csv`;
  let fileExists = FS.existsSync(file);
  return fileExists;
}

function getTeamRatings(team_id) {
  return CSV2JSON.getJsonFromCsv(`${TeamsRatingsFolder}/${team_id}.csv`);
}

function updateTeamRatings(team_id, content) {
  let file = `${TeamsRatingsFolder}/${team_id}.csv`;
  let fileExists = FS.existsSync(file);

  if (!fileExists) {
    FS.writeFileSync(
      file,
      `date;result;team_id;team_Ro;team_goals;opp_team_goals;opp_team_id;opp_team_Ro;tournament_id;team_Rn\n${content}`
    );
  } else {
    FS.appendFileSync(file, `\n${content}`);
  }
}

function CalcRatings() {
  console.log(">>> Calculando ratings...");
  let folder = process.argv[2];
  let file = process.argv[3];
  let teams = CSV2JSON.getJsonFromCsv(`${TeamsData}`);
  let matches = CSV2JSON.getJsonFromCsv(
    `${MatchesFolder}/${folder}/${file}.csv`
  );
  let tournaments = CSV2JSON.getJsonFromCsv(`${TournamentsData}`);

  matches.map((match, i) => {
    if (i > -1) {
      let home_team = {
        ...teams.filter((team) => team.id === match.home_team_id)[0],
        Ro: 1500,
        Rn: 0,
      };
      let away_team = {
        ...teams.filter((team) => team.id === match.away_team_id)[0],
        Ro: 1500,
        Rn: 0,
      };

      let tournament = tournaments.filter(
        (t) => t.id === match.tournament_id
      )[0];

      let home_team_ratings = [];
      let away_team_ratings = [];
      let home_matches = 1;
      let away_matches = 1;

      if (teamRatingsFileExists(home_team.id)) {
        home_team_ratings = getTeamRatings(home_team.id);
      }

      if (teamRatingsFileExists(away_team.id)) {
        away_team_ratings = getTeamRatings(away_team.id);
      }

      if (home_team_ratings.length > 0) {
        home_matches = home_team_ratings.length;
        home_team.Ro = parseInt(home_team_ratings.pop().team_Rn);
      }

      if (away_team_ratings.length > 0) {
        away_matches = away_team_ratings.length;
        away_team.Ro = parseInt(away_team_ratings.pop().team_Rn);
      }

      const home_Ro = home_team.Ro + Math.round(home_matches / 2);
      const away_Ro = away_team.Ro + Math.round(away_matches / 2);

      home_team.Rn = CalcElo({
        Ro: home_Ro,
        K: parseInt(tournament.k),
        goals_for: parseInt(match.home_team_goals),
        goals_against: parseInt(match.away_team_goals),
        goals_diff:
          parseInt(match.home_team_goals) - parseInt(match.away_team_goals),
        rating_one: home_Ro,
        rating_two: away_Ro,
        playing_home: true,
      });

      (home_team.result =
        parseInt(match.home_team_goals) > parseInt(match.away_team_goals)
          ? "win"
          : parseInt(match.home_team_goals) === parseInt(match.away_team_goals)
          ? "draw"
          : "loss"),
        (away_team.Rn = CalcElo({
          Ro: away_Ro,
          K: parseInt(tournament.k),
          goals_for: parseInt(match.away_team_goals),
          goals_against: parseInt(match.home_team_goals),
          goals_diff:
            parseInt(match.away_team_goals) - parseInt(match.home_team_goals),
          rating_one: away_Ro,
          rating_two: home_Ro,
        }));
      (away_team.result =
        parseInt(match.away_team_goals) > parseInt(match.home_team_goals)
          ? "win"
          : parseInt(match.away_team_goals) === parseInt(match.home_team_goals)
          ? "draw"
          : "loss"),
        updateTeamRatings(
          home_team.id,
          `${match.date};${home_team.result};${home_team.id};${home_Ro};${match.home_team_goals};${match.away_team_goals};${away_team.id};${away_Ro};${match.tournament_id};${home_team.Rn}`
        );
      updateTeamRatings(
        away_team.id,
        `${match.date};${away_team.result};${away_team.id};${away_Ro};${match.away_team_goals};${match.home_team_goals};${home_team.id};${home_Ro};${match.tournament_id};${away_team.Rn}`
      );
    } else {
      return false;
    }
  });
}

CalcRatings();
