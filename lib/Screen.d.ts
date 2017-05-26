import Point from './Point';
import Shape from './Shape';
export declare type ScreenMapper = (p: Point, screen_width: number, screen_height: number, shape_width: number, shape_height: number) => Point;
declare class Screen implements Shape {
    readonly width: number;
    readonly height: number;
    private shapes;
    private point_mapping;
    constructor(width: number, height: number, map: ScreenMapper, shapes?: Shape[]);
    offset(): Point;
    occupiedArea(): number[][];
    addShape(shape: Shape): void;
}
export default Screen;
