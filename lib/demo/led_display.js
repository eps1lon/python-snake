"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const timers_1 = require("timers");
const LedMatrix_1 = require("../display/LedMatrix");
const TorusScreen_1 = require("../screen/TorusScreen");
const numbers_1 = require("../shapes/numbers");
function sleep(wait) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => timers_1.setTimeout(resolve, wait));
    });
}
const ROWS = [8, 10, 12, 16, 18, 22, 24, 26];
const COLS = [19, 21, 23, 29, 31, 33, 35, 37].reverse();
const display = new LedMatrix_1.default(ROWS, COLS);
const screen = new TorusScreen_1.default(8, 8, [numbers_1.default[0]]);
display.show(screen).then(() => console.log('done showing'));
sleep(2000).then(() => {
    console.log('done sleeping');
    display.clear();
});
// display.clear();
// display.tearDown();
