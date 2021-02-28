const NAMES = ['Luis', 'Daniel', 'Marisa', 'Vilma', 'Daniela', 'Celso', 'Violeta'];

const getRandomNames = () => NAMES[Math.floor(Math.random() * NAMES.length)];

module.exports = { getRandomNames };