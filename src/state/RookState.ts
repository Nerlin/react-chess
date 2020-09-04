import { decorate, observable } from "mobx";
import RookState from "../game/Rook";

decorate(RookState, {
  position: observable,
  color:    observable,
});

export default RookState;