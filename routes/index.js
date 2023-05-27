const response = require("../utils/results")
const getRoots = require("./root/rootRoutes")

module.exports = async (req, res) => {
    let result;
    const rootsData = await getRoots.routes(req, res)
    if (rootsData && rootsData[`${req.path}`] && rootsData[`${req.path}`][`${req.method}`])
        result = await rootsData[`${req.path}`][`${req.method}`]["controller"](req, res)
    else
        result = response.responses()["invalidRequest"]
    return result
}
