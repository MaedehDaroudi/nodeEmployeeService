const ctrl = require("../controllers/rootController")

exports.roots = async (req, res) => {
    let result;
    
    switch (req.path) {
        case "/dataService":
            if (req.method === 'GET')
                result = await ctrl.getDataService(req, res)
            else if (req.method === 'POST')
                result = await ctrl.addDataService(req, res)
            else if (req.method === 'PUT')
                result = await ctrl.editDataService(req, res)
            break;
        case "/clear_cache":
            result = await ctrl.clearCache()
            break;
        default:
            result = [500, {
                status: "fail",
                message: "درخواست معتبر نیست"
            }]
    }

    return result
}
