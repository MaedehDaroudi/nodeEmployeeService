const ctrl = require("../../controllers/rootController")

exports.routes = async (req, res) => {
    return {
        "/dataService": {
            "GET": {
                controller: ctrl.getDataService
            },
            "POST": {
                controller: ctrl.addDataService
            },
            "PUT": {
                controller: ctrl.editDataService
            }
        },
        "/clear_cache": {
            "GET": {
                controller: ctrl.clearCache
            }
        }
    }
}