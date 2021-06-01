const Router=require('koa-router')
const router=new Router()
const getAccessToken=require('../untils/getAccessToken.js')

const rp=require('request-promise')

const fs=require('fs')
const { PassThrough } = require('stream')


let count={}
let state1={}

let initDate=''

let IDI=''


//get获得教练员信息
router.get('/list',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    const params=ctx.request.query

    console.log(params)
    console.log(params.start)
    console.log(params.count)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('teacher').skip(${parseInt(params.start)}).limit(${parseInt(params.count)}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    var array=[]

    await rp(options).then(res=>{
        console.log(res)

        for(var i=0;i<res.data.length;i++){

            array.push(JSON.parse(res.data[i]))

        }
    
        return array
    })

    ctx.body={
        array,
        code:20000
    }



})

router.get('/create',async(ctx,next)=>{
    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var createtime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    const params = ctx.request.query
    const card=params.card_id
    
    console.log(params)
    console.log(card)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('teacher').where({card_id:'${params.card_id}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    await rp(options).then(res=>{
        console.log(res)
        count=res.data.length
        
    })

    if(count==0){
        //创建教练员信息

        var options={
            method:'POST',
            uri:`https://api.weixin.qq.com/tcb/databaseadd?access_token=${ACCESS_TOKEN}`,

            body:{
                query:`db.collection('teacher').add({
                    data:[{
                        card_id:'${params.card_id}',
                        name:'${params.name}',
                        old:'${params.old}',
                        sexual:'${params.sexual}',
                        tel:'${params.tel}',
                        create_time:'${createtime}',
                        update_time:'${createtime}',
                        openid:'${params.openid}',
                        io_1:'${params.io_1}',
                        io_2:'${params.io_2}',
                        io_3:'${params.io_3}',
                        io_4:'${params.io_4}',
                        io_5:'${params.io_5}',
                        introduction:'${params.introduction}',
                    }]
                })`,  

                env: 'tcbb-service-2gy2i43m2d84f05d',

            },

            json: true // Automatically stringifies the body to JSON

        };

        await rp(options).then(res=>{

            state1=res.errmsg
            console.log(res)
        })

    }else if(count>0){
        state1=count

    }

    ctx.body={
        state1,
        code:20000

    }

})

router.get('/del',async(ctx,next)=>{
    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    const params=ctx.request.query
    console.log(params.id)

    let count=''
    let mark=''
    let fileList=''

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({teacher_id:'${params.id}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(res.data.length)

        count=res.data.length
   
    })

    if(parseInt(count)>0){
        mark=-1

    }else if(parseInt(count)==0){

        var options = {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('teacher').doc('${params.id}').get()`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        }; 

        await rp(options).then(res=>{
            console.log(res)
    
            fileList=JSON.parse(res.data).io_1
            console.log(fileList)
        })

        const options_1= {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/batchdeletefile?access_token=${ACCESS_TOKEN}`,
            body: {
                env: 'tcbb-service-2gy2i43m2d84f05d',
                fileid_list: fileList
            },
            json: true
        };
        const delStorageRes=await rp(options_1).then(res=>{
            console.log(res)

            return res
        })

        console.log(delStorageRes)

        var options_2 = {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databasedelete?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('teacher').doc('${params.id}').remove()`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        };

        await rp(options_2).then(res=>{
            console.log(res)
            mark=res.deleted

            
        }).catch(function (err) {
                // POST failed...
            });


    }
        ctx.body={
            mark,
            code:20000
 
        }
 
})

//通过数据库的id获得用户信息
router.get('/getById',async(ctx,next)=>{
    const params=ctx.request.query
    console.log(params)

    const ACCESS_TOKEN=await getAccessToken()
    
    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('teacher').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    const data=await rp(options).then(res=>{
        console.log(res)

        initDate=JSON.parse(res.data).date

        console.log(initDate)

        return JSON.parse(res.data)
    })

    ctx.body={
        data,
        code:20000
    }

})

//更新教练基本信息
router.post('/update',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var updatetime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    const params=ctx.request.body
    console.log(params)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('teacher').doc('${params._id}').update({
                data:{
                    name:'${params.name}',
                    old:'${params.old}',
                    sexual:'${params.sexual}',
                    tel:'${params.tel}',                 
                    introduction:'${params.introduction}',
                    update_time:'${updatetime}',
                }

            })`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    const data=await rp(options).then(res=>{
        console.log(res)

        return res
    })


    ctx.body={
        data,
        code:20000
    }

})


//排课时更换教练
router.get('/changeTeacher',async(ctx,next)=>{

    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var updatetime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    const params = ctx.request.query
    
    console.log(params)
    console.log(params.teacher_name)
    console.log(params.date)
    console.log(params.time)
    console.log(params.teacher_id)

    let count=''
    let mark=''
    var array=[]

    let newTeacherId=''
    let userclassId=''


//判断此时段有没有同一教练重复

    var options= {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({teacher_name:'${params.teacher_name}',date:'${params.date}',time:'${params.time}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

 
    await rp(options).then(res=>{
        console.log(res)
        console.log(res.data.length)

        count=res.data.length

    })

    if(count>0){
        mark=-1
        console.log(mark)

    }else if(count==0){
        //此时段没有重名教练
        //1 更新userclass教练信息
        //2更新course中的学员预约信息
        //从教练姓名获得教练的ID
        var options= {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('teacher').where({name:'${params.teacher_name}'}).get()`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        };

        await rp(options).then(res=>{
            console.log(res)
            newTeacherId=JSON.parse(res.data)._id
            
            console.log(newTeacherId)

        })

        //更新已预约学员的教练员信息

        
        var options= {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('course').where({teacher_id:'${params.teacher_id}',date:'${params.date}',time:'${params.time}'}).get()`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        };

        await rp(options).then(res=>{
            console.log(res)

            for(var i=0;i<res.data.length;i++){

                array.push(JSON.parse(res.data[i]))
    
            }
        })

        console.log(array)
        console.log(array.length)

        for(var i=0;i<array.length;i++){
            const course_id=array[i]._id
            console.log(course_id)

            var options = {
                method: 'POST',
                uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
              
                body: {
                    query:`db.collection('course').doc('${course_id}').update({
                        data:{
                            teacher_name:'${params.teacher_name}',
                            teacher_id:'${newTeacherId}',
                            create_time:'${updatetime}',
                        }
        
                    })`,
                    env: 'tcbb-service-2gy2i43m2d84f05d',
                    
                },
        
                json: true // Automatically stringifies the body to JSON
            };

            await rp(options).then(res=>{
                console.log(res)
                 
            })

        }

        //更新userclass数据库信息
        var options = {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('userclass').where({teacher_id:'${params.teacher_id}',date:'${params.date}',time:'${params.time}'}).get()`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        };

        await rp(options).then(res=>{
            console.log(res)
            userclassId=JSON.parse(res.data)._id
            
        })


        var options = {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('userclass').doc('${userclassId}').update({
                    data:{
                        teacher_name:'${params.teacher_name}',
                        teacher_id:'${newTeacherId}',
                        create_time:'${updatetime}',
                    }
    
                })`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        };

        await rp(options).then(res=>{

            mark=res.modified
            console.log(res)
        })


        


    }

    ctx.body={
        mark,
        code:20000
    }

    

})


router.get('/getpicture',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    const params=ctx.request.query
    const _id=params._id

    IDI=_id
    console.log(params)
    console.log(_id)

    let mark=''

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('teacher').doc('${_id}').get()`,
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
                fileid:JSON.parse(res.data[i]).io_1,
                max_age:7200,
             })

        }

        return res.data
    
    })
    .catch(function (err) {
        // POST failed...
    });

    console.log(fileList)


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

router.post('/updatePicture',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const file=ctx.request.files.file

    const path = `picture/teacher/${Date.now()}-${Math.random()}-${file.name}`

    const options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/uploadfile?access_token=${ACCESS_TOKEN}`,
        body: {
            path,
            env: 'tcbb-service-2gy2i43m2d84f05d',
        },
        json: true // Automatically stringifies the body to JSON
    };

    console.log(IDI)

    const info = await rp(options)
    .then(function (res) {
        console.log(res)
        return res
    })

    console.log(info.url)
    console.log(file.path)

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

         console.log(IDI)


         var options_1={
            method:'POST',
            uri:`https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
    
            body:{
                query:`db.collection('teacher').doc('${IDI}').update({
                    data:{
                        io_1:'${info.file_id}'
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
            mark:res.modified,
            code:20000
    
        }
    

})


module.exports=router