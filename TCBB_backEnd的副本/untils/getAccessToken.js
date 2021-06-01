const rp=require('request-promise')
const fs=require('fs')
const path=require('path')

//获取绝对路径
const fileName=path.resolve(__dirname,'./access_token.json')
console.log(fileName)

const URL='https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxc09e1726af9d0b32&secret=e0ab17c2972bc334510e77390645d09b'

//更新accessToken
const updateAccessToken=async()=>{
    const resStr = await rp(URL)
    const res=JSON.parse(resStr)
    console.log(res)

    //写文件
    if(res.access_token){
        fs.writeFileSync(fileName,JSON.stringify({
            access_token:res.access_token,
            createTime:new Date()

        }))


    }else {

        //如果获取不到token，重新执行updateAccessToken
        await updateAccessToken()
    }

}

//用户获得accessToken
const getAccessToken=async()=>{
    //读取文件
    try{
        const readRes=fs.readFileSync(fileName,'utf8')
        const readObj=JSON.parse(readRes)
        const nowTime=new Date().getTime()
        const createTime=new Date(readObj.createTime).getTime()
        console.log(readObj)

        if((nowTime-createTime)/1000/60/60>=2){
            await updateAccessToken()
            await getAccessToken()

        }

        return readObj.access_token

    }catch(error){
        await updateAccessToken()
        await getAccessToken()

    }
    
}

setInterval(async ()=>{
    await updateAccessToken()
},(7200-300)*1000)

//updateAccessToken()

//console.log(getAccessToken())

module.exports = getAccessToken
