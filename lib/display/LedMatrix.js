"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gpio = require("rpio");
var MultiplexMode;
(function (MultiplexMode) {
    MultiplexMode[MultiplexMode["ROW"] = 0] = "ROW";
    MultiplexMode[MultiplexMode["COL"] = 1] = "COL";
})(MultiplexMode = exports.MultiplexMode || (exports.MultiplexMode = {}));
// tslint:disable:no-bitwise
class LedMatrix {
    constructor(rows, cols) {
        this.mode = MultiplexMode.ROW;
        this.do_show = false;
        this.cols = cols;
        this.rows = rows;
        this.openMatrix();
    }
    static enabledListToByte(list) {
        return list.reduce((data, enabled, i) => {
            if (enabled) {
                return data | (1 << i);
            }
            else {
                return data;
            }
        }, 0);
    }
    tearDown() {
        this.closeMatrix();
    }
    show(screen) {
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
    clear() {
        this.do_show = false;
    }
    /**
     *
     * @param rows
     * @param cols
     */
    openMatrix() {
        this.rows.concat(this.cols).forEach((pin) => {
            gpio.open(pin, gpio.OUTPUT, gpio.LOW);
        });
    }
    closeMatrix() {
        this.rows.concat(this.cols).forEach((pin) => {
            gpio.close(pin);
        });
    }
    enableRow(y) {
        this.assertRowDefined(y);
        gpio.write(this.rows[y], gpio.HIGH);
    }
    disableRow(y) {
        this.assertRowDefined(y);
        gpio.write(this.rows[y], gpio.LOW);
        this.cols.forEach((col) => {
            gpio.write(col, gpio.LOW);
        });
    }
    enableCol(x) {
        this.assertColDefined(x);
        gpio.write(this.cols[x], gpio.HIGH);
    }
    disableCol(x) {
        this.assertColDefined(x);
        gpio.write(this.cols[x], gpio.LOW);
    }
    assertColDefined(x) {
        if (this.cols[x] === undefined) {
            throw new Error(`col ${x} not defined`);
        }
    }
    assertRowDefined(y) {
        if (this.rows[y] === undefined) {
            throw new Error(`row ${y} not defined`);
        }
    }
}
exports.default = LedMatrix;
