export const PLANETS = {
    mercury: {
        radius: 22,
        orbitRadius: 125,
        yearDuration: 88, // days
        color: '#c0c0c0',
    },
    venus: {
        radius: 36,
        orbitRadius: 250,
        yearDuration: 225,

        color: '#ffff00',
    },
    earth: {
        radius: 38,
        orbitRadius: 375,
        yearDuration: 365,
        color: '#00c0ff',
        satellites: {
            moon: {
                radius: 10,
                orbitRadius: 60,
                yearDuration: 27,
                color: '#fffb10'
            }
        }
    },

    mars: {
        radius: 30,
        orbitRadius: 500,
        yearDuration: 450,
        color: '#ea5515',
    },
    jupiter: {
        radius: 50,
        orbitRadius: 650,
        yearDuration: 600,
        color: '#ff9900',
    },
};