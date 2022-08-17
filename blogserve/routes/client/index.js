const express = require("express");
const router = express.Router();
const sendEmail = require("../../modules/email");
const verification = require("../../modules/verification");

const linkfriendsFun = require("./../../database/control/linkfriends");
const articlleFun = require("./../../database/control/articlle");
const projectFun = require("./../../database/control/project");
const messageFun = require("./../../database/control/message");

//获取友链
router.post("/getlinkfriends", (req, res) => {
    linkfriendsFun
        .getLinkFriends()
        .then((getLinkFriendsres) => {
            if (getLinkFriendsres) {
                res.send(
                    JSON.stringify({
                        status: 200,
                        msg: "获取成功",
                        data: getLinkFriendsres,
                    })
                );
            }
        })
        .catch((err) => {
            res.send(
                JSON.stringify({
                    status: -1,
                    msg: "失败",
                })
            );
            res.send(
                JSON.stringify({
                    status: -1,
                    msg: "获取失败",
                })
            );
        });
});
//创建友链
router.post("/createlinkfriend", (req, res) => {
    if (
        !verification.IsEmptyParameter(req.body, [
            "name",
            "description",
            "logo",
            "url",
            "sort",
        ])
    ) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    linkfriendsFun
        .createLinkFriend(
            req.body.name,
            req.body.description,
            req.body.url,
            req.body.logo,
            req.body.sort
        )
        .then((createfriendres) => {
            if (createfriendres) {
                try {
                    //设置收件人信息
                    let mailOptions = {
                        from: "257286767@qq.com", //谁发的
                        to: "1846930039@qq.com", //发给谁
                        subject: "友链申请", //主题是什么
                        text: `${req.body.name}的友情链接，请尽快处理，申请链接${req.body.url}`, //文本内容
                        html: `<div>${req.body.name}的友情链接，请尽快处理</div>`, //html模板
                    };
                    sendEmail.sendQQemail(mailOptions);
                } catch (error) {
                    console.log(error);
                }
                res.send(
                    JSON.stringify({
                        status: 200,
                        msg: "申请成功，等待博主审核",
                    })
                );
            }
        })
        .catch((err) => {
            res.send(
                JSON.stringify({
                    status: -1,
                    msg: "申请失败，请联系博主，处理",
                })
            );
        });
});
//获取文章列表分页 
router.post("/getpagearticle", (req, res) => {
    articlleFun
        .getPageArticle(req.body.page, req.body.limit, true)
        .then((getLinkarticleres) => {
            res.send(
                JSON.stringify({ 
                    status: 200,
                    msg: "获取成功",
                    data: getLinkarticleres,
                })
            );
        })
        .catch((err) => {
            res.send(
                JSON.stringify({
                    status: -1,
                    msg: "失败",
                })
            );
        });
});
//创建项目
router.post("/createproject", (req, res) => {
    if (
        !verification.IsEmptyParameter(req.body, [
            "name",
            "description",
            "logo",
            "projectUrl",
        ])
    ) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    projectFun
        .createProject(req.body)
        .then((createProjectres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "创建成功",
                    data: createProjectres,
                })
            );
        })
        .catch((err) => {
            res.send(
                JSON.stringify({
                    status: -1,
                    msg: "失败",
                })
            );
        });
});
//获取项目分页
router.post("/getprojects", (req, res) => {
    if (!verification.IsEmptyParameter(req.body, ["page", "limit"])) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    projectFun
        .getPageProject(req.body.page, req.body.limit, [1])
        .then((getPageProjectres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "获取成功",
                    data: getPageProjectres,
                })
            );
        })
        .catch((err) => {
            res.send(
                JSON.stringify({
                    status: -1,
                    msg: "失败",
                })
            );
        });
});
//文章浏览量加一
router.post("/addviews", (req, res) => {
    articlleFun
        .addArticleViews(req.body.PK_articleGuid)
        .then((addArticleViewsres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "成功",
                })
            );
        })
        .catch((err) => {
            res.send(
                JSON.stringify({
                    status: -1,
                    msg: "失败",
                })
            );
        });
});
//重定向qq
router.post("/getqqlogin", (req, res) => {
    let URL = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101905280&redirect_uri=http://www.xkongkeji.com/qq`;
    res.send(
        JSON.stringify({
            status: 200,
            msg: "成功",
            data: URL,
        })
    );
});
//验证朋友是否登录
router.post("/friendlogin", (req, res) => {
    const getUserinfores =  {
        PK_userGuid: "af0b4dc0-f71c-11ea-8d33-734a3583358f",
        nickname: "萤火之森",
        userheadimg:
          "http://thirdqq.qlogo.cn/g?b=oidb&k=icCoFibWNBqaWzpicoQEYkZlg&s=40&t=1595259755"
    }
    req.session.friendinfo = getUserinfores;
    res.send(
        JSON.stringify({
            status: 200,
            msg: "成功",
            data: req.session.friendinfo,
        })
    );
    // if (req.session.friendinfo) {
    //     res.send(
    //         JSON.stringify({
    //             status: 200,
    //             msg: "成功",
    //             data: req.session.friendinfo,
    //         })
    //     );
    // } else {
    //     res.send(
    //         JSON.stringify({
    //             status: -1,
    //             msg: "未登录",
    //         })
    //     );
    // }
});
//朋友退出
router.post("/friendexit", (req, res) => {
    try {
        if (req.session.friendinfo) {
            req.session.destroy();
        }
    } catch (error) {
        console.log(error);
    }
    res.send(
        JSON.stringify({
            status: 200,
            msg: "退出登录",
        })
    );
});
//留言
router.post("/leavingmsg", (req, res) => {
    if (
        !verification.IsEmptyParameter(req.body, ["content", "FK_articleGuid"])
    ) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    const getUserinfores =  {
        PK_userGuid: "af0b4dc0-f71c-11ea-8d33-734a3583358f",
        nickname: "萤火之森",
        userheadimg:
          "http://thirdqq.qlogo.cn/g?b=oidb&k=icCoFibWNBqaWzpicoQEYkZlg&s=40&t=1595259755"
    }
    req.session.friendinfo = getUserinfores;
    console.log('🔥log=>index=>285:req.session.friendinfo:%o',req.session.friendinfo)
    if (!req.session.friendinfo) {
        res.send(
            JSON.stringify({
                status: 401,
                msg: "未登录",
            })
        );
        return;
    }
    messageFun
        .createmessage(
            req.body.content,
            req.body.FK_parentLineageGuid,
            req.body.FK_parentGuid,
            req.body.FK_articleGuid,
            req.session.friendinfo.PK_userGuid
        )
        .then((createmessageres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "成功",
                    data: createmessageres,
                })
            );
        });
});
//获取留言
router.post("/getmsgs", (req, res) => {
    if (!verification.IsEmptyParameter(req.body, ["FK_articleGuid"])) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    messageFun
        .getPageMessage(req.body.FK_articleGuid)
        .then((getPageMessageres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "成功",
                    data: getPageMessageres,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
module.exports = router;
