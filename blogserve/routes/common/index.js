const express = require("express");
const router = express.Router();
const upload = require("../../modules/uploadfile");
const uuid = require("node-uuid");
const axios = require("axios");
const userinfobyqqFun = require("./../../database/control/userinfobyqq");
const PK_userinfoGuid = "39668212-a117-48a6-9566-d1dd9816558f";
// const request = require("request");
//上传文件
router.post("/uploadfile", function (req, res) {
    let timestamps = Math.round(new Date().getTime() / 1000).toString(); //时间戳
    let fileid = uuid.v1();
    upload
        .promiseUploadfile(req, false, fileid + timestamps, PK_userinfoGuid)
        .then((uploadfileres) => {
            if (uploadfileres.status == 1) {
                res.send(
                    JSON.stringify({
                        status: 1,
                        msg: "获取成功",
                        data: uploadfileres.file,
                    })
                );
            }
        })
        .catch((err) => {
            res.send(
                JSON.stringify({
                    status: 0,
                    msg: "未知错误",
                    data: err.msg,
                })
            );
        });
});
//qq登录
module.exports = router;
