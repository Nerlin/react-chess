import { decorate, observable } from "mobx";
import KingState from "../game/King";

decorate(KingState, {
  position: observable,
  color:    observable,
});

export default KingState;