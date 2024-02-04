const url = require('url');
const controller = require('./controller');

module.exports = {
  async execute(req, res) {
    try {
      const { query } = url.parse(req.url, true);
      const { dateStart, dateEnd } = query;

      try {
        const damageSummary = await controller.execute(dateStart, dateEnd);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(damageSummary));
      } catch (error) {
        throw error;
      }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  },
};
