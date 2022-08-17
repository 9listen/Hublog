const { Sequelize, Model } = require("sequelize");
var sequelize = require("../sequelize");
class messagebase extends Model {}
messagebase.init(
    {
        PK_messageGuid: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
        },
        content: Sequelize.TEXT,
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        createtime: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        FK_parentLineageGuid: Sequelize.CHAR(36), //留言父级id
        FK_parentGuid: Sequelize.CHAR(36), //最顶层父级id
        FK_articleGuid: Sequelize.CHAR(36), //所属文章id 留言墙抽象为文章
        FK_userGuid: Sequelize.CHAR(36), //留言人id
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: "message",
    }
);
module.exports = messagebase;
