const Pool = require('pg').Pool;
const conopts = {
    user: process.env.database_user,
    password: process.env.database_password,
    host: process.env.database_host,
    database: process.env.database_database
}


const pool = new Pool(conopts);

const feedback = () => {
    return pool.connect()
        .then(client => {
           const messages = 'SELECT username, message, created_at, created_on FROM feedback';
            return client.query(messages)
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

// const newMessage = () => {
// return pool.connect()
//     .then(client => {
//         const newMessages = 'INSERT INTO feedback (username, message) values ';
//         return client.query(newMessages)
//             .then(res => {
//                 client.release();
//                 return res;
//             })
//             .catch(err => {
//                 client.release();
//                 console.error(err);
//             });
//     })
// }

function newMessage(mes){
    console.log("Tässä tulee newMessage: ", mes);
    console.log("Tässä tulee mes.message: ", mes.message)
    console.log("Tässä tulee mes.username: ", mes.username);
    return pool.connect()
    .then(client=>{
        let value = [mes.username, mes.message];
        let sql = "INSERT INTO feedback (username, message) VALUES ($1, $2)";
        return client.query(sql, value)
                .then(resp=>{
                    client.release();
                    return resp;
            // })
        // })
        })
    })
}

module.exports = { feedback, newMessage };