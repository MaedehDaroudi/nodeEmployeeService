const ctrl = require("../controllers/rootController")

exports.roots = (req, res) => {
    console.log("2222222222222222")
    let result;
    switch (req.params) {
        case "/dataService":
            if (req.method === 'POST') {
                result = ctrl.dataService(req, res)
            }
            break;
    }

    return result
}
