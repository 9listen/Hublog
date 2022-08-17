const messagebase = require("../models/message");
const sequelize = require("../sequelize");
const uuid = require("node-uuid"); //uuid.v1(); -->基于时间戳生成  （time-based） uuid.v4(); -->随机生成  (random)
class messageFun {
    /**
     *创建留言
     * @param {String} content 内容
     * @param {String} FK_parentLineageGuid  所属顶层父节点ID
     * @param {String} FK_parentGuid  直接父节点ID
     * @param {String} FK_articleGuid 所属栏目ID
     * @param {String} FK_userGuid  所属用户ID
     */
    async createmessage(
        content,
        FK_parentLineageGuid,
        FK_parentGuid,
        FK_articleGuid,
        FK_userGuid
    ) {
        let message = await messagebase
            .create({
                PK_messageGuid: uuid.v1(),
                content: content,
                FK_parentLineageGuid: FK_parentLineageGuid,
                FK_parentGuid: FK_parentGuid,
                FK_articleGuid: FK_articleGuid,
                FK_userGuid: FK_userGuid,
            })
            .catch((err) => {
                throw err;
            });
        return message;
    }
    /**
     * 获取留言
     */
    async getPageMessage(FK_articleGuid) {
        let getMessageSql = `SELECT 
        PK_messageGuid,content,createtime,FK_parentLineageGuid,FK_parentGuid,FK_userGuid,FK_articleGuid,nickname as username,userheadimg,FK_userGuid
        FROM message join userinfobyqq 
        on message.FK_userGuid=userinfobyqq.PK_userGuid
        where FK_articleGuid='${FK_articleGuid}'
        ORDER BY createtime desc`;
        let messages = await sequelize.query(getMessageSql, {
            type: sequelize.QueryTypes.SELECT,
        });
        return messages;
    }
}
module.exports = new messageFun();
