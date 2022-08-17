const { Sequelize, Model } = require("sequelize");
var sequelize = require("../sequelize");
class photobase extends Model {}
photobase.init(
    {
        PK_photoGuid: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
        },
        name: Sequelize.STRING(50),
        photoUrl: Sequelize.STRING(255),
        createtime: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: "photo",
    }
);
module.exports = photobase;
