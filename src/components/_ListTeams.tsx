import Link from "next/link";
import { Fragment } from "react";
import { RatingType } from "../types";

interface ListTeamsProps {
  ratings: Array<RatingType>;
}

export const ListTeams: React.FC<ListTeamsProps> = ({ ratings }) => {
  return (
    <div className="list-teams">
      <div className="list-teams--header">
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
          <p className="list-teams--titles-diff" title="Evolução">
            +/-
          </p>
        </div>
      </div>
      <div className="list-teams--ratings">
        {ratings.map((rating, i) => {
          const diff = parseInt(rating.Rn) - parseInt(rating.Ro);
          const classDiff = diff > 0 ? "positive" : "negative";
          return (
            <Fragment key={i}>
              <Link href={`/team/${rating.id}`}>
                <div className="list-teams--team">
                  <p className="list-teams--team-pos">{i + 1}</p>
                  <p className="list-teams--team-name">{rating.name}</p>
                  <p className="list-teams--team-rate">{rating.Rn}</p>
                  <p
                    className={`list-teams--team-diff list-teams--team-diff-${classDiff}`}
                  >
                    {diff > 0 && "+"}
                    {diff}
                  </p>
                </div>
              </Link>
              <div className="list-teams--separator"></div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
