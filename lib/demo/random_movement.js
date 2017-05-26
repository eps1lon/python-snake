"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleOut_1 = require("../display/ConsoleOut");
const SnakeGame_1 = require("../SnakeGame");
const util_1 = require("../util");
const display = new ConsoleOut_1.default();
const game = new SnakeGame_1.default(8, 8);
const game_immediate = setInterval(() => {
    game.tick();
    if (Math.random() >= .5) {
        const cmd = [
            SnakeGame_1.Command.UP,
            SnakeGame_1.Command.RIGHT,
            SnakeGame_1.Command.DOWN,
            SnakeGame_1.Command.LEFT,
        ][util_1.rand(0, 3)];
        game.invoke(cmd);
    }
    display.show(game.screen());
}, 1000);
