import Piece from "./Piece";
import Position from "./Position";
import Direction from "./Direction";
import Board from "./Board";


export default class Bishop extends Piece {
  public get name(): string {
    return "bishop";
  }

  public getAllMoves(board: Board): Position[] {
    const diagonals = [
      Direction.LeftUp,
      Direction.LeftDown,
      Direction.RightUp,
      Direction.RightDown
    ];

    let availableMoves: Position[] = [];
    for (const diagonal of diagonals) {
      availableMoves = availableMoves.concat(this.getMovesTowards(diagonal, board));
    }
    return availableMoves;
  }
}