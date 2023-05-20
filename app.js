const url = require("url");
const http = require("http");
const path = require("path");
const morgan = require("morgan");
const logger = morgan("combined");
const finalhandler = require("finalhandler");

const rootRoute = require("./routes/rootRoutes")
console.log("========================")
const server = http.createServer(async (req, res) => {
  var done = finalhandler(req, res);
  logger(req, res, function (err) {
    if (err) return done(err);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end("Hello World");
  });

  const { query, pathname } = url.parse(req.url, true);

  let body = '';
  await req.on('data', chunk => {
    body += chunk.toString();
  });
  req.body = body;
  req.path = pathname
  req.query = query

  const result = rootRoute.roots(req, res)
  res.end(result)

})


module.exports = server