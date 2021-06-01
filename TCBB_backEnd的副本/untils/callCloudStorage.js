const getAccessToken = require('./getAccessToken.js')
const rp = require('request-promise')
const fs = require('fs')

const cloudStorage={
    async download(ctx,FileList){
        const ACCESS_TOKEN=await getAccessToken()

        const options={
            method:'POST',
            uri:`https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${ACCESS_TOKEN}`,

            body:{
                env:ctx.state.env,
                file_list:FileList,

            },
            json:true
        }

        return await rp(options)
        .then((res) => {
            return res
        })
        .catch(function (err) {
            console.log(err);
        })

    }
}

module.exports=cloudStorage