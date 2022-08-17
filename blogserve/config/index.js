const config = {
    db: {
        database: "blogs",
        username: "root",
        password: "88888888",
        host: "localhost",
        port: 3306,
    },
    email: {
        user: "257286767@qq.com", //邮箱
        pass: "rhtbszxhmppxcajj", //邮箱授权码
    },
    qq: {
        client_id: 101905280, //QQ互联APPID
        client_secret: "4c00bfbe8da3168e63b4ee425d64c561", //QQ互联密钥
        redirect_uri: "http://www.xkongkeji.com/qq", //QQ互联回调域
    },
};

module.exports = config;
