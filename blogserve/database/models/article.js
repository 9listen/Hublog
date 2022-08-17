const { Sequelize, Model } = require("sequelize");
var sequelize = require("../sequelize");
class articlebase extends Model {}
articlebase.init(
    {
        PK_articleGuid: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
        },
        title: Sequelize.STRING(50),
        description: Sequelize.STRING(255),
        imagecover: Sequelize.STRING(255),
        articleContentMd: Sequelize.TEXT,
        articleContentHtml: Sequelize.TEXT,
        labellist: Sequelize.STRING(255),
        browsenum: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        createtime: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        lasttime: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        FK_columnGuid: Sequelize.CHAR(36), //所属分类
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: "article",
    }
);
module.exports = articlebase;
