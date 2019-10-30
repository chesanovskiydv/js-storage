import SolarSystemCircle from "./SolarSystemCircle";
import {colorStyle} from "./../helpers";

class Sun extends SolarSystemCircle {
    fillStyle = {
        r: 255,
        g: 0,
        b: 0,
        a: 1
    };

    afterRender() {
        let
            gradientRadius = this.scaledRadius * 2,
            gradient = this.context.createRadialGradient(
                this.center.x, this.center.y, 0,
                this.center.x, this.center.y, gradientRadius
            );

        gradient.addColorStop(0.0, colorStyle({
            r: 250,
            g: 220,
            b: 0,
            a: 1
        }));
        gradient.addColorStop(1.0, colorStyle({
            r: 250,
            g: 220,
            b: 0,
            a: 0
        }));

        this.context.beginPath();
        this.context.arc(this.center.x, this.center.y, gradientRadius, 0, 2 * Math.PI);
        this.context.fillStyle = gradient;
        this.context.fill();
    }
}

export default Sun;
