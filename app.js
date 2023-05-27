
const http = require("http");
const morgan = require("morgan");
const logger = morgan("combined");
const rootRoute = require("./routes")
const redisConnect=require("./db/redisConnection")
const requserHandler = require("./utils/requestHandeler")

const server = http.createServer(async (req, res) => {
  logger(req, res, function (err) {
    if (err) return console.log("err=>", err);
  });
  // await redisConnect.runRedis()
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
      res.statusCode = result['statusCode'];
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result['result']))
    }
    catch (err) {
      console.log("err=>", err)
    }
  }
})


module.exports = server