import Point from '../Point';
import TorusDisplay from '../TorusDisplay';
const mockShape = (area, x, y, width, height) => {
    return {
        width, height,
        offset: () => new Point(x, y),
        occupiedArea: () => area,
    };
};
describe('TorusDisplay', () => {
    it('should init with 0', () => {
        const torus = new TorusDisplay(5, 5);
        expect(torus.occupiedArea()).toEqual([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
    });
    it('should add shapes', () => {
        let torus = new TorusDisplay(5, 5);
        const line = mockShape([[1, 1, 1]], 1, 0, 3, 1);
        torus = torus.display(line);
        expect(torus.occupiedArea()).toEqual([
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
        const square = mockShape([[1, 1], [1, 1]], 2, 3, 2, 2);
        torus = torus.display(square);
        expect(torus.occupiedArea()).toEqual([
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 0, 1, 1, 0],
        ]);
        const triangle = mockShape([[1, 0], [1, 1]], 0, 1, 2, 2);
        torus = torus.display(triangle);
        expect(torus.occupiedArea()).toEqual([
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 0, 1, 1, 0],
        ]);
    });
    it('should wrap coordinates', () => {
        let torus = new TorusDisplay(5, 5);
        torus = torus.display(mockShape([[1, 1, 1]], 4, 0, 3, 1));
        expect(torus.occupiedArea()).toEqual([
            [1, 1, 0, 0, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
        torus = torus.display(mockShape([[1, 1, 1]], -2, 1, 3, 1));
        expect(torus.occupiedArea()).toEqual([
            [1, 1, 0, 0, 1],
            [1, 0, 0, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
        torus = torus.display(mockShape([[1], [1], [1]], -2, 1, 1, 3));
        expect(torus.occupiedArea()).toEqual([
            [1, 1, 0, 0, 1],
            [1, 0, 0, 2, 1],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0],
        ]);
        torus = torus.display(mockShape([[1], [1], [1]], -2, -1, 1, 3));
        expect(torus.occupiedArea()).toEqual([
            [1, 1, 0, 1, 1],
            [1, 0, 0, 3, 1],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0],
        ]);
        torus = torus.display(mockShape([[1], [1], [1], [1]], 1, 3, 1, 3));
        expect(torus.occupiedArea()).toEqual([
            [1, 2, 0, 1, 1],
            [1, 1, 0, 3, 1],
            [0, 0, 0, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0],
        ]);
    });
});
