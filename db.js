const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./car.db')

db.serialize(function(){
    db.run(`
        CREATE TABLE IF NOT EXISTS cars(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            tipo TEXT,
            desc TEXT
        );
    `)
})
module.exports = db