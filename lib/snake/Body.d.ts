import Point from '../Point';
import Shape from '../Shape';
import Segment from './Segment';
export declare type Dimensions = [number, number, number, number];
declare class Body implements Shape {
    readonly segments: Segment[];
    constructor(body: Segment[]);
    tail(): Segment;
    head(): Segment;
    isValid(): boolean;
    sanitize(): Body;
    removeEmpty(): Body;
    connectReduntant(): Body;
    prolong(): Body;
    shorten(): Body;
    turnTo(delta: Point): Body;
    dimensions(): Dimensions;
    readonly width: number;
    readonly height: number;
    occupiedArea(): number[][];
    offset(): Point;
}
export default Body;
