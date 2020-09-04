import Piece from "./Piece";
import Position from "./Position";
import Board from "./Board";


export default class Knight extends Piece {
  public get name(): string {
    return "knight";
  }

  public getAllMoves(board: Board): Position[] {
    const moves = [
      this.position.up().left().left(),
      this.position.up().right().right(),
      this.position.down().left().left(),
      this.position.down().right().right(),
      this.position.up().up().left(),
      this.position.up().up().right(),
      this.position.down().down().left(),
      this.position.down().down().right()
    ];

    const availableMoves = [];
    for (const position of moves) {
      if (this.canMove(position, board)) {
        availableMoves.push(position);
      }
    }

    return availableMoves;
  }
}