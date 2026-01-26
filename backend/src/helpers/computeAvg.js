const computeAvg = (...values) => {
    const filtered = values.filter(v => typeof v === 'number');

    if (filtered.length === 0) return 0;

    const sum = filtered.reduce((a, b) => a + b, 0);

    return Number((sum / filtered.length).toFixed(2));
}

module.exports = computeAvg;