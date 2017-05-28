import * as gpio from 'rpio';
import { setTimeout } from 'timers';

import LedMatrix from '../display/LedMatrix';
import TorusScreen from '../screen/TorusScreen';
import numbers from '../shapes/numbers';

async function sleep(wait: number) {
  return new Promise((resolve) => setTimeout(resolve, wait));
}

const ROWS = [8, 10, 12, 16, 18, 22, 24, 26];
const COLS = [19, 21, 23, 29, 31, 33, 35, 37].reverse();

const display = new LedMatrix(ROWS, COLS);

const screen = new TorusScreen(8, 8, [numbers[0]]);

display.show(screen).then(() => console.log('done showing'));

sleep(2000).then(() => {
  console.log('done sleeping');
  display.clear();
});

// display.clear();
// display.tearDown();

