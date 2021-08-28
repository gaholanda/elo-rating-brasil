import { NextPage } from "next";
import { useEffect, useState } from "react";
import { TeamHistoryType, TeamType, MatchHistoryType } from "../types";

interface MatchesProps {
  teams: Array<MatchHistoryType>;
}

const Matches: NextPage<MatchesProps> = ({ teams }) => {
  const [team, setTeam] = useState<TeamType>();
  const [matches, setMatches] = useState<Array<TeamHistoryType>>([]);
  const [showMatches, setShowMatches] = useState(false);

  useEffect(() => {
    if (team) {
      setShowMatches(true);
      setMatches(teams.filter((_team) => _team.id == team.id)[0].history);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [team]);

  return (
    <div className="container">
      {showMatches && (
        <div className="button-back">
          <button onClick={() => setShowMatches(false)}>Voltar</button>
        </div>
      )}
      <div className="matches">
        {!showMatches && (
          <>
            <div className="matches--header">
              <h3 className="matches--header-title">Escolha o time</h3>
            </div>
            <div className="matches--teams">
              {teams.map(({ id, name }) => (
                <div
                  key={`team-${id}`}
                  className="matches--teams-team"
                  title={name}
                  style={{ backgroundImage: `url(/images/teams/${id}.png)` }}
                  onClick={() => setTeam({ id, name })}
                />
              ))}
            </div>
          </>
        )}
        {showMatches && matches.length > 0 && (
          <div className="matches--content">
            <div className="matches--content-header">
              <div className="matches--content-title">
                <h3>{team?.name}</h3>
              </div>
            </div>
            {matches.map((match, i) => (
              <div
                key={`match-${match.team_id}-${i}`}
                className="matches--match"
              >
                <div
                  className="matches--match-logo"
                  title={match.opp_team_name}
                  style={{
                    backgroundImage: `url(/images/teams/${match.team_id}.png)`,
                  }}
                />
                <div
                  className="matches--match-logo"
                  title={match.opp_team_name}
                  style={{
                    backgroundImage: `url(/images/teams/${match.opp_team_id}.png)`,
                  }}
                />
                <div className="matches--match-info">
                  <div className={`tag ${match.result}`} />
                  <div className="matches--match-data">
                    <label>Data</label>
                    <span>{match.date}</span>
                  </div>
                  <div className="matches--match-data">
                    <label>Placar</label>
                    <span>
                      {match.team_goals}x{match.opp_team_goals}
                    </span>
                  </div>
                  <div className="matches--match-data">
                    <label>Rating</label>
                    <span>{match.team_Rn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;

export async function getStaticProps() {
  const CSV2JSON = require("convert-csv-to-json");
  const { TeamsData, TeamsRatingsFolder } = require("../admin/config");

  const teams: Array<TeamType> = CSV2JSON.getJsonFromCsv(TeamsData);
  const teamsWithHistory: Array<MatchHistoryType> = teams.map((team) => {
    const teamHistory = CSV2JSON.getJsonFromCsv(
      `${TeamsRatingsFolder}/${team.id}.csv`
    );
    const teamHistoryWithTimestamp: Array<TeamHistoryType> = teamHistory.map(
      (history: TeamHistoryType) => {
        const date = history.date.split("/");
        const timestamp = new Date(
          `${date[2]}/${date[1]}/${date[0]}`
        ).getTime();
        return {
          ...history,
          timestamp: timestamp,
        };
      }
    );

    return {
      ...team,
      history: teamHistoryWithTimestamp.sort(
        (a, b) => b.timestamp - a.timestamp
      ),
    };
  });

  return {
    props: {
      teams: teamsWithHistory,
    },
  };
}
