import {Point} from "./../base";
import {toRadians} from "./../helpers";
import Sun from "./Sun";
import Planet from "./Planet";
import Orbit from "./Orbit";
import Star from "./Star";

class SolarSystem {
    /** @var {Sun} */
    sun = null;
    /** @var {Planet[]} */
    planets = [];
    /** @var {Star[]} */
    stars = [];
    /** @var {Object} */
    config = {
        dayDuration: 15 / 365, // sec
        star: {
            stepTime: .05, // sec
            transparencyStep: .015 // color transparency (alpha channel). max = 1
        }
    };

    /**
     * @returns {CanvasRenderingContext2D}
     */
    get context() {
        return this._context;
    }

    /**
     * @param {CanvasRenderingContext2D} context
     */
    set context(context) {
        this._context = context;
        this._center = new Point(this.width / 2, this.height / 2);
    }

    /**
     * @returns {Point}
     */
    get center() {
        return this._center;
    }

    /**
     * @returns {Number}
     */
    get width() {
        return this.context.canvas.width;
    }

    /**
     * @returns {Number}
     */
    get height() {
        return this.context.canvas.height;
    }

    /**
     * @param {Number} radius
     * @param {Number} angle
     * @returns {Point}
     */
    position(radius, angle) {
        return new Point(
            this.center.x + radius * Math.cos(toRadians(angle)),
            this.center.y + radius * Math.sin(toRadians(angle)),
        );
    }

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Number} [sunRadius]
     * @param {Object} [planets]
     * @param {Number} [starsCount]
     * @param {Object} [config]
     */
    constructor(canvas, sunRadius = 50, planets = [], starsCount = 200, config = {}) {
        this.context = canvas.getContext('2d');
        this.config = {...this.config, ...config};

        this.sun = new Sun(this, this.center, sunRadius);
        this.planets = Object.values(planets).map(
            planet => new Planet(
                this,
                planet.radius,
                new Orbit(this, this.center, planet.orbitRadius),
                planet.yearDuration,
                planet.color,
                null,
                planet.satellites || []
            )
        );
        this.stars = [...Array(starsCount)].map(() => new Star(this));

        this.setup();
    }

    setup() {
        let
            maxRadius = this.planets.reduce((maxDistance, planet) => planet.orbit.radius + planet.radius, 0),
            minSize = Math.min(this.width, this.height),
            minRequiredSize = maxRadius * 2 + Math.min(50, maxRadius);

        this.density = minSize / minRequiredSize;
    }

    resize() {
        this.setup();

        this._center = new Point(this.width / 2, this.height / 2);

        this.sun.center = this.center;
        this.planets.forEach(planet => planet.orbit.center = this.center);
    }

    /**
     * @returns {Point}
     */
    randomPoint() {
        return new Point(
            Math.floor(Math.random() * this.width),
            Math.floor(Math.random() * this.height)
        );
    }

    clear() {
        --this.context.canvas.width;
        ++this.context.canvas.width;
    }

    render() {
        this.clear();

        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.width, this.height);

        this.stars.forEach(star => star.render());
        this.sun.render();
        this.planets.forEach(planet => planet.render());
    }

    updatePositions() {
        this.planets.forEach(planet => planet.updatePosition());
        this.stars.forEach(star => star.updatePosition());
    }

    run() {
        let renderCallback = () => {
            this.updatePositions();
            this.render();

            window.requestAnimationFrame(renderCallback);
        };

        window.requestAnimationFrame(renderCallback);
    }
}

export default SolarSystem;
