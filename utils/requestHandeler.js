const url = require("url");
const result = require("../utils/results")
const schema = require("./../models/infoModel")
const infoModel = require("../models/validator")
const redisCOnnection = require("../db/redisConnection");



exports.requests = async (req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    let endRes = false
    let body = '';
    await req.on('data', chunk => { body += chunk.toString(); });

    if (["POST", "PUT", "PATCH"].includes(req.method)) {        
        req.body = JSON.parse(body)        
        const validation = await infoModel.Validator(schema.userAndParentSchema(), req.body)
        if (validation["statusCode"] !== 200) {
            res.statusCode = validation["statusCode"];
            return { req, result: JSON.stringify(validation), endRes: true }
        }
    }

    const checkConnection = await redisCOnnection.checkConnection()    
    if (checkConnection === false) {
        try {
            // const redis = require('redis');
            // const redisclient = redis.createClient();
            // const redisConfig = {
            //     port: parseInt(process.env.REDIS_PORT, 10),
            //     host: process.env.REDIS_HOST,
            //     maxRetriesPerRequest: 5,
            // };

            // (async () => {
            //     await redisclient.connect(redisConfig);
            // })();

            // redisclient.on('connect', async () => {
            //     checkConnection = true
            //     checkConnectionRequest = 0
            //     console.log('redis connected...');
            //     ;
            // });        
            res.statusCode = 404;
            return {
                req,
                endRes: true,
                "result": JSON.stringify(result.responses()["connectionError"])
            }
        }
        catch (err) {
            res.statusCode = 404;
            return {
                req,
                endRes: true,
                "result": JSON.stringify(result.responses()["connectionError"])
            }
        }
    }
    req.path = pathname
    req.query = query
    return {
        req, endRes
    }
}
