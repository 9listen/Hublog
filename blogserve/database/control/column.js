const columnbase = require('../models/column')
const Op = require('sequelize').Op
const uuid = require('node-uuid') //uuid.v1(); -->基于时间戳生成  （time-based） uuid.v4(); -->随机生成  (random)
const md5 = require('md5-node')
class columnFun {
    /**
     * 获取栏目分页
     * @param {Number} page 页码
     * @param {Number} limit 每页数量
     */
    async getPageColumn(page = 0, limit = 10, status = [0, 1]) {
        let columns = await columnbase.findAndCountAll({
            attributes: ['PK_columnGuid', 'name', 'createtime', 'status'],
            where: {
                status: {
                    [Op.in]: status,
                },
            },
            offset: page * limit,
            limit: limit,
            order: [['createtime', 'DESC']],
        })
        return columns
    }
    /**
     *创建栏目
     * @param {String} name
     */
    async createColumn(name) {
        let column = await columnbase.create({
            PK_columnGuid: uuid.v1(),
            name: name,
        })
        return column
    }
    /**
     *修改栏目信息
     * @param {String} PK_columnGuid 项目标识
     * @param {String} name 项目名字
     */
    async changeColumn(PK_columnGuid, name) {
        let column = await columnbase.update(
            {
                name: name,
            },
            {
                where: {
                    PK_columnGuid: PK_columnGuid,
                },
            }
        )
        return column
    }
    /**
     *修改项目状态
     * @param {String} PK_columnGuid 项目标识
     * @param {Number} status 修改状态
     */
    async setColumnState(PK_columnGuid, status) {
        let column = await columnbase.update(
            {
                status: status,
            },
            {
                where: {
                    PK_columnGuid: PK_columnGuid,
                },
            }
        )
        return column
    }
}
module.exports = new columnFun()
