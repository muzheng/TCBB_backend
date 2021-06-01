const Router=require('koa-router')
const router=new Router()
const getAccessToken=require('../untils/getAccessToken.js')

const rp=require('request-promise')


//用于用户登陆
router.get('/login',async(ctx,next)=>{

    const params=ctx.request.query
    console.log(params)

    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    let mark=''

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('admin').where({user:'${params.userName}',password:'${params.userPwd}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    const data=await rp(options).then(res=>{
        console.log(res)
        console.log(res.data.length)
        return res.data.length
        
    })

    ctx.body={
        data,
        code:20000

    }


})



module.exports=router