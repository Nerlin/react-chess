import { decorate, observable } from "mobx";
import QueenState from "../game/Queen";

decorate(QueenState, {
  position: observable,
  color:    observable,
});

export default QueenState;