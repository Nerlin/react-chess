import { action, computed, decorate, observable } from "mobx";
import BoardState from "../game/Board";
import { PieceColor } from "../game/Piece";
import Position from "../game/Position";
import BishopState from "./BishopState";
import KingState from "./KingState";
import KnightState from "./KnightState";
import PawnState from "./PawnState";
import QueenState from "./QueenState";
import RookState from "./RookState";


decorate(BoardState, {
  width:  observable,
  height: observable,
  board:  observable,
  cells:  computed,
  pieces: computed,
  put:    action.bound,
  set:    action.bound,
  move:   action.bound,
});


export function initChessBoard(): BoardState {
  const board = new BoardState();

  for (let x = 0; x < board.width; x++) {
    const whitePawn = new PawnState(Position.fromXY(x, 1), PieceColor.White);
    board.put(whitePawn);

    const blackPawn = new PawnState(Position.fromXY(x, board.height - 2), PieceColor.Black);
    board.put(blackPawn);
  }

  const whiteKing = new KingState("E1", PieceColor.White);
  board.put(whiteKing);

  const whiteQueen = new QueenState("D1", PieceColor.White);
  board.put(whiteQueen);

  const leftWhiteKnight = new KnightState("B1", PieceColor.White);
  board.put(leftWhiteKnight);

  const rightWhiteKnight = new KnightState("G1", PieceColor.White);
  board.put(rightWhiteKnight);

  const leftWhiteRook = new RookState("A1", PieceColor.White);
  board.put(leftWhiteRook);

  const rightWhiteRook = new RookState("H1", PieceColor.White);
  board.put(rightWhiteRook);

  const leftWhiteBishop = new BishopState("C1", PieceColor.White);
  board.put(leftWhiteBishop);

  const rightWhiteBishop = new BishopState("F1", PieceColor.White);
  board.put(rightWhiteBishop);

  const blackKing = new KingState("E8", PieceColor.Black);
  board.put(blackKing);

  const blackQueen = new QueenState("D8", PieceColor.Black);
  board.put(blackQueen);

  const leftBlackKnight = new KnightState("B8", PieceColor.Black);
  board.put(leftBlackKnight);

  const rightBlackKnight = new KnightState("G8", PieceColor.Black);
  board.put(rightBlackKnight);

  const leftBlackRook = new RookState("A8", PieceColor.Black);
  board.put(leftBlackRook);

  const rightBlackRook = new RookState("H8", PieceColor.Black);
  board.put(rightBlackRook);

  const leftBlackBishop = new BishopState("C8", PieceColor.Black);
  board.put(leftBlackBishop);

  const rightBlackBishop = new BishopState("F8", PieceColor.Black);
  board.put(rightBlackBishop);

  return board;
}

export function stalemateBoard(): BoardState {
  const board = new BoardState();
  board.put(new KingState("A8", PieceColor.Black));
  board.put(new KingState("D5", PieceColor.White));
  board.put(new QueenState("H7", PieceColor.White));
  return board;
}

export function promoteBoard(): BoardState {
  const board = new BoardState();
  board.put(new PawnState("D7", PieceColor.White));
  board.put(new KingState("A1", PieceColor.White));
  board.put(new KingState("G8", PieceColor.Black));
  return board;
}

export default BoardState;