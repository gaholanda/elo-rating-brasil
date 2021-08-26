import { Fragment, useState, useEffect } from "react";
import { RatingType } from "../types";

import { ViewTeam } from "./_ViewTeam";

type IdTeam = boolean | string;

export const ListTeams: React.FC = () => {
  const [idTeam, setIdTeam] = useState<IdTeam>(false);
  const [ratings, setRatings] = useState<Array<RatingType>>([]);

  const viewTeam = (id: string) => {
    setIdTeam(id);
  };

  useEffect(() => {
    fetch("/api/ratings").then((response) => {
      response.json().then((data) => {
        setRatings(data);
      });
    });
  }, []);

  return (
    <Fragment>
      {ratings.length > 0 && (
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
                  <div
                    className="list-teams--team"
                    onClick={() => viewTeam(rating.id)}
                  >
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
                  <div className="list-teams--separator"></div>
                </Fragment>
              );
            })}
          </div>
        </div>
      )}
      {idTeam && (
        <div className="view-team" onClick={() => setIdTeam(false)}>
          <ViewTeam id={idTeam} />
        </div>
      )}
    </Fragment>
  );
};
