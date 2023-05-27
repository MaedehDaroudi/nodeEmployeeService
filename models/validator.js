
exports.Validator = async (schema,data) => {
    var Validator = require('jsonschema').Validator;
    var v = new Validator();
    if (v.validate(data, schema).errors.length) {
        return [404, {
            status: "fail",
            message: v.validate(data, schema).errors
        }]
    }
    return [200, {
        status: "success",
    }]
}