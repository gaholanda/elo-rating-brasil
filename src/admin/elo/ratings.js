const FS = require("fs");
const CSV2JSON = require("convert-csv-to-json");
const {
  TeamsRatingsFolder,
  RatingFolder,
  TeamsData,
  TeamsLevels,
} = require("../config");

function teamRatingsFileExists(team_id) {
  let file = `${TeamsRatingsFolder}/${team_id}.csv`;
  let fileExists = FS.existsSync(file);
  return fileExists;
}

function getWinsDrawsLosses(matches) {
  let Total = {
    wins: 0,
    draws: 0,
    losses: 0,
  };

  matches.map((match) => {
    let { result } = match;
    if (result === "win") {
      Total.wins = Total.wins + 1;
    }

    if (result === "draw") {
      Total.draws = Total.draws + 1;
    }

    if (result === "loss") {
      Total.losses = Total.losses + 1;
    }
  });

  return Total;
}

function getTeamRatings(team_id) {
  return CSV2JSON.getJsonFromCsv(`${TeamsRatingsFolder}/${team_id}.csv`);
}

function CreateRanking() {
  console.log("Criando ranking...");
  let file = process.argv[2];
  let teams = CSV2JSON.getJsonFromCsv(`${TeamsData}`);
  let ranking_file = `${RatingFolder}/${file}.csv`;
  let rankings = [];

  FS.writeFileSync(ranking_file, `id;Ro;Rn;matches;wins;draws;losses\n`);

  teams.map((team) => {
    if (teamRatingsFileExists(team.id)) {
      const team_ratings = getTeamRatings(team.id);
      const winsDrawsLosses = getWinsDrawsLosses(team_ratings);
      const matches = team_ratings.length;
      const last_rating = team_ratings.pop();
      const team_rate = {
        ...team,
        matches: matches,
        Ro: last_rating.team_Ro,
        Rn: last_rating.team_Rn,
        ...winsDrawsLosses,
      };
      rankings.push(team_rate);
    }
  });

  const TeamsLevel1 = rankings.filter(
    (ranking) => ranking.matches <= TeamsLevels._1
  );

  const TeamsLevel2 = rankings.filter(
    (ranking) =>
      ranking.matches > TeamsLevels._1 && ranking.matches <= TeamsLevels._2
  );

  const TeamsLevel3 = rankings.filter(
    (ranking) =>
      ranking.matches > TeamsLevels._2 && ranking.matches <= TeamsLevels._3
  );

  const TeamsLevel4 = rankings.filter(
    (ranking) =>
      ranking.matches > TeamsLevels._3 && ranking.matches <= TeamsLevels._4
  );

  const getRankings = [
    ...TeamsLevel4,
    ...TeamsLevel3,
    ...TeamsLevel2,
    ...TeamsLevel1,
  ];

  getRankings.map((rate) => {
    const content = `${rate.id};${rate.Ro};${rate.Rn};${rate.matches};${rate.wins};${rate.draws};${rate.losses}`;
    FS.appendFileSync(ranking_file, `${content}\n`);
  });
}

CreateRanking();
