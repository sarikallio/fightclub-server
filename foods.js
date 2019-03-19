const Pool = require('pg').Pool;
const conopts = {
    user: 'hatwlzbfjizmyp',
    password: '18d81962334ae5762081ca9410cf1c943276c18fcc7a9ca20b2b40cc049457c7',
    host: 'ec2-23-23-173-30.compute-1.amazonaws.com',
    database: 'dcmphg49j10vtj'
}

const pool = new Pool(conopts);

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