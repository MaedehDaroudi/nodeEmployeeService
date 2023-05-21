
exports.Validator = (body) => {

    var Validator = require('jsonschema').Validator;
    var v = new Validator();

    var db2Schema = {
        "id": "/test",
        "type": "object",
        "properties": {
            "id": { "type": "number" },
            "parent": { "type": "number" },
        },
        "required": ["id", "parent", "data"]
    };
    console.log("v.validate(body, db2Schema)=>", v.validate(body, db2Schema))
    if (v.validate(body, db2Schema).errors.length) {
        return [404, {
            status: "fail",
            message: v.validate(body, db2Schema).errors
        }]
    }
    return [200, {
        status: "success",
    }]
}