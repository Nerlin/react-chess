import React, { useCallback } from "react";
import { PawnPromotion } from "../game/Pawn";
import { PieceColor } from "../game/Piece";
import Position from "../game/Position";
import BishopState from "../state/BishopState";
import KnightState from "../state/KnightState";
import QueenState from "../state/QueenState";
import RookState from "../state/RookState";
import Cell from "./Cell";
import Piece from "./Piece";
import "./PromotionDialog.sass";


export interface PromotionDialogProps {
  color: PieceColor;
  onSelect(promotion: PawnPromotion): void;
}

const PromotionDialog: React.FC<PromotionDialogProps> = ({ color, onSelect }) => {
  const chooseQueen = useCallback(() => {
    onSelect(QueenState);
  }, [onSelect]);

  const chooseKnight = useCallback(() => {
    onSelect(KnightState);
  }, [onSelect]);

  const chooseRook = useCallback(() => {
    onSelect(RookState);
  }, [onSelect]);

  const chooseBishop = useCallback(() => {
    onSelect(BishopState);
  }, [onSelect]);

  return (
    <dialog open className={"promotion-dialog"}>
      Select promotion:

      <div className={"promotion-dialog__chooses"}>
        <Cell position={queenPosition} onClick={chooseQueen}>
          <Piece piece={color === PieceColor.Black ? blackQueen : whiteQueen} onSelect={chooseQueen} />
        </Cell>

        <Cell position={knightPosition} onClick={chooseKnight}>
          <Piece piece={color === PieceColor.Black ? blackKnight : whiteKnight} onSelect={chooseKnight} />
        </Cell>

        <Cell position={rookPosition} onClick={chooseRook}>
          <Piece piece={color === PieceColor.Black ? blackRook : whiteRook} onSelect={chooseRook} />
        </Cell>

        <Cell position={bishopPosition} onClick={chooseBishop}>
          <Piece piece={color === PieceColor.Black ? blackBishop : whiteBishop} onSelect={chooseBishop} />
        </Cell>
      </div>
    </dialog>
  );
}

const queenPosition = new Position("A1");
const blackQueen = new QueenState(queenPosition, PieceColor.Black);
const whiteQueen = new QueenState(queenPosition, PieceColor.White);

const knightPosition = new Position("A2");
const blackKnight = new KnightState(knightPosition, PieceColor.Black);
const whiteKnight = new KnightState(knightPosition, PieceColor.White);

const rookPosition = new Position("A3");
const blackRook = new RookState(rookPosition, PieceColor.Black);
const whiteRook = new RookState(rookPosition, PieceColor.White);

const bishopPosition = new Position("A4");
const blackBishop = new BishopState(bishopPosition, PieceColor.Black);
const whiteBishop = new BishopState(bishopPosition, PieceColor.White);

export default PromotionDialog;