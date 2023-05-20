const redis = require('redis');
const redisclient = redis.createClient();


(async () => {
    port = '127.0.0.1';
    host = 6379;
    await redisclient.connect(port, host);
})();

redisclient.on('connect', async () => {
    console.log('redis connected...');
});

exports.getRedisData = async (db, key) => {
    redisclient.select(db);
    let data = await redisclient.get(key);
    data = JSON.parse(data)
    return data
}

exports.addRedisData = async (db, key, value) => {
    redisclient.select(db);
    let data = await redisclient.get(key);
    if (data === null)
        redisclient.set(key, JSON.stringify([value]));
    else {
        data = JSON.parse(data);
        data.push(value);
        redisclient.set(key, JSON.stringify(data));
    }
}


exports.editRedisData = async () => {

}
exports.editDataDb2 = async () => {

}
