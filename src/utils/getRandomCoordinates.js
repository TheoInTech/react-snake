/**
 * Formatting an integer with a comma as a thousands separators
 * @param null
 * @returns {Array} coordinates [x,y].
 */
export default function getRandomCoordinates() {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;

    return [x,y];
}