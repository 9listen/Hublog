var sequelize = require("./sequelize");
const fs = require("fs");
let files = fs.readdirSync(__dirname + "/models");
let models = files.filter((model) => {
    return model.endsWith(".js");
}, files);

module.exports = {};
for (let model of models) {
    let name = model.substring(0, model.length - 3);
    module.exports[name] = require(__dirname + "/models/" + model);
}

module.exports.sync = () => {
    sequelize.sync();
};
