const Pool = require('pg').Pool;
const conopts = {
    user: process.env.database_user,
    password: process.env.database_password,
    host: process.env.database_host,
    database: process.env.database_database
}

const pool = new Pool(conopts);

const counter= () => {
    return pool.connect()
    .then(client => {
        const fights = 'UPDATE counter SET fights=fights+1 WHERE id=1';
        return client.query(fights)
        .then(res => {
            client.release();
            return res;
        })
        .catch(err => {
            client.release();
            console.error(err);
        })
    })
}

module.exports = { counter };