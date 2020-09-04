import Piece from "./Piece";
import Position from "./Position";
import Direction from "./Direction";
import Board from "./Board";


export default class Rook extends Piece {
  public get name(): string {
    return "rook";
  }

  public getAllMoves(board: Board): Position[] {
    const lines = [
      Direction.Left,
      Direction.Right,
      Direction.Up,
      Direction.Down
    ];

    let availableMoves: Position[] = [];
    for (const line of lines) {
      availableMoves = availableMoves.concat(this.getMovesTowards(line, board));
    }
    return availableMoves;
  }
}