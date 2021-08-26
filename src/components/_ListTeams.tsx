import { Fragment, RefObject, useRef } from "react";
import { ViewTeam } from "./_ViewTeam";

export const ListTeams: React.FC = () => {
  const viewTeam = ({ current }: RefObject<HTMLDivElement>) => {
    current?.classList.toggle("open-view-team");
  };

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
        {Array.from({ length: 20 }, () => "").map((_, i) => {
          const item = useRef<HTMLDivElement>(null);

          return (
            <Fragment key={i}>
              <div
                className="list-teams--team"
                onClick={() => viewTeam(item)}
                ref={item}
              >
                <p className="list-teams--team-pos">{i + 1}</p>
                <p className="list-teams--team-name">Team Name</p>
                <p className="list-teams--team-rate">1900</p>
                <p className="list-teams--team-diff list-teams--team-diff-positive">
                  +12
                </p>
              </div>
              <ViewTeam />
              <div className="list-teams--separator"></div>
            </Fragment>
          );
        })}
        <div className="list-teams--team">
          <p className="list-teams--team-pos">11</p>
          <p className="list-teams--team-name">Team Name</p>
          <p className="list-teams--team-rate">90</p>
          <p className="list-teams--team-diff list-teams--team-diff-negative">
            -12
          </p>
        </div>
      </div>
    </div>
  );
};
