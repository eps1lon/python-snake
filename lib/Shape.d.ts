import Point from './Point';
interface Shape {
    width: number;
    height: number;
    offset(): Point;
    occupiedArea(): number[][];
}
export default Shape;
export declare const pointsList: (shape: Shape) => [Point, number][];
export declare const filteredPoints: (fn: (value: number) => boolean, shape: Shape) => Point[];
export declare const occupiedPoints: (shape: Shape) => Point[];
export declare const unoccupiedPoints: (shape: Shape) => Point[];
