exports.userAndParentSchema = () => {
    return {
        "id": "/test",
        "type": "object",
        "properties": {
            "id": { "type": "number" },
            "parent": { "type": "number" },
        },
        "required": ["id", "parent", "data"]
    };
}