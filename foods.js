const Pool = require('pg').Pool;
// const conopts = {
//     user: '',
//     password: '',
//     host: '',
//     database: ''
// }

//const pool = new Pool(conopts);

const users = () => {
    return pool.connect()
        .then(client => {
           const sql = 'SELECT name FROM foods';
            return client.query(sql)
                .then(res => {
                    client.release();
                    return res;
                })
                .catch(err => {
                    client.release();
                    console.error(err);
                });
        })
   }

   module.exports = { users };