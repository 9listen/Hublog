const articlebase = require("../models/article");
const sequelize = require("../sequelize");
const Op = require("sequelize").Op;
const uuid = require("node-uuid"); //uuid.v1(); -->基于时间戳生成  （time-based） uuid.v4(); -->随机生成  (random)
const md5 = require("md5-node");
class articleFun {
    /**
     * 获取文章分页
     * @param {Number} page 页码
     * @param {Number} limit 每页数量
     * @param {Boolean} isExamine 文章是否审核
     */
    async getPageArticle(page = 0, limit = 5, isExamine = true) {
        let countTemp = await articlebase.count();
        let getArticleSql = `
        select 
        PK_articleGuid,
        title,
        description,
        imagecover,
        articleContentMd,
        articleContentHtml,
        labellist,
        browsenum,
        FK_columnGuid,
        article.status,
        \`name\` as columnname,
        lasttime from article join \`column\` 
        on FK_columnGuid=PK_columnGuid
        where \`column\`.status = 1 and ${
            isExamine
                ? "article.status=1"
                : "(article.status=1 or article.status=0)"
        } 
        order by lasttime DESC LIMIT ${page * limit},${limit};`;
        let articles = await sequelize.query(getArticleSql, {
            type: sequelize.QueryTypes.SELECT,
        });
        for (let i = 0; i < articles.length; i++) {
            articles[i].labellist = JSON.parse(articles[i].labellist);
        }
        let data = {
            rows: articles,
            count: countTemp,
        };
        return data;
    }
    /**
     *发布文章
     * @param {String} title 文章标题
     * @param {String} description 文章摘要
     * @param {String} imagecover 文章封面
     * @param {String} articleContentMd 文章Md
     * @param {String} articleContentHtml 文章Html
     * @param {String} labellist 文章标签
     * @param {String} FK_columnGuid 文章所属栏目标识
     */
    async createArticle(
        title,
        description,
        imagecover,
        articleContentMd,
        articleContentHtml,
        labellist,
        FK_columnGuid
    ) {
        let article = await articlebase.create({
            PK_articleGuid: uuid.v1(),
            title: title,
            description: description,
            imagecover: imagecover,
            articleContentMd: articleContentMd,
            articleContentHtml: articleContentHtml,
            labellist: JSON.stringify(labellist),
            FK_columnGuid: FK_columnGuid,
        });
        return article;
    }
    /**
     *修改文章信息
     * @param {String} PK_articleGuid 文章标识
     * @param {String} title 文章标题
     * @param {String} description 文章摘要
     * @param {String} imagecover 文章封面
     * @param {String} articleContentMd 文章Md
     * @param {String} articleContentHtml 文章Html
     * @param {String} labellist 文章标签
     * @param {String} FK_columnGuid 文章所属栏目标识
     */
    async changeArticle(
        PK_articleGuid,
        title,
        description,
        imagecover,
        articleContentMd,
        articleContentHtml,
        labellist,
        FK_columnGuid
    ) {
        let artiicle = await articlebase.update(
            {
                title: title,
                description: description,
                imagecover: imagecover,
                articleContentHtml: articleContentHtml,
                articleContentMd: articleContentMd,
                labellist: JSON.stringify(labellist),
                FK_columnGuid: FK_columnGuid,
            },
            {
                where: {
                    PK_articleGuid: PK_articleGuid,
                },
            }
        );
        return artiicle;
    }
    /**
     *修改文章状态
     * @param {String} PK_articleGuid 文章标识
     * @param {Number} status 修改状态
     */
    async setArticleState(PK_articleGuid, status) {
        let article = await articlebase.update(
            {
                status: status,
            },
            {
                where: {
                    PK_articleGuid: PK_articleGuid,
                },
            }
        );
        return article;
    }
    /**
     *文章浏览量加一
     * @param {String} PK_articleGuid 文章标识
     */
    async addArticleViews(PK_articleGuid) {
        let addViewsSql = `update article set browsenum=browsenum+1 where PK_articleGuid = '${PK_articleGuid}'`;
        let result = await sequelize.query(addViewsSql);
        return result;
    }
}
module.exports = new articleFun();
