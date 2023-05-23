const getRoots = require("./root/rootRoutes")
const ctrl = require("../controllers/rootController")

module.exports = async (req, res) => {
    let result;
    const rootsData = await getRoots.routes(req, res)
    if (rootsData && rootsData[`${req.path}`] && rootsData[`${req.path}`][`${req.method}`])
        result = await rootsData[`${req.path}`][`${req.method}`]["controller"](req, res)
    else
        result = [409, {
            status: "fail",
            message: "درخواست معتبر نیست"
        }]
    return result
}
