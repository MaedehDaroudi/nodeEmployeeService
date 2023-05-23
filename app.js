
const http = require("http");
const morgan = require("morgan");
const logger = morgan("combined");
const rootRoute = require("./routes")
const requserHandler = require("./utils/requestHandeler")

const server = http.createServer(async (req, res) => {
  logger(req, res, function (err) {
    if (err) return console.log("err=>", err);
  });
  let handeler = await requserHandler.requests(req, res)
  if (handeler[1]) {
    if (typeof handeler[1] !== 'string')
      handeler[1] = JSON.stringify(handeler[1])
    res.setHeader('Content-Type', 'application/json');
    res.end(handeler[1])
  }
  else {
    req = handeler[0]
    try {
      const result = await rootRoute(req, res)
      res.statusCode = result[0];
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result[1]))
    }
    catch (err) {
      console.log("err=>", err)
    }
  }
})


module.exports = server