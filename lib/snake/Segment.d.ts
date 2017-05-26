import Direction, { Orientation } from '../Direction';
import Point from '../Point';
declare class Segment {
    readonly start: Point;
    readonly end: Point;
    constructor(start: Point, end: Point);
    length(): number;
    isEmpty(): boolean;
    direction(plane: Orientation): Direction | undefined;
    norm(): Point | undefined;
    connectsTo(other: Segment): boolean;
    equals(other: Segment): boolean;
    points(): IterableIterator<Point>;
}
export default Segment;
