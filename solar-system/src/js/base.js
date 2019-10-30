export class Point {
    /**
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Circle {

    /**
     * @param {Point} center
     * @param {Number} radius
     */
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
    }
}
