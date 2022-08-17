const { Sequelize, Model } = require('sequelize')
var sequelize = require('../sequelize')
class projectbase extends Model {}
projectbase.init(
    {
        PK_projectGuid: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
        },
        name: Sequelize.STRING(50),
        description: Sequelize.TEXT,
        logo: Sequelize.STRING(255),
        labelkeywords: Sequelize.STRING(255),
        projectImages: Sequelize.TEXT,
        projectUrl: Sequelize.STRING(255),
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
        modelName: 'project',
    }
)
module.exports = projectbase
