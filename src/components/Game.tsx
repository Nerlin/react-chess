import { observer } from "mobx-react";
import React, { useCallback } from "react";
import Board from "../components/Board";
import BoardStatus from "../game/BoardStatus";
import { PawnPromotion } from "../game/Pawn";
import GamePiece from "../game/Piece";
import Position from "../game/Position";
import GameState from "../state/GameState";
import "./Game.sass";
import PromotionDialog from "./PromotionDialog";


export interface GameProps {
  game: GameState;
}

const Game: React.FC<GameProps> = ({ game }) => {
  const selectPiece = useCallback((piece: GamePiece | null) => {
    game.select(piece);
  }, [game]);

  const movePiece = useCallback((piece: GamePiece, position: Position) => {
    game.move(piece, position);
  }, [game]);

  const promotePawn = useCallback((promotion: PawnPromotion) => {
    game.promotePawn(promotion);
  }, [game]);

  return (
    <main className={"game"}>
      <Board
        board={game.board}
        selectedPiece={game.selectedPiece}
        onPieceSelect={selectPiece}
        onPieceMove={movePiece}
      />

      <div className={"game__status"}>
        {game.boardStatus !== BoardStatus.None ? game.boardStatus.toString() : ""}
      </div>

      <div className={"game__winner"}>
        {game.isOver ? game.winner ?
          <>
            <span className={"game__winner__color"}>${game.winner}</span> is the winner.
          </> : "Draw" : ""}
      </div>

      {game.promoting &&
        <PromotionDialog color={game.promoting.color} onSelect={promotePawn} />
      }
    </main>
  )
}

export default observer(Game);