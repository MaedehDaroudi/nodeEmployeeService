const redisServices = require("../utils/redisConnection")

exports.addDataService = async (req, res) => {
    req.body=JSON.parse(req.body)
    let userData = await redisServices.getRedisData(0, 'userData')
    if (userData !== null) {
        const checkId = await userData.find(data => data.id === +req.body.id);
        if (checkId) {
            return {
                status: "fail",
                message: "شناسه ی دادهها تکراری است.",
            }
        } else {
            console.log("req.body==>",req.body)
            console.log("req.body==>",typeof req.body)
            console.log("req.body.parent==>",req.body.parent)
            console.log("parent =>", userData.id)
            console.log("parent =>", req.body.parent)
            const checkParent = await userData.find(
                data => data.id === +req.body.parent
            );
            if (checkParent) {
                await Promise.all([
                    redisServices.addRedisData(0, 'userData', { id: req.body.id, data: req.body.data }),
                    redisServices.addRedisData(1, 'userData', { id: req.body.id, parent: req.body.parent })
                ])
                return {
                    status: "success",
                    message: "داده ها ذخیره شد.",
                }
            } else {
                return {
                    status: "fail",
                    message: "امکان ثبت اطلاعات برای شما وجود ندارد.",
                };
            }
        }
    }
    else {
        await Promise.all([
            redisServices.addRedisData(0, 'userData', { id: req.body.id, data: req.body.data }),
            redisServices.addRedisData(1, 'userData', { id: req.body.id, parent: req.body.parent })
        ])
        // res.status(200).json({
        return {
            status: "success",
            message: "داده ها ذخیره شد.",
        }
    }
};

exports.getDataService = async (req, res) => {
    let userData = await redisServices.getRedisData(0, 'userData')
    let userData1= await redisServices.getRedisData(1, 'userData')
    console.log("🚀 ~~ userData =>", userData)
    console.log("🚀 ~~ userData1 =>", userData1)
    return userData
}
