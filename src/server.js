const http = require('http');

const getDamageSummaryByDateRoute = require('./get-damage-summary-by-date/route');

const server = http.createServer(async (req, res) => {
  const isPathValid = req.url.startsWith(getDamageSummaryByDateRoute.path);
  const isMethodValid =
    req.method.toLocaleLowerCase() === getDamageSummaryByDateRoute.method;

  if (isPathValid && isMethodValid) {
    try {
      return await getDamageSummaryByDateRoute.fn(req, res);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  return res.end('404 Not Found');
});

module.exports = server;
