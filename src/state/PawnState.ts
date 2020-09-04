import { decorate, observable } from "mobx";
import PawnState from "../game/Pawn";

decorate(PawnState, {
  position: observable,
  color:    observable,
});

export default PawnState;