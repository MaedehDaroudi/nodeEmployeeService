const redis = require('redis');
const redisclient = redis.createClient();
let endConnection
let checkConnection;
let checkConnectionRequest = 0;


(async () => {
    host = '127.0.0.1';
    port = 6379;
    await redisclient.connect(port, host);
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
    if (checkConnectionRequest >= 5) {
        console.log("fail.................")
         checkConnection
    }
    console.log('Redis Client Error', err)
    // console.log("🚀 ~ file: redisConnection.js:28 ~ checkConnection:", checkConnection)

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