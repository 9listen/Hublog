const { Sequelize, Model } = require('sequelize')
var sequelize = require('../sequelize')
class linkfriendsbase extends Model {}
linkfriendsbase.init(
    {
        PK_linkfriendGuid: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
        },
        name: Sequelize.STRING(50),
        description: Sequelize.STRING(255),
        url: Sequelize.STRING(255),
        sort: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        logo: {
            type: Sequelize.STRING(255),
        },
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
        modelName: 'linkfriend',
    }
)
module.exports = linkfriendsbase
