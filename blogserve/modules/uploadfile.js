//上传文件
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const md5 = require('md5-node')
/**
 * 上传文件
 * @param {*} req 请求体
 * @param {Boolean} IsBackAbsolutepath 是否返回绝对路径
 * @param {String} savename 保存名字
 * @param {String} newdirname 新文件夹名字
 * @param {Function} callback 回调函数
 */
exports.uploadFile = function (
    req,
    IsBackAbsolutepath,
    savename,
    newdirname,
    callback
) {
    var form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.uploadDir = './public/uploadfile'
    form.keepExtensions = true
    form.maxFileSize = 5 * 1024 * 1024 * 1024 //文件大小限制5G
    form.on('error', function (err) {
        callback(err, {
            status: 0,
            msg: '上传系统繁忙',
        })
    })
    form.parse(req, async function (err, fields, files) {
        if (err) {
            callback(err, {
                status: 0,
                msg: '上传系统繁忙',
            })
        } else {
            let extname
            try {
                extname = path.extname(files.file.name) // 测试
            } catch (error) {
                callback(error, {
                    status: 3,
                    msg: '找不到文件',
                })
                return
            }
            let oldPath = files.file.path // 旧路径
            var defpath = path.join(__dirname, '../')
            if (newdirname) {
                let newPath =
                    defpath + 'public/' + newdirname + '/' + savename + extname
                fs.mkdir(defpath + 'public/' + newdirname, (err) => {
                    fs.rename(oldPath, newPath, function (err) {
                        if (err) {
                            callback(err, {
                                status: 3,
                                msg: '修改名称失败',
                            })
                        } else {
                            let backpath
                            if (IsBackAbsolutepath) {
                                backpath = newPath //返回绝对地址
                            } else {
                                backpath = newdirname + '/' + savename + extname //相对绝对地址
                            }
                            callback('success', {
                                status: 1,
                                file: {
                                    url: backpath,
                                    name: files.file.name,
                                    type: files.file.type,
                                    md5: md5(files.file.name),
                                },
                            })
                        }
                    })
                })
            } else {
                let newPath = defpath + savepath + '/' + savename + extname
                fs.rename(oldPath, newPath, function (err) {
                    if (err) {
                        callback(err, {
                            status: 3,
                            msg: '修改名称失败',
                        })
                    } else {
                        let backpath
                        if (IsBackAbsolutepath) {
                            backpath = newPath //返回绝对地址
                        } else {
                            backpath = newdirname + '/' + savename + extname //相对绝对地址
                        }
                        callback('success', {
                            status: 1,
                            file: {
                                url: backpath,
                                name: files.file.name,
                                type: files.file.type,
                                md5: md5(files.file.name),
                            },
                        })
                    }
                })
            }
        }
    })
}
/**
 * 上传文件Promise方法
 * @param {*} req 请求体
 * @param {Boolean} IsBackAbsolutepath 是否返回物理地址
 * @param {String} savename 保存名字
 * @param {String} newdirname 新文件夹名字
 * @param {String} uploadDir 上传文件临时存放地址 可选
 * @param {String} maxFileSize 最大上传大小  可选
 * @param {String} encoding 文件编码  可选
 */
exports.promiseUploadfile = function (
    req,
    IsBackAbsolutepath,
    savename,
    newdirname,
    uploadDir = './public/uploadfile',
    maxFileSize = ' 5 * 1024 * 1024 * 1024 ',
    encoding = 'utf-8'
) {
    return new Promise((resolve, rejects) => {
        var form = new formidable.IncomingForm()
        form.encoding = 'utf-8'
        form.uploadDir = path.resolve(__dirname,'../public/uploadfile')
        form.keepExtensions = true
        form.maxFileSize = 5 * 1024 * 1024 * 1024 //文件大小限制5G
        form.on('error', function (err) {
            rejects({
                status: 0,
                msg: '上传系统繁忙',
            })
            return
        })
        form.parse(req, async function (err, fields, files) {
            if (err) {
                rejects({
                    status: 0,
                    msg: '上传系统繁忙',
                })
                return
            }
            if (JSON.stringify(files) == '{}') {
                rejects({
                    status: 0,
                    msg: '文件找不到',
                })
                return
            }
            let extname = path.extname(files.file.name)
            let oldPath = files.file.path // 旧路径
            var defpath = path.join(__dirname, '../')
            if (newdirname) {
                let newPath =
                    defpath + 'public/' + newdirname + '/' + savename + extname
                fs.mkdir(defpath + 'public/' + newdirname, (err) => {
                    fs.rename(oldPath, newPath, function (err) {
                        if (err) {
                            rejects({
                                status: 3,
                                msg: '修改名称失败',
                            })
                            return
                        } else {
                            let backpath
                            if (IsBackAbsolutepath) {
                                backpath = newPath //返回物理地址
                            } else {
                                backpath = newdirname + '/' + savename + extname //相对绝对地址
                            }
                            resolve({
                                status: 1,
                                file: {
                                    url: backpath,
                                    name: files.file.name,
                                    type: files.file.type,
                                    md5: md5(files.file.name),
                                },
                            })
                        }
                    })
                })
            } else {
                let newPath = defpath + savepath + '/' + savename + extname
                fs.rename(oldPath, newPath, function (err) {
                    if (err) {
                        rejects({
                            status: 3,
                            msg: '修改名称失败',
                        })
                        return
                    }
                    let backpath
                    if (IsBackAbsolutepath) {
                        backpath = newPath //返回绝对地址
                    } else {
                        backpath = newdirname + '/' + savename + extname //相对绝对地址
                    }
                    resolve({
                        status: 1,
                        file: {
                            url: backpath,
                            name: files.file.name,
                            type: files.file.type,
                            md5: md5(files.file.name),
                        },
                    })
                    return
                })
            }
        })
    })
}
// 错误码
// 0:文件上传失败,
// 1:文件上传成功,
// 2:文件处理出错
// 3:找不到文件
