import Board from "./Board";
import Direction from "./Direction";
import Piece from "./Piece";
import Position from "./Position";


export default class King extends Piece {
  public get name(): string {
    return "king";
  }

  public getAllMoves(board: Board): Position[] {
    const directions = [
      Direction.Left,
      Direction.Right,
      Direction.Up,
      Direction.Down,
      Direction.LeftUp,
      Direction.LeftDown,
      Direction.RightUp,
      Direction.RightDown
    ];

    const availableMoves: Position[] = [];
    for (const direction of directions) {
      const move = this.position.to(direction);
      if (this.canMove(move, board)) {
        availableMoves.push(move);
      }
    }

    return availableMoves;
  }

  public getAvailableMoves(board: Board): Position[] {
    const moves = this.getAllMoves(board);
    return moves.filter((move) => {
      const updatedBoard = board.copy();
      updatedBoard.set(move, this);
      return !updatedBoard.kingIsAttacked(this.color, move);
    });
  }
}