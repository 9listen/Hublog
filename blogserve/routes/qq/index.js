const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("./../../config/index").qq;
const userinfobyqqFun = require("./../../database/control/userinfobyqq");
//qq登录
router.get("/", async (req, res) => {
    let AccessToken = await axios({
        url: `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=${
            config.client_id
        }&client_secret=${config.client_secret}&code=${
            req.query.code
        }&redirect_uri=${encodeURI(config.redirect_uri)}`,
        method: "GET",
    }).catch((err) => {
        return; 
    });
    let arrAccessToken = AccessToken.data.split("&");
    let tempAccessTokenAccessToken = arrAccessToken[0].split("=");
    AccessToken = tempAccessTokenAccessToken[1];
    let OpenIdStr = await axios({
        url: "https://graph.qq.com/oauth2.0/me?access_token=" + AccessToken,
        method: "get",
    }).catch((err) => {
        return;
    });
    function jsonp(str) {
        let startIndex = str.indexOf("(");
        let endIndex = str.lastIndexOf(")");
        let userjson = str.substring(startIndex + 1, endIndex);
        return userjson;
    }
    let OpenIdObj = JSON.parse(jsonp(OpenIdStr.data)); //获取openid
    let getUserinfores = await userinfobyqqFun
        .getUserinfo(OpenIdObj.openid)
        .catch((err) => {
            return;
        });
    if (getUserinfores === null || getUserinfores === undefined) {
        let UserInfoObj = await axios({
            url: `https://graph.qq.com/user/get_user_info?access_token=${AccessToken}&oauth_consumer_key=${config.client_id}&openid=${OpenIdObj.openid}`,
            method: "get",
        }).catch((err) => {
            return;
        });
        if (UserInfoObj.data.ret === 0) {
            await userinfobyqqFun
                .createUserinfo(
                    OpenIdObj.openid,
                    UserInfoObj.data.nickname,
                    UserInfoObj.data.figureurl_qq_1
                )
                .then((createUserinfores) => {
                    req.session.friendinfo = createUserinfores;
                    res.redirect(
                        302,
                        "https://blog.xkongkeji.com/messageboard"
                        // http://localhost:8080/messageboard
                    );
                });
        } else {
            res.send(
                JSON.stringify({
                    status: -1,
                    msg: "登录失败",
                })
            );
        }
    } else {
        req.session.friendinfo = getUserinfores;
        res.redirect(302, `https://blog.xkongkeji.com/messageboard`);
        // http://localhost:8080/messageboard
    }
});
module.exports = router;
