
const result = require("../utils/results")
let responses = result.responses()
// return result.responses(allData)["allData"]


exports.Validator = async (schema, data) => {
    var Validator = require('jsonschema').Validator;
    var v = new Validator();
    if (v.validate(data, schema).errors.length)
        return result.responses(v.validate(data, schema).errors)["validationError"]
    else
        return result.responses()["validationSuccess"]
}