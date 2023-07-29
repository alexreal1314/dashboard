const { AlertModel } = require('../models/Alert');
const { typesStrength, severitiesStrength } = require('../utils');

const fieldToStrengthMapper = {
    severity: severitiesStrength,
    type: typesStrength,
};

class DashboardService {

    async getAggregations ({ filters, groupBy }) {
        const filtersToMatch = filters.reduce((acc, item) => {
            acc[item.filter] = item.value;
            
            return acc;
        }, {});

        return AlertModel.aggregate([
            {
                $match: filtersToMatch,
            },
            {
                $group: {
                    _id: `$${groupBy}`,
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    key: '$_id',
                    count: '$count',
                    _id: 0,
                },
            },
        ]);
    }

    aggregationBuilder (groupBy, mapper, sourceType, limit){
        let aggregation = [
            {
                $sort: { date: -1 }
            },
            {
                $limit: limit
            },
            {
                $group: {
                    _id: `$${groupBy}`,
                    score: {
                        $sum: {
                            $cond: {
                                if: { $in: [`$${groupBy}`, Object.keys(mapper)] },
                                then: { $arrayElemAt: [Object.values(mapper), { $indexOfArray: [Object.keys(mapper), `$${groupBy}`] }] },
                                else: 0
                            }
                        }
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalScore: { $sum: '$score' }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalScore: 1,
                }
            },
        ];

        aggregation = !sourceType ? aggregation : [{ $match: { sourceType: sourceType.split(' ').join('')}}, ...aggregation];

        return aggregation;
    }

    async calcRisk (sourceType) {
        const limit = 300;
        const typeAggregation = this.aggregationBuilder('type', fieldToStrengthMapper.type, sourceType, limit);
        const severityAggregation = this.aggregationBuilder('severity', fieldToStrengthMapper.severity, sourceType, limit);
        const [{ totalScore: typesScore }, { totalScore: severitiesScore }] = (await Promise.all([AlertModel.aggregate(typeAggregation), AlertModel.aggregate(severityAggregation)])).flat();

        return parseInt(((severitiesScore / limit) + (typesScore / limit)) / 2);
    }
}

module.exports = new DashboardService();