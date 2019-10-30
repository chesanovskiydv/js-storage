import './index.scss';

import SolarSystem from "./js/components";
import {PLANETS} from "./js/config";

function init() {
    let canvas = document.getElementById('solar-system');

    if (canvas && canvas instanceof HTMLCanvasElement) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.SolarSystem = new SolarSystem(canvas, PLANETS);
        window.SolarSystem.run();
    }
}

function resize() {
    let canvas = document.getElementById('solar-system');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.SolarSystem.resize();
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener('resize', resize);
