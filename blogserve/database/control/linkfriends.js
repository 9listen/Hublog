const linkfriendsbase = require('../models/linkfriends')
const Op = require('sequelize').Op
const uuid = require('node-uuid') //uuid.v1(); -->基于时间戳生成  （time-based） uuid.v4(); -->随机生成  (random)
const md5 = require('md5-node')
class linkfriendFun {
    /**
     * 获取友链
     * @param {Number} page 页码
     * @param {Number} limit 页数
     * @param {String} status 状态
     */
    async getLinkFriends(page = 0, limit = 50, status = [1]) {
        let LinkFriends = await linkfriendsbase.findAndCountAll({
            attributes: [
                'PK_linkfriendGuid',
                'name',
                'description',
                'url',
                'logo',
                'sort',
                'createtime',
                'status',
            ],
            where: {
                status: {
                    [Op.in]: status,
                },
            },
            offset: page * limit,
            limit: limit,
            order: [['sort', 'DESC']],
        })

        return LinkFriends
    }
    /**
     *
     * @param {String} name
     * @param {String} description
     * @param {String} url
     * @param {String} logo
     * @param {String} sort
     */
    async createLinkFriend(name, description, url, logo, sort = 0) {
        let result = await linkfriendsbase.create({
            PK_linkfriendGuid: uuid.v1(),
            name: name,
            description: description,
            url: url,
            logo: logo,
            sort: sort,
        })
        return result
    }
    /**
     *修改友链
     * @param {String} PK_linkfriendGuid 友链标识
     * @param {String} name 名称
     * @param {String} description 描述
     * @param {String} url 地址
     * @param {String} logo logo,
     * @param {String} sort 热度
     */

    async changeLinkFriend(
        PK_linkfriendGuid,
        name,
        description,
        url,
        logo,
        sort
    ) {
        let result = await linkfriendsbase.update(
            {
                name: name,
                description: description,
                url: url,
                logo: logo,
                sort: sort,
            },
            {
                where: {
                    PK_linkfriendGuid: PK_linkfriendGuid,
                },
            }
        )
        return result
    }
    //修改友链状态
    /**
     *
     * @param {String} PK_linkfriendGuid
     * @param {Number} status
     */
    async setLinkFriendstate(PK_linkfriendGuid, status) {
        let result = await linkfriendsbase.update(
            {
                status: status,
            },
            {
                where: {
                    PK_linkfriendGuid: PK_linkfriendGuid,
                },
            }
        )
        return result
    }
}
module.exports = new linkfriendFun()
