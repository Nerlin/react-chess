import BoardStatus from "./BoardStatus";
import King from "./King";
import Piece, { PieceColor } from "./Piece";
import Position from "./Position";


export default class Board {
  public board: Map<Position["code"], Piece>;

  public constructor(
    public readonly width: number = 8,
    public readonly height: number = 8
  ) {
    this.board = new Map<Position["code"], Piece>();
  }

  public get pieces(): Piece[] {
    return Array.from(this.board.values());
  }

  public get cells(): Position[] {
    const cells: Position[] = [];
    for (let y = this.height - 1; y >= 0; y--) {
      for (let x = 0; x < this.width; x++) {
        cells.push(Position.fromXY(x, y));
      }
    }
    return cells;
  }

  public get rows(): string[] {
    const rows: string[] = [];
    for (let row = this.height - 1; row >= 0; row--) {
      rows.push(Position.toRow(row));
    }
    return rows;
  }

  public get columns(): string[] {
    const columns: string[] = [];
    for (let column = 0; column < this.width; column++) {
      columns.push(Position.toColumn(column));
    }
    return columns;
  }

  public get(position: Position | Position["code"]): Piece | undefined {
    let code;
    if (position instanceof Position) {
      code = position.code;
    } else {
      code = position;
    }
    return this.board.get(code);
  }

  public move(piece: Piece, to: Position | Position["code"]): void {
    let position: Position;
    if (to instanceof Position) {
      position = to;
    } else {
      position = new Position(to);
    }

    this.set(position, piece);
    piece.position = position;
  }

  public put(piece: Piece): void {
    this.set(piece.position, piece);
  }

  public set(position: Position | Position["code"], piece: Piece | undefined): void {
    let code;
    if (position instanceof Position) {
      code = position.code;
    } else {
      code = position;
    }

    if (piece) {
      const previous = this.board.get(piece.position.code);
      if (previous === piece) {
        this.board.delete(previous.position.code);
      }
      this.board.set(code, piece);
    } else {
      this.board.delete(code);
    }
  }

  public copy(): Board {
    const board = new Board();
    for (const [key, value] of this.board.entries()) {
      board.set(key, value);
    }
    return board;
  }

  public kingIsAttacked(color: PieceColor, kingPosition?: Position): boolean {
    let king: Piece | undefined;
    if (kingPosition) {
      king = this.get(kingPosition);
    } else {
      king = this.pieces.find(piece => piece instanceof King && piece.color === color);
      kingPosition = king?.position;
    }

    if (!king) {
      throw new Error("King was not found.");
    }

    const attacking = this.pieces.filter(
      piece => piece.color !== color && piece.getAllMoves(this).find(move => move.code === kingPosition!.code)
    );

    return attacking.length > 0;
  }

  public checkmate(color: PieceColor): BoardStatus {
    if (!this.kingIsAttacked(color)) {
      const playerHasMoves = this.pieces.some(piece => piece.color === color && piece.getAvailableMoves(this).length > 0);
      if (playerHasMoves) {
        return BoardStatus.None;
      } else {
        return BoardStatus.Stalemate;
      }
    }

    const king = this.pieces.find(piece => piece instanceof King && piece.color === color);
    const kingMoves = king!.getAvailableMoves(this);
    if (kingMoves.length) {
      return BoardStatus.Check;
    } else {
      const protecting = this.pieces.filter(piece =>
        piece.color === color &&
        piece !== king &&
        piece.getAvailableMoves(this).length
      );
      if (protecting.length) {
        return BoardStatus.Check;
      } else {
        return BoardStatus.Checkmate;
      }
    }
  }
}