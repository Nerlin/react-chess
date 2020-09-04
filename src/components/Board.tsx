import { observer } from "mobx-react";
import React, { useCallback } from "react";
import GamePiece from "../game/Piece";
import Position from "../game/Position";
import BoardState from "../state/BoardState";
import "./Board.sass";
import Cell from "./Cell";
import Piece from "./Piece";

export interface BoardProps {
  board: BoardState;
  selectedPiece: GamePiece | null;
  onPieceSelect(piece: GamePiece): void;
  onPieceMove(piece: GamePiece, position: Position): void;
}

const Board: React.FC<BoardProps> = ({ board, selectedPiece, onPieceSelect, onPieceMove }) => {
  const availableMoves = selectedPiece?.getAvailableMoves(board) ?? [];

  const move = useCallback((position: Position) => {
    onPieceMove(selectedPiece!, position);
  }, [selectedPiece, onPieceMove]);

  return (
    <div className={"board"}>
      <div className={"board__columns"}>
        {board.columns.map((column) =>
          <div key={column} className={"board__column"}>
            {column}
          </div>
        )}
      </div>

      <div className={"board__rows"}>
        {board.rows.map((row) =>
          <div key={row} className={"board__row"}>
            {row}
          </div>
        )}
      </div>

      <div className={"board__desk"}>
        {board.cells.map((cell) => {
          const piece = board.get(cell);
          const available = availableMoves.find(move => move.code === cell.code) != null;
          return (
            <Cell
              key={cell.code}
              position={cell}
              selected={selectedPiece === piece}
              available={available}
              onClick={move}
            >
              {piece && <Piece piece={piece} onSelect={onPieceSelect} />}
            </Cell>
          );
        })}
      </div>
    </div>
  )
}

export default observer(Board);