const url = require("url");
const http = require("http");
const path = require("path");
const morgan = require("morgan");
const logger = morgan("combined");
const querystring = require("querystring")
const finalhandler = require("finalhandler");

const rootRoute = require("./routes/rootRoutes")
const server = http.createServer(async (req, res) => {
  var done = finalhandler(req, res);
  logger(req, res, function (err) {
    if (err) return done(err);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    // res.end("Hello World");
  });

  const { query, pathname } = url.parse(req.url, true);

  let body = '';
  await req.on('data', chunk => {
    body += chunk.toString();
  });
  console.log("method==>",req.method)
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    console.log("body=>",req.body)
    req.body = JSON.parse(body)
  }
  req.path = pathname
  req.query = query
  try {
    const result = await rootRoute.roots(req, res)
    res.statusCode = result[0];
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result[1]))
  }
  catch (err) {
    console.log("err=>", err)
  }

})


module.exports = server