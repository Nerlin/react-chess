import { decorate, observable } from "mobx";
import BishopState from "../game/Bishop";

decorate(BishopState, {
  position: observable,
  color:    observable,
});

export default BishopState;