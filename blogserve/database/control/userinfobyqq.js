const userinfobyqqbase = require("../models/userinfobyqq");
const Op = require("sequelize").Op;
const uuid = require("node-uuid"); //uuid.v1(); -->基于时间戳生成  （time-based） uuid.v4(); -->随机生成  (random)
const md5 = require("md5-node");
class userinfobyqqFun {
    /**
     *openid是否存在
     * @param {String} useropenid QQ获取的openid
     */
    async getUserinfo(useropenid) {
        let userinfo = await userinfobyqqbase
            .findOne({
                attributes: ["PK_userGuid", "nickname", "userheadimg"],
                where: { useropenid: useropenid },
            })
            .catch((err) => {
                throw err;
            });
        return userinfo;
    }
    /**
     * 创建用户
     * @param {String} useropenid  账户
     * @param {String} nickname 昵称
     * @param {String} userheadimg 头像
     */
    async createUserinfo(useropenid, nickname, userheadimg) {
        let result = await userinfobyqqbase.create({
            PK_userGuid: uuid.v1(),
            useropenid: useropenid,
            nickname: nickname,
            userheadimg: userheadimg,
        });
        return result;
    }
}
module.exports = new userinfobyqqFun();
