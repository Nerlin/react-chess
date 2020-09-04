import Board from "./Board";
import Direction from "./Direction";

/**
 * Represents a board position in a chess format:
 * G4, A7, B6 and etc.
 */
export default class Position {
  public readonly code: string;
  public readonly x: number;
  public readonly y: number;

  constructor(code: string) {
    this.code = code;
    [this.x, this.y] = Position.toXY(code);
  }

  public isOK(board: Board): boolean {
    return this.x >= 0 && this.x < board.width && this.y >= 0 && this.y < board.height; 
  }

  public to(direction: Direction): Position {
    switch (direction) {
      case Direction.Up: return this.up();
      case Direction.Down: return this.down();
      case Direction.Left: return this.left();
      case Direction.Right: return this.right();
      case Direction.LeftUp: return this.left().up();
      case Direction.LeftDown: return this.left().down();
      case Direction.RightUp: return this.right().up();
      case Direction.RightDown: return this.right().down();
    }
  }

  public up(): Position {
    return Position.fromXY(this.x, this.y + 1);
  }

  public down(): Position {
    return Position.fromXY(this.x, this.y - 1);
  }

  public left(): Position {
    return Position.fromXY(this.x - 1, this.y);
  }

  public right(): Position {
    return Position.fromXY(this.x + 1, this.y);
  }

  public static toXY(code: string): [number, number] {
    const x = code.charCodeAt(0) - "A".charCodeAt(0);
    const y = code.charCodeAt(1) - "1".charCodeAt(0);
    return [x, y];
  }

  public static toCode(x: number, y: number): string {
    const xCode = Position.toColumn(x);
    const yCode = Position.toRow(y);
    return `${xCode}${yCode}`;
  }

  public static toColumn(x: number): string {
    return String.fromCharCode(x + "A".charCodeAt(0));
  }

  public static toRow(y: number): string {
    return String.fromCharCode(y + "1".charCodeAt(0));
  }

  public static fromXY(x: number, y: number): Position {
    const code = Position.toCode(x, y);
    return new Position(code);
  }

  public toString() {
    return this.code;
  }
}

