const result = require("../utils/results")
const redisServices = require("../db/redisConnection")


exports.getDataService = async (req, res) => {
    try {
        let allData = null;
        let responses = result.responses()
        let userData = await redisServices.getRedisData(0, 'userData')
        let parentData = await redisServices.getRedisData(1, 'parentData')
        if (req.query.id !== undefined && !req.query.id.length && userData !== null)
            return responses["notValueId"]

        if (req.query && req.query.id && userData !== null) {
            if (userData[`${req.query.id}`] && parentData[`${req.query.id}`])
                allData = { ...userData[req.query.id], ...parentData[req.query.id] }
            else
                return responses["notFoundId"]
        }
        if (req.query && req.query.parent && userData !== null) {
            let result = []
            Object.values(parentData).map(data => {
                if (data.parent == req.query.parent)
                    result.push({ ...userData[data.id], ...parentData[data.id] })
            })
            allData = result
        }
        else if (userData && parentData)
            allData = Object.keys(userData).map(data => {
                return { ...userData[data], ...parentData[data] }
            })

        return result.responses(allData)["allData"]
    }
    catch (err) {
        console.log("err=>", err)
    }
}

exports.addDataService = async (req, res) => {
    try {
        const responses = await result.responses()
        let userData = await redisServices.getRedisData(1, 'parentData')
        if (userData !== null) {
            if (userData[`${req.body.id}`])
                return responses["errorDuplicateUser"]
            else {
                const checkParent = Object.keys(userData).find(data => data === req.body.parent)
                if (!checkParent)
                    return responses["accessDenied"]
                await redisServices.addRedisData(0, 'userData', { id: req.body.id, data: req.body.data })
                await redisServices.addRedisData(1, 'parentData', { id: req.body.id, parent: req.body.parent })
                return responses["successSave"]
            }
        }
        else {
            if (req.body && req.body.id && req.body.parent && req.body.id === req.body.parent) {
                await redisServices.addRedisData(0, 'userData', { id: req.body.id, data: req.body.data })
                await redisServices.addRedisData(1, 'parentData', { id: req.body.id, parent: req.body.parent })
                return responses["successSave"]
            }
            else
                return responses["accessDenied"]
        }
    }
    catch (err) {
        console.log("err=>", err)
    }
};

exports.editDataService = async (req, res) => {
    try {
        let parent = req.query && req.query.parent ? req.query.parent : null
        let checkParent
        const responses = await result.responses()
        let userData = await redisServices.getRedisData(0, 'userData')
        let parentData = await redisServices.getRedisData(1, 'parentData')
        if (userData)
            checkParent = Object.keys(userData).find(data => data === req.body.parent)
        if (!checkParent)
            return responses["accessDenied"]
        if (userData && parentData) {

            if (userData[`${req.body.id}`] && parentData[`${req.body.id}`]) {
                const editResult = await redisServices.editRedisData(1, 'parentData', { id: req.body.id, parent: req.body.parent }, req.body.id, parent)
                if (editResult) {
                    await redisServices.editRedisData(0, 'userData', { id: req.body.id, data: req.body.data }, req.body.id, parent)
                    return responses["successUpdate"]
                }
                else
                    return responses["accessDeniedParent"]                    
            }
            else
                return responses["notFoundId"]
        }
        else
            return responses["notFoundId"]
    }
    catch (err) {
        console.log("err=>", err)
    }
}

exports.clearCache = async () => {
    try {
        const responses = await result.responses()
        await redisServices.clearCache()
        return responses["successClearCache"]
    }
    catch (err) {
        console.log("err=>", err)
    }
}