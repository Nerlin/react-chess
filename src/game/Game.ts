import Board from "./Board";
import BoardStatus from "./BoardStatus";
import Pawn, { PawnPromotion } from "./Pawn";
import Piece, { PieceColor } from "./Piece";
import Position from "./Position";

export default class Game {
  public readonly board: Board;
  public boardStatus: BoardStatus;
  public currentTurn: PieceColor;
  public winner: PieceColor | null;
  public selectedPiece: Piece | null;
  public promoting: Pawn | null;

  public constructor(board: Board) {
    this.board = board;
    this.selectedPiece = null;
    this.currentTurn = PieceColor.White;
    this.winner = null;
    this.boardStatus = BoardStatus.None;
    this.promoting = null;
  }

  public select(piece: Piece | null): void {
    if (this.isOver) {
      return;
    }

    if (this.selectedPiece) {
      this.selectedPiece.selected = false;
    }

    if (!piece) {
      this.selectedPiece = null;
    } else if (piece.color === this.currentTurn) {
      this.selectedPiece = piece;
      this.selectedPiece.selected = true;
    }
  }

  public passTurn(): void {
    if (this.isOver) {
      return;
    }

    this.select(null);
    this.currentTurn = this.currentTurn === PieceColor.White ? PieceColor.Black : PieceColor.White;
  }

  public move(piece: Piece, to: Position): void {
    this.board.move(piece, to);

    const opponent = this.currentTurn === PieceColor.White ? PieceColor.Black : PieceColor.White;
    this.boardStatus = this.board.checkmate(opponent);

    if (this.boardStatus === BoardStatus.Checkmate) {
      this.winner = this.currentTurn;
      this.selectedPiece = null;
    } else if (this.boardStatus === BoardStatus.Stalemate) {
      this.selectedPiece = null;
    } else {
      this.promoting = piece instanceof Pawn && piece.canBePromoted(this.board) ? piece : null;
      if (!this.promoting) {
        this.passTurn();
      }
    }
  }

  public promotePawn(promotion: PawnPromotion): void {
    if (!this.promoting) {
      throw new Error("No pawn to promote.");
    }
    const pawn = this.promoting;
    const piece = new promotion(pawn.position, pawn.color);
    this.board.put(piece);
    this.promoting = null;
    this.passTurn();
  }

  public get isOver(): boolean {
    return (
      this.boardStatus === BoardStatus.Checkmate ||
      this.boardStatus === BoardStatus.Stalemate
    );
  }
}