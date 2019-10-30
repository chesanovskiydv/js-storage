import SolarSystemCircle from "./SolarSystemCircle";
import {Point} from "./../base";

class Star extends SolarSystemCircle {
    _updatedAt = null;
    fillStyle = {
        r: 100,
        g: 100,
        b: 100,
        a: 0
    };

    /**
     * @param {SolarSystem} solarSystem
     * @param {Point|null} [center]
     * @param {Number} [radius]
     */
    constructor(solarSystem, center = null, radius = 1) {
        center = center || solarSystem.randomPoint();
        super(solarSystem, center, radius);

        this.fillStyle.a = Math.floor(Math.random() * 100) / 100;
    }

    updatePosition() {
        if (this._updatedAt) {
            let step = (this.solarSystem.config.star.stepTime * 1000), // milliseconds
                currentTime = new Date();

            while (currentTime - this._updatedAt > step) {
                this.center = new Point(
                    this.center.x += (this.center.x - this.solarSystem.center.x) / 200,
                    this.center.y += (this.center.y - this.solarSystem.center.y) / 200
                );

                this._updatedAt = new Date(this._updatedAt.valueOf() + step);
            }

            if (this.center.x <= 0 || this.center.x >= this.solarSystem.width
                || this.center.y <= 0 || this.center.y >= this.solarSystem.height) {
                this.center = this.solarSystem.randomPoint();
                this.fillStyle.a = 0;
            }
        } else {
            this._updatedAt = new Date();
        }

        return this;
    }

    render() {
        super.render();
        if (this.fillStyle.a < 1) {
            this.fillStyle.a += this.solarSystem.config.star.transparencyStep;
        }
        return this;
    }
}

export default Star;
