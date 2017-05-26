import Shape from './Shape';
export declare class Point implements Shape {
    readonly x: number;
    readonly y: number;
    width: number;
    height: number;
    constructor(x: number, y: number);
    distance(other: Point): number;
    add(other: Point): Point;
    sub(other: Point): Point;
    additiveInverseOf(other: Point): boolean;
    equals(other: Point): boolean;
    offset(): this;
    occupiedArea(): number[][];
}
export declare const ZERO: Point;
export default Point;
