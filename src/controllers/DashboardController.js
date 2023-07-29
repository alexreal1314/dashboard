const { status } = require('../utils');
const { DashboardService } = require('../services');
const { AlertModel } = require('../models/Alert');

module.exports = {
    getDashboard: async (req, res) => {
        try {
            const { sourceType } = req.query;
            const [clearWebType, clearWebSeverity, darkWebType, darkWebSeverity] =
            
            await Promise.all([
                DashboardService.getAggregations({
                    filters: !sourceType
                        ? [{ filter: 'networkType', value: 'ClearWeb' }]
                        : [
                            { filter: 'networkType', value: 'ClearWeb' },
                            { filter: 'sourceType', value: sourceType.split(' ').join('') },
                        ],
                    groupBy: 'type',
                }),
                DashboardService.getAggregations({
                    filters: !sourceType
                        ? [{ filter: 'networkType', value: 'ClearWeb' }]
                        : [
                            { filter: 'networkType', value: 'ClearWeb' },
                            { filter: 'sourceType', value: sourceType.split(' ').join('') },
                        ],
                    groupBy: 'severity',
                }),
                DashboardService.getAggregations({
                    filters: !sourceType
                        ? [{ filter: 'networkType', value: 'DarkWeb' }]
                        : [
                            { filter: 'networkType', value: 'DarkWeb' },
                            { filter: 'sourceType', value: sourceType.split(' ').join('') },
                        ],
                    groupBy: 'type',
                }),
                DashboardService.getAggregations({
                    filters: !sourceType
                        ? [{ filter: 'networkType', value: 'DarkWeb' }]
                        : [
                            { filter: 'networkType', value: 'DarkWeb' },
                            { filter: 'sourceType', value: sourceType.split(' ').join('') },
                        ],
                    groupBy: 'severity',
                }),
            ]);

            return res
                .status(status.OK)
                .send({ clearWebType, clearWebSeverity, darkWebType, darkWebSeverity });
        } catch (err) {
            return res.status(status.INTERNAL_ERROR).send(err);
        }

    },

    getSources: async (req, res) => {
        try {
            return res
                .status(status.OK)
                .send(await AlertModel.distinct('sourceType'));
        } catch (err) {
            return res.status(status.INTERNAL_ERROR).send(err);
        }
    },

    getRiskScore: async (req, res) => {
        try {
            const { sourceType } = req.query;
            const score = await DashboardService.calcRisk(sourceType);

            return res
                .status(status.OK)
                .send({ score });
        } catch (err) {
            return res.status(status.INTERNAL_ERROR).send(err);
        }
    }

};