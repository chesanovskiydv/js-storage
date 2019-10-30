import {Circle} from "./../base";
import {colorStyle} from "./../helpers";

class SolarSystemCircle extends Circle {
    fillStyle = null;
    strokeStyle = null;
    lineWidth = 1;

    /**
     * @returns {Number}
     */
    get scaledRadius() {
        return this.getScaledRadius(this.radius);
    }

    /**
     * @param {Number} radius
     * @returns {Number}
     */
    getScaledRadius(radius) {
        return radius * this.solarSystem.density;
    }

    /**
     * @param {SolarSystem} solarSystem
     * @param args
     */
    constructor(solarSystem, ...args) {
        super(...args);
        this.solarSystem = solarSystem;
        this.context = this.solarSystem.context;

        if (typeof this.setup === 'function') {
            this.setup();
        }
    }

    render() {
        if (typeof this.beforeRender === 'function') {
            this.beforeRender();
        }

        this.context.beginPath();
        this.context.arc(this.center.x, this.center.y, this.scaledRadius, 0, 2 * Math.PI);
        if (this.fillStyle) {
            this.context.fillStyle = colorStyle(this.fillStyle);
            this.context.fill();
        }
        if (this.strokeStyle) {
            this.context.lineWidth = this.lineWidth;
            this.context.strokeStyle = colorStyle(this.strokeStyle);
            this.context.stroke();
        }

        if (typeof this.afterRender === 'function') {
            this.afterRender();
        }

        return this;
    }
}

export default SolarSystemCircle;
