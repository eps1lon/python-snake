import Point from './Point';
import Shape from './Shape';
declare class TorusDisplay implements Shape {
    readonly width: number;
    readonly height: number;
    private readonly shapes;
    constructor(width: number, height: number, shapes?: Shape[]);
    display(shape: Shape): TorusDisplay;
    occupiedArea(): number[][];
    offset(): Point;
}
export default TorusDisplay;
