//引入模块
const nodemailer = require("nodemailer");
const config = require("./../config/index").email;
//设置邮箱配置
let emailConfig = {
    service: "qq",
    // host: "smtp.qq.com", //邮箱服务的主机，如smtp.qq.com
    port: "465", //对应的端口号
    secureConnection: true,
    //secureConnection:false,
    //用户信息
    auth: {
        user: config.user,
        pass: config.pass,
    },
};
const transporter = nodemailer.createTransport(emailConfig);

const sendQQemail = function (mailOptions) {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error);
        console.log(`Message: ${info.messageId}`);
        console.log(`sent: ${info.response}`);
    });
};
//发送邮件
/**
 *
 */
exports.sendQQemail = sendQQemail;
