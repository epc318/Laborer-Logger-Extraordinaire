const fs = require("fs");
const writeSQLFile = laborData => {
    return new Promise((resolve, reject) => {
        fs.appendFile("./db/seed.sql", laborData, err => {
            if(err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: "File successfully created"
            });
        });
    });
};
module.exports = { writeSQLFile };