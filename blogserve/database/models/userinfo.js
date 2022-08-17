const { Sequelize, Model } = require("sequelize");
var sequelize = require("../sequelize");
class userinfobase extends Model {}
userinfobase.init(
    {
        PK_userGuid: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
        },
        username: Sequelize.STRING(50),
        useraccount: Sequelize.STRING(50),
        userheadimg: {
            type: Sequelize.STRING(255),
            defaultValue: "default/userinfo.jpeg",
        },
        userpassword: Sequelize.CHAR(36),
        userjurisdiction: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
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
        modelName: "userinfo",
    }
);
module.exports = userinfobase;
