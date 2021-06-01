const Router=require('koa-router')
const router=new Router()
const getAccessToken=require('../untils/getAccessToken.js')
const cloudStorage=require('../untils/callCloudStorage.js')

const fs=require('fs')

const rp=require('request-promise')
//const { download } = require('../untils/callCloudStorage.js')

router.get('/list',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    const params=ctx.request.query

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('swiper').limit(30).get()`,
            //query:`db.collection('users').skip(10).limit(10).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    let fileList=[]
    
    const data=await rp(options)
       .then((res)=>{
           console.log(res)

           //后续进行下载链接开发
           
           for(var i=0;i<res.data.length;i++){

               fileList.push({
                   fileid:JSON.parse(res.data[i]).fileid,
                   max_age:7200,
                })

           }

           return res.data
       
       })
       .catch(function (err) {
           // POST failed...
       });

       console.log(data)


       var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${ACCESS_TOKEN}`,
      
        body: {
            file_list:fileList,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };


    const dlRes=await rp(options).then(res=>{
        console.log(res)

        return res
       
    })

    let returnData=[]

    for(let i=0,len=dlRes.file_list.length;i<len;i++){

        returnData.push({
            download_url:dlRes.file_list[i].download_url,
            fileid:dlRes.file_list[i].fileid,
            _id:JSON.parse(data[i])._id,
        })

    }


       ctx.body={
           returnData,
           code:20000
       }
    
})

router.post('/upload',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const file=ctx.request.files.file
    //console.log(file)
    const path = `picture/swiper/${Date.now()}-${Math.random()}-${file.name}`

    const options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/uploadfile?access_token=${ACCESS_TOKEN}`,
        body: {
            path,
            env: 'tcbb-service-2gy2i43m2d84f05d',
        },
        json: true // Automatically stringifies the body to JSON
    };

    const info = await rp(options)
    .then(function (res) {
        console.log(res)
        return res
    })

    console.log(info.url)
    console.log(file.path)
    //console.log(fs.createReadStream(file.path))

    //开始上传图片
    const params={
        method:'POST',
        headers:{
            'content-type':'multipart/form-data'
        },
        uri:info.url,
        formData:{

            key:path,
            Signature:info.authorization,
            'x-cos-security-token':info.token,
            'x-cos-meta-fileid':info.cos_file_id,
            file:fs.createReadStream(file.path)

        },

        json: true // Automatically stringifies the body to JSON

    };

    await rp(params).then(res=>{
       // console.log(res)
    })

    //对应的信息写入数据库

    console.log(info.file_id)

    var options_1={
        method:'POST',
        uri:`https://api.weixin.qq.com/tcb/databaseadd?access_token=${ACCESS_TOKEN}`,

        body:{
            query:`db.collection('swiper').add({
                data:{
                    fileid:'${info.file_id}'
                }
            })`,  

            env: 'tcbb-service-2gy2i43m2d84f05d',

        },

        json: true // Automatically stringifies the body to JSON

    };

    const res=await rp(options_1).then(res=>{
        console.log(res)

        return res

    })

    ctx.body={
        id_list:res.id_list,
        code:20000

    }


})

router.get('/del',async(ctx,next)=>{
    //先删除数据库内容
    //再删除数据库云存储
    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    const params=ctx.request.query
    console.log(params)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasedelete?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('swiper').doc('${params._id}').remove()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    const deDBRes=await rp(options).then(res=>{
        console.log(res)
        return res

    }).catch(function (err) {
            // POST failed...
        });
        
        console.log(params.fileid)
    
        const options_1= {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/batchdeletefile?access_token=${ACCESS_TOKEN}`,
            body: {
                env: 'tcbb-service-2gy2i43m2d84f05d',
                fileid_list: params.fileid
            },
            json: true
        }

        const delStorageRes=await rp(options_1).then(res=>{
            console.log(res)

            return res
        })

        ctx.body={
            code:20000,
            data:{
                delStorageRes,
                deDBRes,
            }

        }

})

module.exports=router