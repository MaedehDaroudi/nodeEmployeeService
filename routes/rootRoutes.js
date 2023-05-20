const ctrl = require("../controllers/rootController")

exports.roots = async (req, res) => {
    let result;
    
    switch (req.path) {
        case "/dataService":
            if (req.method === 'POST')
                result = await ctrl.addDataService(req, res)
            else if (req.method === 'GET')
                result = await ctrl.getDataService(req, res)
            // return result
            break;
        case "/clear_cache":
            result = await ctrl.clearCache()
            break;
    }

    return result
}
