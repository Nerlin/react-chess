import { action, computed, decorate, observable } from "mobx";
import GameState from "../game/Game";

decorate(GameState, {
  board:         observable,
  selectedPiece: observable,
  currentTurn:   observable,
  boardStatus:   observable,
  promoting:     observable,
  isOver:        computed,
  select:        action.bound,
  passTurn:      action.bound,
  move:          action.bound,
  promotePawn:   action.bound,
});

export default GameState;

