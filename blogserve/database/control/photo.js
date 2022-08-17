const photobase = require("../models/photo");
const Op = require("sequelize").Op;
const uuid = require("node-uuid"); //uuid.v1(); -->基于时间戳生成  （time-based） uuid.v4(); -->随机生成  (random)
const md5 = require("md5-node");
class photoFun {
    /**
     * 获取图片分页
     * @param {Number} page 页码
     * @param {Number} limit 每页数量
     */
    async getPagephoto(page = 0, limit = 50, status = [0, 1]) {
        let photos = await photobase.findAndCountAll({
            attributes: [
                "PK_photoGuid",
                "name",
                "photoUrl",
                "status",
                "createtime",
            ],
            where: {
                status: {
                    [Op.in]: status,
                },
            },
            offset: page * limit,
            limit: limit,
            order: [["createtime", "DESC"]],
        });
        return photos;
    }
    /**
     * 创建图片
     * @param {Object} info
     */
    async createphoto(info) {
        let photo = await photobase.create({
            PK_photoGuid: uuid.v1(),
            name: info.name,
            photoUrl: info.photoUrl,
        });
        return photo;
    }
    /**
     *修改图片信息
     * @param {String} PK_photoGuid 图片标识
     * @param {String} name 图片名字
     * @param {String} photoUrl 图片地址
     */
    async changephoto(PK_photoGuid, name, photoUrl) {
        let result = await photobase.update(
            {
                name: name,
                photoUrl: photoUrl,
            },
            {
                where: {
                    PK_photoGuid: PK_photoGuid,
                },
            }
        );
        return result;
    }
    /**
     *修改图片状态
     * @param {String} PK_photoGuid 图片标识
     * @param {Number} status 修改状态
     */
    async setphotoState(PK_photoGuid, status) {
        let result = await photobase.update(
            {
                status: status,
            },
            {
                where: {
                    PK_photoGuid: PK_photoGuid,
                },
            }
        );
        return result;
    }
}
module.exports = new photoFun();
