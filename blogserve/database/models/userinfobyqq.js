const { Sequelize, Model } = require("sequelize");
var sequelize = require("../sequelize");
class userinfobase extends Model {}
userinfobase.init(
    {
        PK_userGuid: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
        },
        nickname: Sequelize.STRING(50),
        userheadimg: {
            type: Sequelize.STRING(255),
        },
        useropenid: {
            type: Sequelize.STRING(255),
        },
        userstatus: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: "userinfobyqq",
    }
);
module.exports = userinfobase;
