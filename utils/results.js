
exports.responses = (data) => {
    return {
        "notFoundId": {
            "statusCode": 409,
            "result": {
                status: "fail",
                message: "شناسه پیدا نشد"
            },
        },
        "successSave": {
            "statusCode": 201,
            "result": {
                status: "success",
                message: "داده ها ذخیره شد.",
            },
        },
        "successUpdate": {
            "statusCode": 202,
            "result": {
                status: "success",
                message: "داده ها به روزرسانی شد"
            }
        },
        "successClearCache": {
            "statusCode": 202,
            "result": {
                status: "success",
                data: "اطلاعات پاک شد."
            },
        },
        "accessDenied": {
            "statusCode": 403,
            "result": {
                status: "fail",
                message: "امکان ثبت اطلاعات برای این پرنت وجود ندارد.",
            },
        },
        "errorDuplicateUser": {
            "statusCode": 409,
            "result": {
                status: "fail",
                message: "شناسه ی دادهها تکراری است.",
            }
        },
        "notValueId": {
            "statusCode": 400,
            "result": {
                status: "fail",
                message: "id مقداردهی نشده است.",
            }
        },
        "allData": {
            "statusCode": 200,
            "result": {
                status: "success",
                data: data
            }
        },
        "invalidRequest": {
            "statusCode": 404,
            "result": {
                status: "fail",
                message: "درخواست معتبر نیست"
            }
        },
        "connectionError": {
            status: "fail",
            data: "خطای پایگاه داده"
        },
        "validationError": {
            // "result":data,
            "statusCode": 404,
            "result": {
                status: "fail",
                data
            }
        },
        "validationSuccess": {
            "statusCode": 200,
            "result": {
                status: "success",
                message: "OK"
            }
        },
        "accessDeniedParent": {
            "statusCode": 403,
            "result": {
                status: "fail",
                message: " شما امکان ویرایش اطلاعات این کارمند را ندارید.",

            },
        }
    }
}