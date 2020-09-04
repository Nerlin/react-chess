import classNames from "classnames";
import React, { useCallback } from "react";
import Position from "../game/Position";
import "./Cell.sass";

export interface CellProps {
  position: Position;
  selected?: boolean;
  available?: boolean;
  onClick(position: Position): void;
}

const Cell: React.FC<CellProps> = ({ position, selected, available, children, onClick }) => {
  const handleClick = useCallback(() => {
    if (available) {
      onClick(position);
    }
  }, [position, available, onClick]);

  const color = (position.x + position.y) % 2 === 0 ? "black" : "white";
  return (
    <div
      className={classNames("cell", `cell_${color}`, { "cell_selected": selected, "cell_available": available })}
      title={position.code}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default Cell;