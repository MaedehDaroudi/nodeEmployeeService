const ctrl = require("../controllers/rootController")

exports.roots =async (req, res) => {
    let result;
    console.log("🚀 ~ file: rootRoutes.js:6 ~ req.path:", req.path)
    switch (req.path) {
        case "/dataService":
            if (req.method === 'POST') {
                result = await ctrl.addDataService(req, res)
                return result
            }
            else if (req.method === 'GET') {
                result=await ctrl.getDataService(req,res)
            }
            break;
    }

    return result
}
