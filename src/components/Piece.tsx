import GamePiece from "../game/Piece";
import React, { useCallback } from "react";
import "./Piece.sass";
import { observer } from "mobx-react";

export interface PieceProps {
  piece: GamePiece;
  onSelect(piece: GamePiece | null): void;
}

const Piece: React.FC<PieceProps> = ({ piece, onSelect }) => {
  const select = useCallback(() => {
    onSelect(piece.selected ? null : piece);
  }, [piece, onSelect])

  return (
    <div
      className={`piece piece_${piece.color}`}
      onClick={select}
    >
      {pieces[piece.name]}
    </div>
  )
}

const pieces: { [name: string]: string } = {
  "king": "♚",
  "queen": "♛",
  "rook": "♜",
  "bishop": "♝",
  "knight": "♞",
  "pawn": "♟︎",
}

export default observer(Piece);