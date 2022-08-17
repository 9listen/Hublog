const express = require("express");
const router = express.Router();
const linkfriendsFun = require("./../../database/control/linkfriends");
const articlleFun = require("./../../database/control/articlle");
const projectFun = require("./../../database/control/project");
const columnFun = require("./../../database/control/column");
const userinfoFun = require("./../../database/control/userinfo");
const verification = require("../../modules/verification");
const photoFun = require("./../../database/control/photo");
function loginFitter(req, res, next) {
    if (req.session.userinfo) {
        next();
    } else {
        res.send(
            JSON.stringify({
                status: 403,
                msg: "权限不够",
            })
        );
    }
}
//管理端登录
router.post("/login", (req, res) => {
    userinfoFun
        .getUserinfo(req.body.account, req.body.password)
        .then((getUserinfores) => {
            if (getUserinfores !== null) {
                req.session.userinfo = getUserinfores;
                res.send(
                    JSON.stringify({
                        status: 200,
                        msg: "登录成功",
                        data: req.session.userinfo,
                    })
                );
            } else {
                res.send(
                    JSON.stringify({
                        status: -1,
                        msg: "账号密码错误",
                        data: "",
                    })
                );
            }
        });
});
//获取友链
router.post("/getlinkfriends", loginFitter, (req, res) => {
    linkfriendsFun
        .getLinkFriends(0, 50, [0, 1])
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
            console.log(err);
            res.send(
                JSON.stringify({
                    status: 404,
                    msg: "获取失败",
                })
            );
        });
});
//修改友链状态
router.post("/setlinkfriendstatus", loginFitter, (req, res) => {
    if (
        !verification.IsEmptyParameter(req.body, [
            "PK_linkfriendGuid",
            "status",
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
        .setLinkFriendstate(req.body.PK_linkfriendGuid, req.body.status)
        .then((setLinkFriendstateres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "修改成功",
                    data: setLinkFriendstateres,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
//修改友链
router.post("/changelinkfriend", loginFitter, (req, res) => {
    if (
        !verification.IsEmptyParameter(req.body, [
            "PK_linkfriendGuid",
            "name",
            "description",
            "status",
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
        .changeLinkFriend(
            req.body.PK_linkfriendGuid,
            req.body.name,
            req.body.description,
            req.body.url,
            req.body.logo,
            req.body.sort
        )
        .then((setLinkFriendstateres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "修改成功",
                    data: setLinkFriendstateres,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
//删除友链
router.post("/deletelinkfriend", loginFitter, (req, res) => {
    if (!verification.IsEmptyParameter(req.body, ["PK_linkfriendGuid"])) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    linkfriendsFun
        .setLinkFriendstate(req.body.PK_linkfriendGuid, 99)
        .then((setLinkFriendstateres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "删除成功",
                    data: setLinkFriendstateres,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
//获取文章分页
router.post("/getpagearticle", loginFitter, (req, res) => {
    articlleFun
        .getPageArticle(req.body.page, req.body.limit, false)
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
            console.log(err);
        });
});
//添加图片
router.post("/createphoto", loginFitter, (req, res) => {
    if (!verification.IsEmptyParameter(req.body, ["name", "photoUrl"])) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    photoFun
        .createphoto(req.body)
        .then((createPhotoes) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "创建成功",
                    data: createPhotoes,
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
//删除图片
router.post("/deletephoto", loginFitter, (req, res) => {
    if (!verification.IsEmptyParameter(req.body, ["PK_photoGuid"])) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    photoFun
        .setphotoState(req.body.PK_photoGuid, 99)
        .then((photores) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "删除成功",
                    data: photores,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
//修改图片信息
router.post("/changephoto", loginFitter, (req, res) => {
    if (
        !verification.IsEmptyParameter(req.body, [
            "PK_photoGuid",
            "name",
            "photoUrl",
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
    photoFun
        .changephoto(req.body.PK_photoGuid, req.body.name, req.body.photoUrl)
        .then((changePhotores) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "修改成功",
                    data: changePhotores,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
//获取图片分页
router.post("/getphotos", (req, res) => {
    if (!verification.IsEmptyParameter(req.body, ["page", "limit"])) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    photoFun
        .getPagephoto(req.body.page, req.body.limit, [0, 1])
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
            console.log(err);
        });
});
//创建项目
router.post("/createproject", loginFitter, (req, res) => {
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
            console.log(err);
        });
});
//获取项目分页
router.post("/getprojects", loginFitter, (req, res) => {
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
        .getPageProject(req.body.page, req.body.limit, [0, 1])
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
            console.log(err);
        });
});
//修改项目状态
router.post("/setprojectstatus", loginFitter, (req, res) => {
    if (
        !verification.IsEmptyParameter(req.body, ["PK_projectGuid", "status"])
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
        .setProjectState(req.body.PK_projectGuid, req.body.status)
        .then((getPageProjectres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "修改成功",
                    data: getPageProjectres,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
//删除项目
router.post("/deleteproject", loginFitter, (req, res) => {
    if (!verification.IsEmptyParameter(req.body, ["PK_projectGuid"])) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    projectFun
        .setProjectState(req.body.PK_projectGuid, 99)
        .then((getPageProjectres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "删除成功",
                    data: getPageProjectres,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
//修改项目信息
router.post("/changeproject", loginFitter, (req, res) => {
    if (
        !verification.IsEmptyParameter(req.body, [
            "PK_projectGuid",
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
        .changeProject(
            req.body.PK_projectGuid,
            req.body.name,
            req.body.description,
            req.body.logo,
            req.body.labelkeywords,
            req.body.projectImages,
            req.body.projectUrl
        )
        .then((changeProjectres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "修改成功",
                    data: changeProjectres,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
//获取栏目分页
router.post("/getcolumns", loginFitter, (req, res) => {
    if (!verification.IsEmptyParameter(req.body, ["page", "limit"])) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    columnFun
        .getPageColumn(req.body.page, req.body.limit, [0, 1])
        .then((getPageColumnres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "获取成功",
                    data: getPageColumnres,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
//创建栏目
router.post("/createcolumn", loginFitter, (req, res) => {
    if (!verification.IsEmptyParameter(req.body, ["name"])) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    columnFun
        .createColumn(req.body.name)
        .then((createColumnres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "创建成功",
                    data: createColumnres,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
//修改栏目信息
router.post("/changecolumn", loginFitter, (req, res) => {
    if (!verification.IsEmptyParameter(req.body, ["PK_columnGuid", "name"])) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    columnFun
        .changeColumn(req.body.PK_columnGuid, req.body.name)
        .then((changeColumnres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "修改成功",
                    data: changeColumnres,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
//修改项目状态
router.post("/setcolumnstatus", loginFitter, (req, res) => {
    if (!verification.IsEmptyParameter(req.body, ["PK_columnGuid", "status"])) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    columnFun
        .setColumnState(req.body.PK_columnGuid, req.body.status)
        .then((setColumnStateres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "修改成功",
                    data: setColumnStateres,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
//删除项目
router.post("/deletecolumn", loginFitter, (req, res) => {
    if (!verification.IsEmptyParameter(req.body, ["PK_columnGuid"])) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    columnFun
        .setColumnState(req.body.PK_columnGuid, 99)
        .then((setColumnStateres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "删除成功",
                    data: setColumnStateres,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
//发布文章
router.post("/createarticle", loginFitter, (req, res) => {
    if (
        !verification.IsEmptyParameter(req.body, [
            "title",
            "description",
            "articleContentMd",
            "articleContentHtml",
            "articlecolumn",
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
    if (req.body.PK_articleGuid === "") {
        articlleFun
            .createArticle(
                req.body.title,
                req.body.description,
                req.body.imagecover,
                req.body.articleContentMd,
                req.body.articleContentHtml,
                req.body.labellist,
                req.body.articlecolumn
            )
            .then((createArticleres) => {
                res.send(
                    JSON.stringify({
                        status: 200,
                        msg: "发布成功",
                        data: createArticleres,
                    })
                );
            })
            .catch((err) => {
                console.log(err);
                res.send(
                    JSON.stringify({
                        status: -1,
                        msg: "发布失败",
                    })
                );
            });
    } else {
        articlleFun
            .changeArticle(
                req.body.PK_articleGuid,
                req.body.title,
                req.body.description,
                req.body.imagecover,
                req.body.articleContentMd,
                req.body.articleContentHtml,
                req.body.labellist,
                req.body.articlecolumn
            )
            .then((changeArticleres) => {
                res.send(
                    JSON.stringify({
                        status: 200,
                        msg: "修改成功",
                        data: changeArticleres,
                    })
                );
            })
            .catch((err) => {
                console.log(err);
                res.send(
                    JSON.stringify({
                        status: -1,
                        msg: "修改失败",
                    })
                );
            });
    }
});
//删除文章
router.post("/deletearticle", loginFitter, (req, res) => {
    if (!verification.IsEmptyParameter(req.body, ["PK_articleGuid"])) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    articlleFun
        .setArticleState(req.body.PK_articleGuid, 99)
        .then((setArticleStateres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "删除成功",
                    data: setArticleStateres,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
//修改文章状态
router.post("/setarticlestatus", loginFitter, (req, res) => {
    if (
        !verification.IsEmptyParameter(req.body, ["PK_articleGuid", "status"])
    ) {
        res.send(
            JSON.stringify({
                status: 400,
                msg: "参数缺失或不合法",
            })
        );
        return;
    }
    articlleFun
        .setArticleState(req.body.PK_articleGuid, req.body.status)
        .then((setColumnStateres) => {
            res.send(
                JSON.stringify({
                    status: 200,
                    msg: "修改成功",
                    data: setColumnStateres,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
});
module.exports = router;
