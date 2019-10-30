/**
 * @param {Number} angle
 * @returns {Number}
 */
export function toRadians(angle) {
    return angle * Math.PI / 180;
}

/**
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @param {Number} a
 * @returns {string}
 */
export function rgba(r = 0, g = 0, b = 0, a = 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * @param {string|Object} colorStyle
 * @returns {string|null|*}
 */
export function colorStyle(colorStyle) {
    if (!colorStyle) {
        return null;
    }

    let isRGB = ['r', 'g', 'b'].reduce((hasOwnProp, prop) => colorStyle.hasOwnProperty(prop) && hasOwnProp, true);
    if (typeof colorStyle === 'object' && isRGB) {
        return rgba(colorStyle.r, colorStyle.g, colorStyle.b, colorStyle.a);
    }

    return colorStyle;
}
