import Direction, { Orientation } from './Direction';
import Point from './Point';
import Body from './snake/Body';
import Segment from './snake/Segment';
declare class Snake {
    static withDirection(start: Point, dir: Direction): Snake;
    readonly body: Body;
    readonly plane: Orientation;
    constructor(body?: Body);
    head(): Segment;
    tail(): Segment;
    up(): Snake;
    right(): Snake;
    down(): Snake;
    left(): Snake;
    direction(): Direction | undefined;
    grow(): Snake;
    forward(): Snake;
    private moveTo(new_dir);
}
export default Snake;
