exports.userAndParentSchema = () => {
    return {
        "id": "/test",
        "type": "object",
        "properties": {
            "id": { "type": "string" },
            "parent": { "type": "string" },
        },
        "required": ["id", "parent", "data"]
    };
}