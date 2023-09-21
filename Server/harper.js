const axios=require('axios');
require('dotenv').config();
const Harper=(message,userName,room)=>{
    const harperUrl=process.env.HARPERDB_URL;
    const harperPwd=process.env.HARPERDB_PW;

    if(!harperUrl||!harperPwd) return null;

    var data=JSON.stringify({
        operation:'insert',
        schema:'realTimeChat',
        table:'messages',
        records:[
            {
                message,
                userName,
                room
            }
        ]
    })

    var config={
        method:'post',
        url:harperUrl,
        headers:{
            'Content-Type': 'application/json',
            Authorization: harperPwd,
        },
        data:data
    }

    return new Promise((resolve, reject) => {
        axios(config)
          .then(function (response) {
            resolve(JSON.stringify(response.data));
          })
          .catch(function (error) {
            reject(error);
          });
        })
        
}
module.exports=Harper;