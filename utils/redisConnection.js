const redis = require('redis');
const boom = require("boom")
const redisclient = redis.createClient();

(async () => {
    host = '127.0.0.1';
    port = 6379;
    await redisclient.connect(port, host);
})();

redisclient.on('connect', async () => {
    console.log('redis connected...');
    ;
});

redisclient.on('error', err => {
    console.log('Redis Client Error', err)
    boom.badGateway("err")
}
);

exports.getRedisData = async (db, key) => {
    await redisclient.select(db);
    let data = await redisclient.get(key);
    data = JSON.parse(data)
    return data
}

exports.addRedisData = async (db, key, value) => {
    redisclient.select(db);
    let data = await redisclient.get(key);
    if (data === null) {
        await redisclient.set(key, JSON.stringify([value]));
        console.log("data added .....")
    }
    else {
        data = JSON.parse(data);
        data.push(value);
        await redisclient.set(key, JSON.stringify(data));
        console.log("data added .....")
    }
}


exports.editRedisData = async (db, key, value, index) => {
    redisclient.select(db);
    let data = await redisclient.get(key);
    if (data) {
        data = JSON.parse(data)
        data[index] = value
        await redisclient.set(key, JSON.stringify(data));
        console.log("data added .....")
    }

}


exports.clearCache = () => {
    return redisclient.flushAll()
}