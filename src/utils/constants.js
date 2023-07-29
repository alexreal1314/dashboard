const severitiesStrength = { Low: 40, Medium: 70, High: 100 };

const typesStrength = {
    Phishing: 10,
    DataLeakage: 20,
    BrandSecurity: 40,
    ExploitableData: 60,
    AttackIndication: 80,
    vip: 100,
};

module.exports = {
    severitiesStrength,
    typesStrength,
};