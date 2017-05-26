import * as gpio from 'rpio';
import { setInterval } from 'timers';

import Display from '../Display';
import Screen from '../Screen';

export enum MultiplexMode {
  ROW, COL,
}

// tslint:disable:no-bitwise

class LedMatrix implements Display {
  public static enabledListToByte(list: number[]): number {
    return list.reduce((data, enabled, i) => {
      if (enabled) {
        return data | (1 << i);
      } else {
        return data;
      }
    }, 0);
  }

  private mode: MultiplexMode = MultiplexMode.ROW;
  private readonly rows: number[];
  private readonly cols: number[];
  private do_show: boolean = false;

  constructor(rows: number[], cols: number[]) {
    this.cols = cols;
    this.rows = rows;

    this.openMatrix();
  }

  public tearDown() {
    this.closeMatrix();
  }

  public show(screen: Screen) {
    this.do_show = true;

    const matrix = screen.occupiedArea();

    return new Promise((resolve) => {
      while (this.do_show) {
        matrix.forEach((row, y) => {
          this.enableRow(y);

          row.forEach((is_set, x) => {
            if (is_set) {
              this.enableCol(x);
            }
          });

          this.disableRow(y);
        });
      }

      resolve();
    });
  }

  public clear(): void {
    this.do_show = false;
  }

  /**
   *
   * @param rows
   * @param cols
   */
  private openMatrix() {
    this.rows.concat(this.cols).forEach((pin) => {
      gpio.open(pin, gpio.OUTPUT, gpio.LOW);
    });
  }

  private closeMatrix() {
    this.rows.concat(this.cols).forEach((pin) => {
      gpio.close(pin);
    });
  }

  private enableRow(y: number): void {
    this.assertRowDefined(y);

    gpio.write(this.rows[y], gpio.HIGH);
  }

  private disableRow(y: number): void {
    this.assertRowDefined(y);

    gpio.write(this.rows[y], gpio.LOW);

    this.cols.forEach((col) => {
      gpio.write(col, gpio.LOW);
    });
  }

  private enableCol(x: number): void {
    this.assertColDefined(x);

    gpio.write(this.cols[x], gpio.HIGH);
  }

  private disableCol(x: number): void {
    this.assertColDefined(x);

    gpio.write(this.cols[x], gpio.LOW);
  }

  private assertColDefined(x: number): void {
    if (this.cols[x] === undefined) {
      throw new Error(`col ${x} not defined`);
    }
  }

  private assertRowDefined(y: number): void {
    if (this.rows[y] === undefined) {
      throw new Error(`row ${y} not defined`);
    }
  }
}

export default LedMatrix;
