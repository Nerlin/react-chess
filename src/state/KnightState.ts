import { decorate, observable } from "mobx";
import KnightState from "../game/Knight";

decorate(KnightState, {
  position: observable,
  color:    observable,
});

export default KnightState;