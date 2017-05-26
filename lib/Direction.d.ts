import Point from './Point';
export default Direction;
interface Direction {
    delta: Point;
    left: Direction;
    right: Direction;
}
export interface Orientation {
    [k: string]: Direction;
    up: Direction;
    right: Direction;
    down: Direction;
    left: Direction;
}
export declare type OrientationIdent = keyof Orientation;
export declare const isOrientationIdent: (ident: string, plane: Orientation) => ident is string;
export declare const fromPoint: (point: Point, plane: Orientation) => Direction | undefined;
