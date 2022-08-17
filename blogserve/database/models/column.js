const { Sequelize, Model } = require('sequelize')
var sequelize = require('../sequelize')
class columnbase extends Model {}
columnbase.init(
    {
        PK_columnGuid: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
        },
        name: Sequelize.STRING(50),
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
        modelName: 'column',
    }
)
module.exports = columnbase
