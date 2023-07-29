const dashboardController = require('../controllers/routes');
const { status } = require('../utils');

module.exports = (app) => {
    app.use('/api', dashboardController);

    app.get('*', function (req, res) { res.status(status.NOT_FOUND).json({ error: 'Invalid GET request' }); });
    app.post('*', function (req, res) { res.status(status.NOT_FOUND).json({ error: 'Invalid POST request' }); });
    app.delete('*', function (req, res) { res.status(status.NOT_FOUND).json({ error: 'Invalid DELETE request' }); });
};