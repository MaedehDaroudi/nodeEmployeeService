const redis = require('redis');
const redisclient = redis.createClient();
let endConnection
let checkConnection;
let checkConnectionRequest = 0;

const redisConfig = {
    port: parseInt(process.env.REDIS_PORT, 10),
    host: process.env.REDIS_HOST,
    maxRetriesPerRequest: 5,
};

(async () => {
    await redisclient.connect(redisConfig);
})();

redisclient.on('connect', async () => {
    checkConnection = true
    checkConnectionRequest = 0
    console.log('redis connected...');
    ;
});

redisclient.on('error', err => {
    checkConnectionRequest += 1
    checkConnection = false
    console.log("🚀 ~ checkConnectionRequest =>", checkConnectionRequest)
    if (checkConnectionRequest >= 5) {
        console.log("fail.................")
        throw err
    }
        console.log('Redis Client Error', err)

});

exports.checkConnection = () => {
    return checkConnection
}

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
        await redisclient.set(key, JSON.stringify({ [value.id]: value }));
        console.log("data added .....")
    }
    else {
        data = JSON.parse(data);
        data[value.id] = value
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
        console.log("data edited .....")
    }
}

exports.clearCache = () => {
    return redisclient.flushAll()
}