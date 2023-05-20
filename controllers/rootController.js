const redis = require("../utils/redisConnection")

exports.dataService = async (req, res) => {
    console.log("🚀 ~ req.boody=>", req.body)
    let userData = await redis.getRedisData(2)
    if (userData !== null) {
        const checkId = await userData.find(data => data.id === +req.body.id);
        if (checkId) {
            res.status(402).json({
                status: "fail",
                message: "شناسه ی دادهها تکراری است.",
            });
        } else {
            const checkParent = await userData.find(
                data => data.id === +req.body.parent
            );
            if (checkParent) {
                await Promise.all([
                    redis.addRedisData(1, 'userData', { id: req.body.id, data: req.body.data }),
                    redis.addRedisData(2, 'userData', { id: req.body.id, parent: req.body.parent })
                ])
                res.status(200).json({
                    status: "success",
                    message: "داده ها ذخیره شد.",
                });
            } else {
                res.status(402).json({
                    status: "fail",
                    message: "امکان ثبت اطلاعات برای شما وجود ندارد.",
                });
            }
        }
    } else {
        userData = [];
        let userData2 = [];
        userData.push({ id: req.body.id, data: req.body.data });
        userData2.push({ id: req.body.id, parent: req.body.parent });
        redisData.saveData(["userData", "userData"], [userData, userData2]);
        res.status(200).json({
            status: "success",
            message: "داده ها ذخیره شد.",
        });
    }
    // res.end('Hello');
};
