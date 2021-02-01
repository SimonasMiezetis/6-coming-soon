function formatNumber(number, positions = 2) {
    if (typeof number !== 'number' ||
        !isFinite(number)) {
        console.error('ERROR: pirmasis parametras turi buti tikras skaicius.');
        return false;
    }
    if (typeof positions !== 'number' ||
        !isFinite(positions) ||
        positions % 1 !== 0 ||
        positions < 0 ||
        positions > 10) {
        console.error('ERROR: antrasis parametras turi buti tikras skaicius.');
        return false;
    }
    const fixed = 10 ** positions;
    return Math.round(number * fixed) / fixed;
}

export { formatNumber }