import Screen from '../Screen';
import Shape from '../Shape';
declare class TorusScreen extends Screen {
    constructor(width: number, height: number, shapes?: Shape[]);
    toString(): string;
}
export default TorusScreen;
