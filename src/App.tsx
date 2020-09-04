import { observer } from "mobx-react";
import React from 'react';
import './App.sass';
import Game from './components/Game';
import { initChessBoard } from "./state/BoardState";
import GameState from "./state/GameState";

const game = new GameState(initChessBoard());

function App() {
  return (
    <Game game={game} />
  );
}

export default observer(App);
