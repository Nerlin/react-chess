import Board from "./Board";
import Direction from "./Direction";
import Position from "./Position";

export enum PieceColor {
  White = "white",
  Black = "black"
}

export default abstract class Piece {
  public position: Position;
  public color: PieceColor;
  public selected: boolean = false;

  public constructor(position: Position | Position["code"], color: PieceColor) {
    if (typeof position === "string") {
      this.position = new Position(position);
    } else {
      this.position = position;
    }

    this.color = color;
  }

  public abstract get name(): string;
  public abstract getAllMoves(board: Board): Position[];

  public getAvailableMoves(board: Board): Position[] {
    const moves = this.getAllMoves(board);
    return moves.filter((move) => {
      const updatedBoard = board.copy();
      updatedBoard.set(move, this);
      return !updatedBoard.kingIsAttacked(this.color);
    });
  }

  public isOpponent(piece: Piece): boolean {
    return this.color !== piece.color;
  }

  protected canMove(position: Position, board: Board): boolean {
    if (!position.isOK(board)) {
      return false;
    }

    const piece = board.get(position);
    return !piece || piece.isOpponent(this);
  }

  protected getMovesTowards(direction: Direction, board: Board): Position[] {
    const moves: Position[] = [];

    let piece: Piece | undefined;
    let move = this.position.to(direction);
    while (!piece && move.isOK(board)) {
      if (this.canMove(move, board)) {
        moves.push(move);
      }
      piece = board.get(move);
      move = move.to(direction);
    }

    return moves;
  }
}