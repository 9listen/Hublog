const projectbase = require('../models/project')
const Op = require('sequelize').Op
const uuid = require('node-uuid') //uuid.v1(); -->基于时间戳生成  （time-based） uuid.v4(); -->随机生成  (random)
const md5 = require('md5-node')
class projectFun {
    /**
     * 获取项目分页
     * @param {Number} page 页码
     * @param {Number} limit 每页数量
     */
    async getPageProject(page = 0, limit = 50, status = [0, 1]) {
        let projects = await projectbase.findAndCountAll({
            attributes: [
                'PK_projectGuid',
                'name',
                'description',
                'logo',
                'labelkeywords',
                'projectImages',
                'projectUrl',
                'status',
            ],
            where: {
                status: {
                    [Op.in]: status,
                },
            },
            offset: page * limit,
            limit: limit,
            order: [['createtime', 'DESC']],
        })
        for (let i = 0; i < projects.rows.length; i++) {
            projects.rows[i].labelkeywords = JSON.parse(
                projects.rows[i].labelkeywords
            )
            projects.rows[i].projectImages = JSON.parse(
                projects.rows[i].projectImages
            )
        }
        return projects
    }
    /**
     * 创建项目
     * @param {Object} info
     */
    async createProject(info) {
        let project = await projectbase.create({
            PK_projectGuid: uuid.v1(),
            name: info.name,
            description: info.description,
            logo: info.logo,
            labelkeywords: JSON.stringify(info.labelkeywords),
            projectImages: JSON.stringify(info.projectImages),
            projectUrl: info.projectUrl,
            createtime: info.createtime,
        })
        return project
    }
    /**
     *修改项目信息
     * @param {String} PK_projectGuid 项目标识
     * @param {String} name 项目名字
     * @param {String} description 项目描述
     * @param {String} logo 项目logo
     * @param {Object} labelkeywords 项目关键字
     * @param {Object} projectImages 项目截图
     * @param {String} projectUrl 项目地址
     */
    async changeProject(
        PK_projectGuid,
        name,
        description,
        logo,
        labelkeywords,
        projectImages,
        projectUrl
    ) {
        let result = await projectbase.update(
            {
                name: name,
                description: description,
                logo: logo,
                labelkeywords: JSON.stringify(labelkeywords),
                projectImages: JSON.stringify(projectImages),
                projectUrl: projectUrl,
            },
            {
                where: {
                    PK_projectGuid: PK_projectGuid,
                },
            }
        )
        return result
    }
    /**
     *修改项目状态
     * @param {String} PK_projectGuid 项目标识
     * @param {Number} status 修改状态
     */
    async setProjectState(PK_projectGuid, status) {
        let result = await projectbase.update(
            {
                status: status,
            },
            {
                where: {
                    PK_projectGuid: PK_projectGuid,
                },
            }
        )
        return result
    }
}
module.exports = new projectFun()
