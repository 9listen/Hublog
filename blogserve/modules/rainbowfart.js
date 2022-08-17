//引入模块
const nodemailer = require("nodemailer");
const axios = require("axios");
const schedule = require("node-schedule");
const cheerio = require("cheerio");
const path = require("path");
const template = require("swig");
let api = "https://chp.shadiao.app/api.php";
function getDayData() {
    return new Promise((resolve, reject) => {
        const today = new Date();
        const meet = new Date("2014-06-18");
        const count = Math.ceil((today - meet) / 1000 / 60 / 60 / 24);
        // 今天日期格式化
        const format =
            today.getFullYear() +
            " / " +
            (today.getMonth() + 1) +
            " / " +
            today.getDate();
        const dayData = {
            count,
            format,
        };
        resolve(dayData);
    });
}
// 2.1 请求墨迹天气获取数据
function getMojiData() {
    return new Promise((resolve, reject) => {
        axios({
            url: "https://tianqi.moji.com/weather/china/guizhou/huaxi-district",
            method: "get",
        })
            .then((res) => {
                const $ = cheerio.load(res.data);
                // 图标
                const icon = $(".wea_weather>span>img").attr("src");
                // 天气
                const weather = $(".wea_weather>b").text();
                // 温度
                const temperature = $(".wea_weather>em").text();
                // 提示
                const tips = $(".wea_tips>em").text();
                // 墨迹天气数据
                const mojiData = {
                    icon,
                    weather,
                    temperature,
                    tips,
                };
                resolve(mojiData);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
function getRainBow() {
    return new Promise((resolve, reject) => {
        axios({
            url: api,
            method: "get",
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
// 4.0 通过模板引起替换 HTML 的数据
async function renderTemplate() {
    // 获取 墨迹天气数据
    let mojiData = await getMojiData();
    let dayData = await getDayData();
    let getRainBowdata = await getRainBow();
    let nicknames = ["小可爱", "小仙女", "小宝贝", "熊宝宝"];
    return new Promise((resolve, reject) => {
        template.renderFile(
            path.join(__dirname, "./rainbowfart/index.html"),
            {
                dayData: dayData,
                mojiData: mojiData,
                rainbow: getRainBowdata,
                nickname:
                    nicknames[
                        Math.floor(Math.random() * (nicknames.length + 1))
                    ],
            },
            function (err, html) {
                resolve(html);
            }
        );
    });
}
// renderTemplate();

// 5. 发送邮件
async function sendNodeMail(toEmail) {
    // HTML 页面内容，通过 await 等待模板引擎渲染完毕后，再往下执行代码
    const html = await renderTemplate();
    let transporter = nodemailer.createTransport({
        service: "qq",
        port: "465", //对应的端口号
        secureConnection: true,
        auth: {
            user: "1846930039@qq.com",
            pass: "rndsnkckdfcnebaa",
        },
    });

    // 设置电子邮件数据
    let mailOptions = {
        from: "1846930039@qq.com", //谁发的
        to: toEmail, //发给谁
        subject: "今天也要快乐哟宝贝", //主题是什么
        html: html, // 设置邮件为 html 内容
    };
    // 发送邮件
    transporter.sendMail(mailOptions, (error, info = {}) => {
        if (error) {
            sendNodeMail(); //再次发送
        }
    });
}

function rainBowInit() {
    schedule.scheduleJob("52 14 13 * * *", async function () {
        sendNodeMail("215684103@qq.com");
        sendNodeMail("257286767@qq.com");
    });
}
exports.rainBowInit = rainBowInit;
