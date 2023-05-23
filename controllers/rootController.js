const result = require("../utils/results")
const redisServices = require("../db/redisConnection")


exports.getDataService = async (req, res) => {
    try {
        console.log("===================")
        let allData = null;
        const status = await result.status()
        let userData = await redisServices.getRedisData(0, 'userData')
        let parentData = await redisServices.getRedisData(1, 'parentData')
        if (req.query.id !== undefined && !req.query.id.length && userData !== null)
            return status["notValueId"]
        if (req.query && req.query.id && userData !== null) {
            if (userData[`${req.query.id}`] && parentData[`${req.query.id}`])
                allData = { ...userData[req.query.id], ...parentData[req.query.id] }
            else
                return status["notFoundId"]
        }
        else if (userData && parentData)
            allData = Object.keys(userData).map(data => {
                return { ...userData[data], ...parentData[data] }
            })

        return [200, {
            status: "success",
            data: allData
        }]
    }
    catch (err) {
        console.log("err=>", err)
    }
}

exports.addDataService = async (req, res) => {
    try {
        const status = await result.status()
        let userData = await redisServices.getRedisData(1, 'parentData')
        if (userData !== null) {
            if (userData[`${req.body.id}`])
                return status["errorDuplicateUser"]
            else {
                const checkParent = Object.keys(userData).find(data => +data === +req.body.parent)
                if (!checkParent)
                    return status["accessDenied"]
                await redisServices.addRedisData(0, 'userData', { id: req.body.id, data: req.body.data })
                await redisServices.addRedisData(1, 'parentData', { id: req.body.id, parent: req.body.parent })
                return status["successSave"]
            }
        }
        else {
            if (req.body && req.body.id && req.body.parent && req.body.id === req.body.parent) {
                await redisServices.addRedisData(0, 'userData', { id: req.body.id, data: req.body.data })
                await redisServices.addRedisData(1, 'parentData', { id: req.body.id, parent: req.body.parent })
                return status["successSave"]
            }
            else
                return status["accessDenied"]
        }
    }
    catch (err) {
        console.log("err=>", err)
    }
};


exports.clearCache = async () => {
    try {
        const status = await result.status()
        await redisServices.clearCache()
        return status["successClearCache"]
    }
    catch (err) {
        console.log("err=>", err)
    }
}

exports.editDataService = async (req, res) => {
    try {
        let checkParent
        const status = await result.status()
        let userData = await redisServices.getRedisData(0, 'userData')
        let parentData = await redisServices.getRedisData(1, 'parentData')
        if (userData)
            checkParent = Object.keys(userData).find(data => +data === +req.body.parent)
        if (!checkParent)
            return status["accessDenied"]
        if (userData && parentData) {
            if (userData[`${req.body.id}`] && parentData[`${req.body.id}`]) {
                await redisServices.editRedisData(0, 'userData', { id: req.body.id, data: req.body.data }, req.body.id)
                await redisServices.editRedisData(1, 'parentData', { id: req.body.id, parent: req.body.parent }, req.body.id)
                return status["successUpdate"]
            }
            else
                return status["notFoundId"]
        }
        else
            return status["notFoundId"]
    }
    catch (err) {
        console.log("err=>", err)
    }
}