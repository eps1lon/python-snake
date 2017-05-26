"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
class ConsoleOut {
    constructor() {
        this.calls = 0;
    }
    static screenToString(screen) {
        return screen.occupiedArea().map((row) => row.join('')).join('\n');
    }
    show(screen) {
        const stream = process.stdout;
        const display_width = screen.width;
        const display_height = screen.height + 1;
        if (this.calls > 0) {
            readline_1.moveCursor(stream, -display_width, -display_height);
        }
        stream.write(`${this.calls}\n`);
        stream.write(ConsoleOut.screenToString(screen) + '\n');
        this.calls += 1;
    }
}
exports.default = ConsoleOut;
