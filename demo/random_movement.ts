import { moveCursor } from 'readline';

import Display from '../Display';
import ConsoleOut from '../display/ConsoleOut';
import SnakeGame, { Command } from '../SnakeGame';
import { rand } from '../util';

const display: Display = new ConsoleOut();

const game = new SnakeGame(8, 8);

const game_immediate = setInterval(() => {
  game.tick();

  if (Math.random() >= .5) {
    const cmd = [
      Command.UP,
      Command.RIGHT,
      Command.DOWN,
      Command.LEFT,
    ][rand(0, 3)];

    game.invoke(cmd);
  }

  display.show(game.screen());
}, 1000);
