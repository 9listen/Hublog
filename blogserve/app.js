const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const logger = require("morgan");
const dbinit = require("./database/init");
const clinetRouter = require("./routes/client/index");
const commonRouter = require("./routes/common/index");
const serveRouter = require("./routes/serve/index");
const qqRouter = require("./routes/qq/index");
const session = require("express-session");

const rainBow = require("./modules/rainbowfart");

const app = express();

dbinit.sync(); //初始化数据库,首次运行需开启，初始化数据库
// view engine setup
// 自定义token
logger.token("localDate", function getDate(req) {
    let date = new Date();
    return date.toLocaleString();
});

// 自定义format，其中包含自定义的token
logger.format(
    "combined",
    ':remote-addr - :remote-user [:localDate]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
);
const cors = require("cors");
app.use(cors());
// 使用自定义的format
// app.use(logger("combined", { stream: clientLogStream }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// rainBow.rainBowInit();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//设置cookie
app.use(cookieParser("sessiontest"));
app.use(
    session({
        secret: "sessiontest",
        resave: true,
        cookie: { maxAge: 1000 * 60 * 30 },
        saveUninitialized: true,
    })
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/client", clinetRouter);
app.use("/common", commonRouter);
app.use("/admin", serveRouter);
app.use("/qq", qqRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
