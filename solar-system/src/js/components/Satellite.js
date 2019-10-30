import Orbit from "./Orbit";
import {colorStyle} from "../helpers";
import SolarSystemCircle from "./SolarSystemCircle";

class Satellite extends SolarSystemCircle {
    _updatedAt = null;
    fillStyle = null;
    satellites = [];
    hasShadow = false;

    set center(center) {
        this._center = center;

        if (this.satellites) {
            this.satellites.forEach(satellite => {
                satellite.orbit.center = this.center;
                satellite.center = satellite.orbit.position(this.angle)
            });
        }
    }

    get center() {
        return this._center;
    }

    /**
     * @param {SolarSystem} solarSystem
     * @param {Number} radius
     * @param {Orbit} orbit
     * @param {Number} yearDuration
     * @param {String|Object} color
     * @param {Number} [startAngle]
     * @param {Array|Object} [satellites]
     */
    constructor(solarSystem, radius, orbit, yearDuration, color, startAngle = null, satellites = []) {
        startAngle = typeof startAngle === 'number' ? startAngle : Math.floor(Math.random() * 360);
        super(solarSystem, orbit.position(startAngle), radius);

        this.orbit = orbit;
        this.angle = startAngle;
        this.yearDuration = yearDuration;
        this.fillStyle = color;

        this.satellites = Object.values(satellites).map(
            satellite => new Satellite(
                solarSystem,
                satellite.radius,
                new Orbit(solarSystem, this.center, satellite.orbitRadius),
                satellite.yearDuration,
                satellite.color
            )
        );

        this._updatedAt = new Date();
    }

    render() {
        this.orbit.render();
        super.render();
        this.satellites.forEach(satellite => satellite.render());

        return this;
    }

    afterRender() {
        if (this.hasShadow && typeof this.renderShadow === 'function') {
            this.renderShadow();
        }
    }

    renderShadow() {
        let
            shadowCenter = this.solarSystem.position(this.orbit.scaledRadius - this.scaledRadius, this.angle),
            gradient = this.context.createRadialGradient(
                this.center.x, this.center.y, this.scaledRadius,
                shadowCenter.x, shadowCenter.y, this.scaledRadius
            );

        gradient.addColorStop(0.0, colorStyle({
            r: 0,
            g: 0,
            b: 0,
            a: .5
        }));
        gradient.addColorStop(1.0, colorStyle(this.fillStyle));

        this.context.beginPath();
        this.context.arc(this.center.x, this.center.y, this.scaledRadius, 0, 2 * Math.PI);
        this.context.fillStyle = gradient;
        this.context.fill();
    }

    updatePosition() {
        if (this._updatedAt) {
            let delta = 360 / (this.yearDuration * this.solarSystem.config.dayDuration) * (new Date() - this._updatedAt) / 1000;

            this.angle = (this.angle + delta) % 360;
            this.center = this.orbit.position(this.angle);
        }
        this._updatedAt = new Date();

        this.satellites.forEach(satellite => satellite.updatePosition());

        return this;
    }
}

export default Satellite;
