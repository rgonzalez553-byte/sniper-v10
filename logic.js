const neighborsOf9 = [14, 31, 20, 1, 9, 22, 18, 29, 7];
const tiers = [27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33];

const getMasterStrategy = (history) => {
    if (!history || history.length < 5) return { command: 'CALIBRATING', color: '#888', side: 'NEED 5 SPINS' };

    const last = parseInt(history[0]);
    const last12 = history.slice(0, 12);
    const uniqueCount = new Set(last12).size;
    const repeatPressure = uniqueCount <= 8 ? 'HIGH' : 'LOW';

    const last3 = history.slice(0, 3);
    const driftCount = last3.filter(n => tiers.includes(parseInt(n))).length;
    const isDrifting = driftCount >= 2 ? 'DRIFTING' : 'STABLE';

    let gap = 0;
    for (let i = 0; i < history.length; i++) {
        if (neighborsOf9.includes(parseInt(history[i]))) break;
        gap++;
    }

    let command = 'HOLD / SCAN';
    let color = '#ffcc00';

    if (isDrifting === 'STABLE' && repeatPressure === 'HIGH' && gap > 1) {
        command = 'BET NOW';
        color = '#00ff66';
    } else if (isDrifting === 'DRIFTING') {
        command = 'STOP - DRIFT';
        color = '#ff4444';
    } else if (gap > 12) {
        command = 'SLEEPER ACTIVE';
        color = '#00d4ff';
    }

    return { 
        command, color, 
        side: neighborsOf9.includes(last) ? 'ZONE HIT!' : 'TARGET: 9-NEIGHBORS',
        theories: { repeat: repeatPressure, drift: isDrifting } 
    };
};
module.exports = { getMasterStrategy };
