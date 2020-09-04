import Bishop from "./Bishop";
import Board from "./Board";
import Direction from "./Direction";
import Knight from "./Knight";
import Piece, { PieceColor } from "./Piece";
import Position from "./Position";
import Queen from "./Queen";
import Rook from "./Rook";


export default class Pawn extends Piece {
  public get name(): string {
    return "pawn";
  }

  public getAllMoves(board: Board): Position[] {
    const availableMoves = [];

    let attackDirection: Direction;
    if (this.color === PieceColor.White) {
      attackDirection = Direction.Up;
    } else {
      attackDirection = Direction.Down;
    }
    
    const leftCapture = this.position.to(attackDirection + Direction.Left);
    if (leftCapture.isOK(board)) {
      const piece = board.get(leftCapture);
      if (piece?.isOpponent(this)) {
        availableMoves.push(leftCapture);
      }
    }

    const rightCapture = this.position.to(attackDirection + Direction.Right);
    if (rightCapture.isOK(board)) {
      const piece = board.get(rightCapture);
      if (piece?.isOpponent(this)) {
        availableMoves.push(rightCapture);
      }
    }

    const forward = this.position.to(attackDirection);
    if (forward.isOK(board)) {
      const piece = board.get(forward);
      if (!piece) {
        availableMoves.push(forward);
      }

      const initialRow = this.color === PieceColor.White ? 1 : board.height - 2;
      if (this.position.y === initialRow) {
        const next = forward.to(attackDirection);
        if (next.isOK(board)) {
          const piece = board.get(next);
          if (!piece) {
            availableMoves.push(next);
          }
        }
      }
    }

    return availableMoves;
  }

  public canBePromoted(board: Board): boolean {
    if (this.color === PieceColor.Black) {
      return this.position.y === 0;
    }
    if (this.color === PieceColor.White) {
      return this.position.y === board.height - 1;
    }
    return false;
  }
}

export type PawnPromotion = typeof Knight | typeof Bishop | typeof Rook | typeof Queen