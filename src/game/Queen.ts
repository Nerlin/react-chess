import Piece from "./Piece";
import Position from "./Position";
import Direction from "./Direction";
import Board from "./Board";

export default class Queen extends Piece {
  public get name(): string {
    return "queen";
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

    let availableMoves: Position[] = [];
    for (const direction of directions) {
      availableMoves = availableMoves.concat(this.getMovesTowards(direction, board));
    }
    return availableMoves;
  }
}