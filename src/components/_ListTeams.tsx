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
            Rating
          </p>
        </div>
      </div>
      <div className="list-teams--ratings">
        {ratings.map((rating, i) => {
          return (
            <Fragment key={i}>
              <Link href={`/team/${rating.id}`}>
                <div className="list-teams--team">
                  <p className="list-teams--team-pos">{i + 1}</p>
                  <p className="list-teams--team-name">{rating.name}</p>
                  <p className="list-teams--team-rate">{rating.Rn}</p>
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
