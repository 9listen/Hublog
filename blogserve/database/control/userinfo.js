const userinfobase = require("../models/userinfo");
const Op = require("sequelize").Op;
const uuid = require("node-uuid"); //uuid.v1(); -->基于时间戳生成  （time-based） uuid.v4(); -->随机生成  (random)
const md5 = require("md5-node");
class userinfoFun {
    /**
     *创建用户
     * @param {String} useraccount 账户
     * @param {String} username  姓名
     * @param {String} userpassword  密码
     */
    async createUserinfo(useraccount, username, userpassword) {
        let userinfo = await userinfobase
            .findOrCreate({
                where: { useraccount: useraccount },
                defaults: {
                    PK_userGuid: uuid.v1(),
                    username: username,
                    userpassword: md5(userpassword),
                },
            })
            .catch((err) => {
                throw err;
            });
        return userinfo;
    }
    /**
     * 获取用户信息
     * @param {String} useraccount  账户
     * @param {String} userpassword 密码
     */
    async getUserinfo(useraccount, userpassword) {
        let userinfo = await userinfobase
            .findOne({
                attributes: [
                    "PK_userGuid",
                    "username",
                    "useraccount",
                    "userheadimg",
                ],
                where: {
                    useraccount: useraccount,
                    userpassword: md5(userpassword),
                },
            })
            .catch((err) => {
                throw err;
            });
        return userinfo;
    }
}
module.exports = new userinfoFun();
