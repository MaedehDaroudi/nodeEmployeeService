const redisServices = require("../utils/redisConnection")

exports.addDataService = async (req, res) => {
    let userData = await redisServices.getRedisData(1, 'userData')
    if (userData !== null) {
        const checkId = await userData.find(data => data.id === +req.body.id);
        if (checkId) {
            return [404, {
                status: "fail",
                message: "شناسه ی دادهها تکراری است.",
            }]
        } else {
            const checkParent = await userData.find(
                data => data.id === +req.body.parent
            );
            if (checkParent) {
                // await Promise.all([
                await redisServices.addRedisData(0, 'userData', { id: req.body.id, data: req.body.data }),
                    await redisServices.addRedisData(1, 'userData', { id: req.body.id, parent: req.body.parent })
                // ])                                
                return [200, {
                    status: "success",
                    message: "داده ها ذخیره شد.",
                }]
            } else {
                return [404, {
                    status: "fail",
                    message: "امکان ثبت اطلاعات برای شما وجود ندارد.",
                }];
            }
        }
    }
    else {

        // await Promise.all([
        await redisServices.addRedisData(0, 'userData', { id: req.body.id, data: req.body.data }),
            await redisServices.addRedisData(1, 'userData', { id: req.body.id, parent: req.body.parent })

        // ])
        // res.status(200).json({
        return [200, {
            status: "success",
            message: "داده ها ذخیره شد.",
        }]
    }
};

exports.getDataService = async (req, res) => {
    let userData = await redisServices.getRedisData(0, 'userData')
    let userData1 = await redisServices.getRedisData(1, 'userData')
    let allData = null;
    if (userData && userData1 && req.query && req.query.id) {
        const index1 = await userData.findIndex(data => data.id === +req.query.id);
        if (index1 >= 0)
            allData = { ...userData[index1], ...userData1[index1] }
        else
            return [404, {
                status: "fail",
                message: "شناسه پیدا نشد"
            }]
    }
    else if (userData && userData1) {
        let i = 0
        allData = userData.map(data => {
            allData = { ...data, ...userData1[i] }
            i++;
            return allData

        })
    }
    return [200, {
        status: "success",
        data: allData
    }]
}

exports.clearCache = async () => {
    await redisServices.clearCache()
    return [200, {
        status: "success",
        data: "اطلاعات پاک شد."
    }]
}

exports.editDataService = async (req, res) => {
    console.log("req=>", req.body)
    let userData = await redisServices.getRedisData(0, 'userData')
    let userData1 = await redisServices.getRedisData(1, 'userData')
    if (userData && userData1) {
        const index = await userData.findIndex(data => data.id === +req.body.id);
        const index1 = await userData1.findIndex(data => data.id === +req.body.id);
        if (index >= 0 && index1 >= 0) {
            console.log("req=>", req.body)
            await redisServices.editRedisData(0, 'userData', { id: req.body.id, data: req.body.data }, index)
            await redisServices.editRedisData(1, 'userData', { id: req.body.id, parent: req.body.parent }, index1)
            return [200, {
                status: "success",
                message: "داده ها به روزرسانی شد"
            }]
        }
        else {
            return [404, {
                status: "fail",
                message: "شناسه پیدا نشد"
            }]
        }
    }
    else {
        return [404, {
            status: "fail",
            message: "شناسه پیدا نشد"
        }]
    }


}