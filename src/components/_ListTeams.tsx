import { Fragment } from "react";
import { RatingType } from "../types";

interface ListTeamsProps {
  ratings: Array<RatingType>;
  level: number;
}

export const ListTeams: React.FC<ListTeamsProps> = ({ ratings, level }) => {
  return (
    <div className="list-teams">
      <div className="list-teams--header">
        <h1 className="list-teams--level">
          {level} temporada{level > 1 ? "s" : ""}
        </h1>
        <div className="list-teams--titles">
          <p className="list-teams--titles-pos" title="Posição">
            Pos
          </p>
          <p className="list-teams--titles-name" title="Time">
            Time
          </p>
          <p className="list-teams--titles-rate" title="Rating">
            R
          </p>
          <p className="list-teams--titles-matches" title="Jogos">
            J
          </p>
        </div>
      </div>
      <div className="list-teams--ratings">
        {ratings
          .sort((a, b) => parseInt(b.Rn) - parseInt(a.Rn))
          .map((rating, i) => {
            return (
              <Fragment key={i}>
                <div className="list-teams--team">
                  <p className="list-teams--team-pos">{i + 1}</p>
                  <p className="list-teams--team-name">{rating.name}</p>
                  <p className="list-teams--team-rate">{rating.Rn}</p>
                  <p className="list-teams--team-matches">{rating.matches}</p>
                </div>
                <div className="list-teams--separator"></div>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
};
