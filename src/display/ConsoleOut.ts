import { moveCursor } from 'readline';

import Display from '../Display';
import Screen from '../Screen';

class ConsoleOut implements Display {
  public static screenToString(screen: Screen) {
    return screen.occupiedArea().map((row) => row.join('')).join('\n');
  }

  private calls: number = 0;

  public show(screen: Screen): void {
    const stream = process.stdout;

    const display_width = screen.width;
    const display_height = screen.height + 1;

    if (this.calls > 0) {
      moveCursor(stream, -display_width, -display_height);
    }
    stream.write(`${this.calls}\n`);
    stream.write(ConsoleOut.screenToString(screen) + '\n');

    this.calls += 1;
  }
}

export default ConsoleOut;
