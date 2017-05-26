import Display from '../Display';
import Screen from '../Screen';
export declare enum MultiplexMode {
    ROW = 0,
    COL = 1,
}
declare class LedMatrix implements Display {
    static enabledListToByte(list: number[]): number;
    private mode;
    private readonly rows;
    private readonly cols;
    private do_show;
    constructor(rows: number[], cols: number[]);
    tearDown(): void;
    show(screen: Screen): Promise<{}>;
    clear(): void;
    /**
     *
     * @param rows
     * @param cols
     */
    private openMatrix();
    private closeMatrix();
    private enableRow(y);
    private disableRow(y);
    private enableCol(x);
    private disableCol(x);
    private assertColDefined(x);
    private assertRowDefined(y);
}
export default LedMatrix;
