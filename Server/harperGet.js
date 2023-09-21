const axios=require('axios');
require('dotenv').config();
const HarperGet=(room)=>{
    const harperUrl=process.env.HARPERDB_URL;
    const harperPwd=process.env.HARPERDB_PW;

    if(!harperUrl||!harperPwd) return null;
    let data = JSON.stringify({
        operation: 'sql',
        sql: `SELECT * FROM realTimeChat.messages WHERE room = '${room}' LIMIT 10`,
      });
    
      let config = {
        method: 'post',
        url: harperUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: harperPwd,
        },
        data: data,
      };
      return new Promise((resolve, reject) => {
        axios(config)
          .then(function (response) {
            resolve(JSON.stringify(response.data));
          })
          .catch(function (error) {
            reject(error);
          })
        })
}
module.exports=HarperGet;