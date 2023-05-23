
exports.status =async () => {
    const a= {
        "notFoundId": [409, {
            status: "fail",
            message: "شناسه پیدا نشد"
        }],
        "successSave": [201, {
            status: "success",
            message: "داده ها ذخیره شد.",
        }],
        "successUpdate": [202, {
            status: "success",
            message: "داده ها به روزرسانی شد"
        }],
        "successClearCache": [202, {
            status: "success",
            data: "اطلاعات پاک شد."
        }],
        "accessDenied": [403, {
            status: "fail",
            message: "امکان ثبت اطلاعات برای این پرنت وجود ندارد.",
        }],
        "errorDuplicateUser": [409, {
            status: "fail",
            message: "شناسه ی دادهها تکراری است.",
        }],
        "notValueId": [409, {
            status: "fail",
            message: "id مقداردهی نشده است.",
        }]
    }
    // await console.log("a=>", a)
    return a
}
