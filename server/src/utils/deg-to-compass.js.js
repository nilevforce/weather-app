/**
 * Converts wind direction in degrees to compass direction (e.g., "N", "SW").
 *
 * @param {number} deg - Wind direction in degrees (0–360).
 * @returns {string} Compass direction abbreviation.
 */
const degToCompass = (deg) => {
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
  ];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
};

export default degToCompass;
