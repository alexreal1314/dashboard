const express = require('express');
const controller = require('./DashboardController');
const router = express.Router();
const CONTROLLER_PREFIX = 'dashboard';

router.get(`/${CONTROLLER_PREFIX}`, (req, res) => {
    controller.getDashboard(req, res);
});

router.get(`/${CONTROLLER_PREFIX}/sources`, (req, res) => {
    controller.getSources(req, res);
});

router.get(`/${CONTROLLER_PREFIX}/riskscore`, (req, res) => {
    controller.getRiskScore(req, res);
});

module.exports = router;