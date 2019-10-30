import SolarSystemCircle from "./SolarSystemCircle";
import {Point} from "./../base";
import {toRadians} from "./../helpers";

class Orbit extends SolarSystemCircle {
    strokeStyle = {
        r: 255,
        g: 255,
        b: 255,
        a: .15
    };

    /**
     * @param {Number} angle
     * @returns {Point}
     */
    position(angle) {
        return new Point(
            this.center.x + this.scaledRadius * Math.cos(toRadians(angle)),
            this.center.y + this.scaledRadius * Math.sin(toRadians(angle)),
        );
    }
}

export default Orbit;
